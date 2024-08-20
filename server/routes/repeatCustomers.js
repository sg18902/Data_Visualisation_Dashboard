const express = require('express');
const router = express.Router();
const ShopifyOrder = require('../models/shopifyOrder');

// Helper function to aggregate repeat customers
const aggregateRepeatCustomers = async (interval) => {
    const pipeline = [
        {
            $addFields: {
                createdAtDate: { $toDate: "$created_at" } // Ensure created_at is treated as a date
            }
        },
        {
            $group: {
                _id: {
                    customer_id: "$customer.id", // Use customer.id to group by customer
                    period: {
                        $dateTrunc: {
                            date: "$createdAtDate",
                            unit: interval
                        }
                    }
                },
                purchases: { $sum: 1 } // Count purchases per customer per period
            }
        },
        {
            $group: {
                _id: "$_id.period", // Group by period
                repeatCustomers: {
                    $sum: {
                        $cond: [
                            { $gte: ["$purchases", 2] }, // Customers with 2 or more purchases
                            1,
                            0
                        ]
                    }
                }
            }
        },
        { $sort: { "_id": 1 } } // Sort by period
    ];
    return ShopifyOrder.aggregate(pipeline);
};

// Repeat Customers Daily
router.get('/daily', async (req, res) => {
    try {
        const customers = await aggregateRepeatCustomers('day');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Repeat Customers Monthly
router.get('/monthly', async (req, res) => {
    try {
        const customers = await aggregateRepeatCustomers('month');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Repeat Customers Quarterly
router.get('/quarterly', async (req, res) => {
    try {
        const customers = await aggregateRepeatCustomers('quarter');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Repeat Customers Yearly
router.get('/yearly', async (req, res) => {
    try {
        const customers = await aggregateRepeatCustomers('year');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
