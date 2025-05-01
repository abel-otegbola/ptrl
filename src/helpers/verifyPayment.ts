import { createOrder, updateSingleOrder } from "@/actions/useOrder"
import { verifyPayment } from "@/actions/useVerifyPayment"
import { PaystackResponse } from "@/components/modals/cart"
import { ICart } from "@/interface/store"
import { sendOrderEmail } from "./sendOrder"

export const useVerifyPayment = async (
    reference: string, 
    values: any, 
    cart: ICart[], 
    setStatus: (aug0: string) => void,
    setPopup: (aug0: { type: string, msg: string }) => void,
    shipping: number
) => {
    const updateOrder = await updateSingleOrder({ ...values, order_items: cart, reference } )
    if(updateOrder?.status) {
        setPopup({ type: "success", msg: "Order updated successfully" })
    }
    else {
        setPopup({ type: "error", msg: "Couldn't update order. Try again" })
    }
    localStorage.setItem("cart", "[]")  
    sendOrderEmail(values, reference, "champepesings@gmail.com", "seller", cart, shipping)
    sendOrderEmail(values, reference, values.email, "buyer", cart, shipping)
}