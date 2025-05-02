import { ICart } from "@/interface/store";
import { products } from "../data/products";
import emailjs from "@emailjs/browser";
import { totalPrice } from "./totalPrice";

export const sendOrderEmail = async (
    values: { fullname: string; email: string; phoneNumber: string; address: string; state: string; city: string; }, 
    reference: string,
    recipient: string,
    type: string,
    cart: ICart[],
    shipping: number
    ) => { 
        
    emailjs.init({publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || ""});

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
                image_url: `https://ptrlstudios.com${products.find(element => element.id === item.id)?.img}`, 
                quantity: item.quantity, 
                size: item.variation.size, 
            }
        }),
        phoneNumber: values.phoneNumber,
        cost: {shipping: shipping, tax: 0, total: +totalPrice(cart) + shipping},
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