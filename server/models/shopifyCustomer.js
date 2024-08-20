const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    customer_id: { type: Number, required: true },
    first_name: { type: String },
    last_name: { type: String },
    company: { type: String, default: null },
    address1: { type: String },
    address2: { type: String, default: null },
    city: { type: String },
    province: { type: String },
    country: { type: String },
    zip: { type: String },
    phone: { type: String, default: null },
    name: { type: String, default: "" },
    province_code: { type: String, default: null },
    country_code: { type: String, default: "" },
    country_name: { type: String, default: "" },
    default: { type: Boolean, default: false }
});

const emailMarketingConsentSchema = new mongoose.Schema({
    state: { type: String },
    opt_in_level: { type: String },
    consent_updated_at: { type: Date, default: null }
});

const shopifyCustomerSchema = new mongoose.Schema({
    _id: {  type: Number, required: true }, // Represents the MongoDB ObjectId in numeric format
    addresses: [addressSchema],
    admin_graphql_api_id: { type: String },
    created_at: { type: Date },
    currency: { type: String },
    default_address: addressSchema,
    email: { type: String },
    email_marketing_consent: emailMarketingConsentSchema,
    first_name: { type: String },
    last_name: { type: String },
    last_order_id: { type: Number, default: null },
    last_order_name: { type: String, default: null },
    multipass_identifier: { type: String, default: null },
    note: { type: String, default: null },
    orders_count: { type: Number, default: 0 },
    phone: { type: String, default: null },
    sms_marketing_consent: { type: String, default: null },
    state: { type: String },
    tags: { type: String },
    tax_exempt: { type: Boolean, default: false },
    tax_exemptions: [String],
    total_spent: { type: String },
    updated_at: { type: Date },
    verified_email: { type: Boolean }
}, { collection: 'shopifyCustomers' }); // `timestamps: true` will add createdAt and updatedAt fields

// Create the model and specify the collection name
const ShopifyCustomer = mongoose.model('ShopifyCustomer', shopifyCustomerSchema);

module.exports = ShopifyCustomer;
