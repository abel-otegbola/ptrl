'use client'

import { totalPrice } from "./totalPrice";
import { ICart } from "../interface/store";
import { useVerifyPayment } from "./verifyPayment";
    

export const paystack = async (
    accessCode: string, 
    email: string, 
    cart: ICart[], 
    reference: string,
    amount: number, 
    values: { fullname: string; email: string; phoneNumber: string; address: string; state: string; city: string; }, 
    setStatus: (aug0: string) => void,
    setPopup: (aug0: { type: string, msg: string }) => void,
    setData: (aug0: any) => void,
    data: any,
    shipping: number,
    _id: string,
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
            amount,
            reference: (Math.random() * 100000).toString(),
            onCancel: () => {
                setPopup({ type: "error", msg: "Payment Cancelled." })
                return {
                    status: "cancelled",
                    reference: "",
                }
            },
            onError: (error) => {
                console.log(error)
                setPopup({ type: "error", msg: "Payment Unsuccessful." })
                return {
                    status: error,
                    reference: "",
                }
            },
            onSuccess: async (response) => { 
                setStatus("verifying")
                setData({ ...data, response})
                useVerifyPayment(response?.reference, values, cart, setStatus, setPopup, shipping, _id)
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