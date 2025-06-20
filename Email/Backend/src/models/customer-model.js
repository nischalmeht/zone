const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true
  },
  lastOrderDate: {
    type: Date
  },
  totalOrderValue: {
    type: Number,
    default: 0
  },
  last3ItemsOrdered: [
    {
      itemName: String,     
    }
  ]
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
