// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  salesperson: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  unitsSold: {
    type: Number,
    required: true,
    min: 0
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  orderValue: {
    type: Number,
    required: true,
    min: 0
  }
});

module.exports = mongoose.model('Order', orderSchema);
