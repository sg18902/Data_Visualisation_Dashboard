const express = require('express');
const router = express.Router();
const ShopifyOrder = require('../models/shopifyOrder');

// Fetch all orders
router.get('/get_all_orders', async (req, res) => {
  try {
    const orders = await ShopifyOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch order by ID
router.get('/get_by_id/:id', async (req, res) => {
  try {
    const order = await ShopifyOrder.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Utility function to aggregate sales data
const aggregateSales = async (interval) => {
  const aggregationPipeline = [
    {
      $addFields: {
        created_at_date: { $dateFromString: { dateString: "$created_at" } },
        totalSalesAmount: { $toDouble: "$total_price_set.presentment_money.amount" }  // Convert amount to number
      }
    },
    {
      $group: {
        _id: { 
          $dateTrunc: { 
            date: "$created_at_date", 
            unit: interval 
          }
        },
        totalSales: { $sum: "$totalSalesAmount" }
      }
    },
    { $sort: { "_id": 1 } }
  ];
  return ShopifyOrder.aggregate(aggregationPipeline);
};



// Total Sales Daily
router.get('/total/daily', async (req, res) => {
  try {
      const sales = await aggregateSales('day');
      res.json(sales);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Total Sales Monthly
router.get('/total/monthly', async (req, res) => {
  try {
      const sales = await aggregateSales('month');
      res.json(sales);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Total Sales Quarterly
router.get('/total/quarterly', async (req, res) => {
  try {
      const sales = await aggregateSales('quarter');
      res.json(sales);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Total Sales Yearly
router.get('/total/yearly', async (req, res) => {
  try {
      const sales = await aggregateSales('year');
      res.json(sales);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------------------

const calculateGrowthRate = async (interval) => {
  const pipeline = [
    {
      $addFields: {
        createdAt: { $toDate: "$created_at" } // Convert string to date
      }
    },
    {
      $group: {
        _id: {
          $dateTrunc: {
            date: "$createdAt",
            unit: interval
          }
        },
        totalSales: { $sum: { $toDouble: "$total_price_set.presentment_money.amount" } } // Convert amount to double
      }
    },
    { $sort: { "_id": 1 } },
    {
      $setWindowFields: {
        sortBy: { _id: 1 },
        output: {
          previousTotalSales: {
            $shift: {
              output: "$totalSales",
              by: -1,
              default: 0
            }
          }
        }
      }
    },
    {
      $project: {
        totalSales: 1,
        growthRate: {
          $cond: {
            if: { $eq: ["$previousTotalSales", 0] },
            then: 0,
            else: {
              $multiply: [
                {
                  $divide: [
                    { $subtract: ["$totalSales", "$previousTotalSales"] },
                    "$previousTotalSales"
                  ]
                },
                100
              ]
            }
          }
        }
      }
    }
  ];

  return ShopifyOrder.aggregate(pipeline);
};


// Sales Growth Daily
router.get('/growth/daily', async (req, res) => {
  try {
      const growth = await calculateGrowthRate('day');
      res.json(growth);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Sales Growth Monthly
router.get('/growth/monthly', async (req, res) => {
  try {
      const growth = await calculateGrowthRate('month');
      res.json(growth);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Sales Growth Quarterly
router.get('/growth/quarterly', async (req, res) => {
  try {
      const growth = await calculateGrowthRate('quarter');
      res.json(growth);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Sales Growth Yearly
router.get('/growth/yearly', async (req, res) => {
  try {
      const growth = await calculateGrowthRate('year');
      res.json(growth);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


module.exports = router;
