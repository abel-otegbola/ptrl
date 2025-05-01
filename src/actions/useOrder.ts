"use server"

import { IOrder } from "@/interface/store";
import { connectDB } from "@/lib/mongodb";
import Orders from "@/schema/orderSchema";

export const createOrder = async (values: IOrder) => {
    try {
        await connectDB();
        const order = new Orders(values);
        const savedOrder = await order.save();
        return {
            status: true
        }
    }
    catch(e){
        return {
            status: false,
            message: "Order placement unsucccessful"
        }
    }
}

export const updateSingleOrder = async (values: IOrder) => {
    try {
        await connectDB();
        const savedOrder = await Orders.updateOne({ _id: values.id }, values)
        return {
            status: true
        }
    }
    catch(e){
        return {
            error: "Order update unsucccessful"
        }
    }
}

export const getAllOrders = async () => {
    try {
        await connectDB();
        const findResult = await Orders.find()
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllUserOrders = async (email: string) => {
    try {
        await connectDB();
        const findResult = await Orders.find({ customer_email: email })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getAllBusinessOrders = async (store: string) => {
    try {
        await connectDB();
        const findResult = await Orders.find({
            'order_items.seller': store,
        })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const getSingleOrder = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Orders.findOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        
    }
}

export const deleteOrder = async (_id: string) => {
    try {
        await connectDB();
        const findResult = await Orders.deleteOne({ _id })
        return JSON.parse(JSON.stringify(findResult))
    }
    catch(e){
        return {
            error: "Order deletion unsucccessful"
        }
    }
}