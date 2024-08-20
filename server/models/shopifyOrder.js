const mongoose = require('mongoose');

const shopifyOrderSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  closed_at: { type: Date, default: null },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  number: { type: Number, required: true },
  note: { type: String, default: null },
  token: { type: String, default: '' },
  gateway: { type: String, required: true },
  test: { type: Boolean, default: false },
  total_price: { type: String, required: true },
  subtotal_price: { type: String, required: true },
  total_weight: { type: Number, required: true },
  total_tax: { type: String, required: true },
  taxes_included: { type: Boolean, default: false },
  currency: { type: String, required: true },
  financial_status: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  total_discounts: { type: String, required: true },
  buyer_accepts_marketing: { type: Boolean, default: false },
  name: { type: String, required: true },
  referring_site: { type: String, default: null },
  landing_site: { type: String, default: null },
  cancelled_at: { type: Date, default: null },
  cancel_reason: { type: String, default: null },
  reference: { type: String, default: null },
  user_id: { type: Number, default: null },
  location_id: { type: Number, default: null },
  source_identifier: { type: String, default: null },
  source_url: { type: String, default: null },
  device_id: { type: String, default: null },
  phone: { type: String, default: null },
  customer_locale: { type: String, required: true },
  app_id: { type: Number, required: true },
  browser_ip: { type: String, default: '' },
  landing_site_ref: { type: String, default: null },
  order_number: { type: Number, required: true },
  discount_applications: [Object],
  discount_codes: [Object],
  note_attributes: [Object],
  payment_gateway_names: [String],
  processing_method: { type: String, required: true },
  source_name: { type: String, required: true },
  fulfillment_status: { type: String, default: null },
  tax_lines: [Object],
  tags: { type: String, default: '' },
  contact_email: { type: String, default: null },
  order_status_url: { type: String, default: '' },
  presentment_currency: { type: String, required: true },
  total_line_items_price_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  total_discounts_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  total_shipping_price_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  subtotal_price_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  total_price_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  total_tax_set: {
    shop_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    },
    presentment_money: {
      amount: { type: String, required: true },
      currency_code: { type: String, required: true }
    }
  },
  line_items: [
    {
      id: { type: Number, required: true },
      variant_id: { type: Number, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      sku: { type: String, default: '' },
      variant_title: { type: String, default: 'Default Title' },
      vendor: { type: String, required: true },
      fulfillment_service: { type: String, required: true },
      product_id: { type: Number, required: true },
      requires_shipping: { type: Boolean, default: true },
      taxable: { type: Boolean, default: true },
      gift_card: { type: Boolean, default: false },
      name: { type: String, required: true },
      variant_inventory_management: { type: String, default: 'shopify' },
      properties: [Object],
      product_exists: { type: Boolean, default: true },
      fulfillable_quantity: { type: Number, required: true },
      grams: { type: Number, default: 0 },
      price: { type: Number, required: true },
      total_discount: { type: String, default: '0.00' },
      fulfillment_status: { type: String, default: null },
      price_set: {
        shop_money: {
          amount: { type: Number, required: true },
          currency_code: { type: String, required: true }
        },
        presentment_money: {
          amount: { type: Number, required: true },
          currency_code: { type: String, required: true }
        }
      },
      total_discount_set: {
        shop_money: {
          amount: { type: String, required: true },
          currency_code: { type: String, required: true }
        },
        presentment_money: {
          amount: { type: String, required: true },
          currency_code: { type: String, required: true }
        }
      },
      discount_allocations: [Object],
      duties: [Object],
      admin_graphql_api_id: { type: String, required: true }
    }
  ],
  shipping_lines: [Object],
  billing_address: { type: Object, default: null },
  shipping_address: { type: Object, default: null },
  fulfillments: [Object],
  client_details: { type: Object, default: null },
  refunds: [Object],
  customer: {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    orders_count: { type: Number, default: 0 },
    state: { type: String, required: true },
    total_spent: { type: String, default: '0.00' },
    last_order_id: { type: Number, required: true },
    note: { type: String, default: null },
    verified_email: { type: Boolean, default: true },
    multipass_identifier: { type: String, default: null },
    tax_exempt: { type: Boolean, default: false },
    phone: { type: String, default: null },
    tags: { type: String, default: '' },
    last_order_name: { type: String, required: true },
    currency: { type: String, default: '' },
    marketing_opt_in_level: { type: String, default: null },
    tax_exemptions: [Object],
    admin_graphql_api_id: { type: String, required: true },
    default_address: {
      id: { type: Number, required: true },
      customer_id: { type: Number, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      company: { type: String, default: null },
      address1: { type: String, required: true },
      address2: { type: String, default: null },
      city: { type: String, required: true },
      province: { type: String, default: null },
      country: { type: String, required: true },
      zip: { type: String, required: true },
      phone: { type: String, default: null },
      name: { type: String, required: true },
      province_code: { type: String, default: null },
      country_code: { type: String, required: true },
      country_name: { type: String, required: true },
      default: { type: Boolean, default: false },
      admin_graphql_api_id: { type: String, required: true }
    }
  }
});

const ShopifyOrder = mongoose.model('ShopifyOrder', shopifyOrderSchema, 'shopifyOrders');

module.exports = ShopifyOrder;
