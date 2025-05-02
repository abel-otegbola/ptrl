import { model } from "mongoose";

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    order_items: { 
        type: [{
            id: String,
            quantity: Number,
            variation: { color: String, size: String },
        }],
        required: false
    }
},
  {
    timestamps: true,
  }
);

const Orders = mongoose.models?.Orders || model('Orders', orderSchema);
export default Orders;