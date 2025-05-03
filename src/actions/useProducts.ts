"use server"

import { IProduct } from "@/interface/store";
import { connectDB } from "@/lib/mongodb";
import Products from "@/schema/productSchema";

export const createProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const Product = new Products(values);
        const savedProduct = await Product.save();
        return {
            status: true,
            data: JSON.parse(JSON.stringify(savedProduct))
        }
    }
    catch(e){
        return {
            status: false,
            message: "Product placement unsucccessful"
        }
    }
}

export const updateSingleProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const savedProduct = await Products.updateOne({ _id: values._id }, values)
        return {
            status: true,
            data: []
        }
    }
    catch(e){
        return {
            error: "Product update unsucccessful"
        }
    }
}

export const getAllProducts = async () => {
    try {
        await connectDB();
        const findResult = await Products.find()
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllUserProducts = async (email: string) => {
    try {
        await connectDB();
        const findResult = await Products.find({ customer_email: email })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getSingleProduct = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Products.findOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const deleteProduct = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Products.deleteOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        return {
            error: "Product deletion unsucccessful"
        }
    }
}