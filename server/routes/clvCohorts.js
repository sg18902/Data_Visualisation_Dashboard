const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/shopifyCustomer');
const Order = require('../models/shopifyOrder');

// Utility function to calculate CLV by cohorts using aggregation pipeline
const calculateCLVByCohorts = async () => {
    const pipeline =[
        {
          $lookup: {
            from: "shopifyOrders",
            // Ensure this matches the actual collection name
            localField: "email",
            foreignField: "customer.email",
            as: "customerOrders"
          }
        },
        {
          $addFields: {
            customerOrders: {
              $map: {
                input: "$customerOrders",
                as: "order",
                in: {
                  total_price: {
                    $toDouble: {
                      $ifNull: [
                        "$$order.total_price_set.presentment_money.amount",
                        "0"
                      ]
                    } // Convert total_price to number
                  }
                }
              }
            }
          }
        },
        {
          $addFields: {
            totalSpent: {
              $sum: "$customerOrders.total_price"
            },
            firstPurchaseMonth: {
              $dateToString: {
                format: "%Y-%m",
                date: {
                  $toDate: "$created_at"
                }
              }
            },
            totalRevenue: {
              $sum: {
                $map: {
                  input: "$customerOrders",
                  as: "order",
                  in: {
                    $toDouble: "$$order.total_price"
                  }
                }
              }
            }
          }
        },
        {
          $group: {
            _id: "$firstPurchaseMonth",
            totalRevenue: {
              $sum: {
                $toDouble: "$totalRevenue"
              }
            },
            customerCount: {
              $sum: 1
            }
          }
        },
        {
          $addFields: {
            clv: {
              $cond: {
                if: {
                  $eq: ["$customerCount", 0]
                },
                then: 0,
                else: {
                  $divide: [
                    {
                      $toDouble: "$totalRevenue"
                    },
                    "$customerCount"
                  ]
                } // Convert totalRevenue to double for accurate division
              }
            }
          }
        },
        {
          $sort: {
            _id: 1
          } // Sort by cohort month in ascending order
        }
      ];

    try {
        const clvByCohorts = await Customer.aggregate(pipeline);
        return clvByCohorts;
    } catch (error) {
        throw new Error(`Aggregation error: ${error.message}`);
    }
};

// Route to fetch CLV by cohorts
router.get('/cohorts', async (req, res) => {
    try {
        const clvByCohorts = await calculateCLVByCohorts();
        res.json(clvByCohorts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
