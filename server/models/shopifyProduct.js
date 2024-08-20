const mongoose = require('mongoose');

// Define the schema for the `shopifyProducts` collection
const productSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  admin_graphql_api_id: { type: String, required: true },
  body_html: { type: String, default: null },
  created_at: { type: Date, required: true },
  handle: { type: String, required: true },
  id: {  type: Number, required: true },
  image: { type: Object, default: null },
  images: { type: [Object], default: [] },
  options: [{
    id: { type: mongoose.Schema.Types.Mixed, required: true },
    product_id: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String, required: true },
    position: { type: Number, required: true },
    values: { type: [String], required: true }
  }],
  product_type: { type: String, required: true },
  published_at: { type: Date, default: null },
  published_scope: { type: String, required: true },
  status: { type: String, required: true },
  tags: { type: String, default: '' },
  template_suffix: { type: String, default: null },
  title: { type: String, required: true },
  updated_at: { type: Date, required: true },
  variants: [{
    id: { type: mongoose.Schema.Types.Mixed, required: true },
    product_id: { type: mongoose.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, default: '' },
    position: { type: Number, required: true },
    inventory_policy: { type: String, required: true },
    compare_at_price: { type: String, default: null },
    fulfillment_service: { type: String, required: true },
    inventory_management: { type: String, default: null },
    option1: { type: String, required: true },
    option2: { type: String, default: null },
    option3: { type: String, default: null },
    created_at: { type: Date, default: '' },
    updated_at: { type: Date, default: '' },
    taxable: { type: Boolean, required: true },
    barcode: { type: String, default: null },
    grams: { type: Number, required: true },
    weight: { type: Number, required: true },
    weight_unit: { type: String, required: true },
    inventory_item_id: { type: mongoose.Schema.Types.Mixed, required: true },
    inventory_quantity: { type: Number, required: true },
    old_inventory_quantity: { type: Number, required: true },
    requires_shipping: { type: Boolean, required: true },
    admin_graphql_api_id: { type: String, required: true },
    image_id: { type: mongoose.Schema.Types.Mixed, default: null }
  }],
  vendor: { type: String, required: true }
}, {
  collection: 'shopifyProducts' // If you don't want Mongoose to manage `createdAt` and `updatedAt` fields
});

// Create and export the model
const ShopifyProduct = mongoose.model('ShopifyProduct', productSchema );

module.exports = ShopifyProduct;
