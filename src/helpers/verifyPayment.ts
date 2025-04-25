import { createOrder } from "@/actions/useOrder"
import { verifyPayment } from "@/actions/useVerifyPayment"
import { PaystackResponse } from "@/components/modals/cart"
import { ICart } from "@/interface/store"
import { sendOrderEmail } from "./sendOrder"

export const useVerifyPayment = async (
    reference: string, 
    values: any, 
    cart: ICart[], 
    setStatus: (aug0: string) => void,
    setPopup: (aug0: { type: string, msg: string }) => void
) => {
    const res = await verifyPayment(reference)

    if((res as PaystackResponse)?.status) {
        const newOrder = await createOrder({ ...values, order_items: cart, reference } )
        if(newOrder?.status) {
            setStatus("verified")
            localStorage.setItem("cart", "[]")  
            sendOrderEmail(values, reference, "champepesings@gmail.com", "seller", cart)
            sendOrderEmail(values, reference, values.email, "buyer", cart)
        }
        else {
            setPopup({ type: "error", msg: "Saving order failed" })
            setStatus("Saving order failed")
            localStorage.setItem("cart", "[]")  
            sendOrderEmail(values, reference, "champepesings@gmail.com", "seller", cart)
            sendOrderEmail(values, reference, values.email, "buyer", cart)
        }
    }
    else {
        setPopup({ type: "error", msg: "Verification Unsuccessful." })
        setStatus("Verification failed")
    }
}