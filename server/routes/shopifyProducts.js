const express = require('express');
const router = express.Router();
const ShopifyProduct = require('../models/shopifyProduct');

// Fetch all products
router.get('/get_all_products', async (req, res) => {
  try {
    console.log('api hit fetch all products')
    const products = await ShopifyProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch product by ID
router.get('/get_by_id/:id', async (req, res) => {
  try {
    const product = await ShopifyProduct.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
