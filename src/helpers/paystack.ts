'use client'

import { totalPrice } from "./totalPrice";
import { ICart } from "../interface/store";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { products } from "../data/products";
import emailjs from "@emailjs/browser";
import { verifyPayment } from "@/actions/useVerifyPayment";
import { PaystackResponse } from "@/components/modals/cart";
import { createOrder } from "@/actions/useOrder";

const sendOrderEmail = async (
    values: { fullname: string; email: string; phoneNumber: string; address: string; state: string; city: string; }, 
    reference: string,
    recipient: string,
    type: string,
    cart: ICart[]
    ) => { 
    try {
    await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",     // Email.js Service ID
        type === "seller" ? (process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "") : (process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID_BUYER || ""),    // Email.js Template ID
    {
        fullname: values.fullname,
        useremail: recipient,
        email: values.email,
        order_id: reference,
        order_date: new Date().toLocaleDateString(),
        orders: cart.map(item => {
            return { 
                name: products.find(element => element.id === item.id)?.title, 
                price: products.find(element => element.id === item.id)?.price, 
                image_url: `https://ptrl.vercel.app${products.find(element => element.id === item.id)?.img}`, 
                quantity: item.quantity, 
                size: item.variation.size, 
            }
        }),
        phoneNumber: values.phoneNumber,
        cost: {shipping: 5000, tax: 0, total: +totalPrice(cart) + 5000},
        address: `${values.address}, ${values.city}, ${values.state}`
    }
    );
    } catch (error) {
        console.error('Failed to send email:', error);
        window.location.replace("/")
    } finally {
        console.log("email sent")
        if (type === "buyer") {
            window.location.replace("/")
        }
    }
};
    

export const paystack = async (
    accessCode: string, 
    email: string, 
    cart: ICart[], 
    reference: string, 
    values: { fullname: string; email: string; phoneNumber: string; address: string; state: string; city: string; }, 
    setStatus: (aug0: string) => void,
    setPopup: (aug0: { type: string, msg: string }) => void
) => {
    try {
        const initializePaystack = async () => {
            if (typeof window === 'undefined') return null;
            const PaystackInline = (await import("@paystack/inline-js")).default;
            return new PaystackInline();
        };

        const popup = await initializePaystack();

        await popup?.resumeTransaction({ accessCode })
        await popup?.checkout({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
            email,
            amount: (+totalPrice(cart) + 5000) * 100,
            reference,
            onCancel: () => {
                setPopup({ type: "error", msg: "Payment Cancelled." })
                return {
                    status: "cancelled",
                    reference: "",
                }
            },
            onError: (error) => {
                setPopup({ type: "error", msg: "Payment Unsuccessful." })
                return {
                    status: error,
                    reference: "",
                }
            },
            onSuccess: async (response) => { 
                setStatus("verifying")
                const res = await verifyPayment(response?.reference)
                if((res as PaystackResponse)?.status) {
                    const newOrder = await createOrder({ ...values, order_items: cart, reference: response?.reference } )
                    if(newOrder?.status) {
                        setStatus("verified")
                        localStorage.setItem("cart", "[]")  
                        sendOrderEmail(values, response?.reference, "champepesings@gmail.com", "seller", cart)
                        sendOrderEmail(values, response?.reference, values.email, "buyer", cart)
                    }
                    else {
                        setPopup({ type: "error", msg: "Verification Unsuccessful." })
                        setStatus("Verification failed")
                    }
                }
                else {
                    setPopup({ type: "error", msg: "Verification Unsuccessful." })
                    setStatus("Not verified")
                }
            }
        });
    }
    catch {
        return {
            status: "error",
            reference: ""
        }
    }
}