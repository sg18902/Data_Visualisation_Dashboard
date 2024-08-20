const express = require('express');
const router = express.Router();
const ShopifyCustomer = require('../models/shopifyCustomer');

// Fetch all customers
router.get('/get_all_customers', async (req, res) => {
  try {
    console.log('api get_all_customers ')
    const customers = await ShopifyCustomer.find();
    console.log(customers)
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch customer by ID
router.get('/get_by_id/:id', async (req, res) => {
  try {
    const customer = await ShopifyCustomer.findById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Utility function to aggregate new customers data
const aggregateNewCustomers = async (interval) => {
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
        newCustomers: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ];
  return ShopifyCustomer.aggregate(pipeline);
};


// New Customers Daily
router.get('/new/daily', async (req, res) => {
  try {
    const customers = await aggregateNewCustomers('day');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New Customers Monthly
router.get('/new/monthly', async (req, res) => {
  try {
    const customers = await aggregateNewCustomers('month');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New Customers Quarterly
router.get('/new/quarterly', async (req, res) => {
  try {
    const customers = await aggregateNewCustomers('quarter');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New Customers Yearly
router.get('/new/yearly', async (req, res) => {
  try {
    const customers = await aggregateNewCustomers('year');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get the distribution of customers by city
router.get('/city', async (req, res) => {
  console.log('distribution API route hit'); // Check if this logs

  try {
      // Define the aggregation pipeline
      const pipeline = [
          {
              $match: {
                  "default_address.city": { $ne: null }
              }
          },
          {
              $group: {
                  _id: {
                    city: "$default_address.city", // City
                    zip: "$default_address.zip"    // Zip code
                }, // City is a string

                  count: { $sum: 1 }
              }
          }
      ];

      console.log('Aggregation pipeline:', pipeline); // Check pipeline

      // Execute the aggregation pipeline
      const results = await ShopifyCustomer.aggregate(pipeline);

      console.log('Aggregation results:', results); // Check results

      // Transform results to ensure _id is treated as a string
      const formattedResults = results.map(result => ({
          city: result._id, // Ensure _id (city name) is treated as a string
          count: result.count
      }));

      console.log('Formatted results:', formattedResults); // Check formatted results

      // Send the result as JSON
      res.json(formattedResults);
  } catch (err) {
      console.error('Error in /distribution route:', err); // Detailed error log
      res.status(500).json({ error: err.message });
  }
});


module.exports = router;
