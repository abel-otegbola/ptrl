import { model } from "mongoose";

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: [ String ],
        required: false
    },
    available: {
        type: Boolean,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false
    },
    sizes: { 
        type: [ String ],
        required: false
    },
},
  {
    timestamps: true,
  }
);

const Products = mongoose.models?.products || model('products', productSchema);
export default Products;