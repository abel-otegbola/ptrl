import { products } from "../../data/products";
import { ICart } from "../../interface/store";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/useStore";
import CartCard from "../cartCard";
import { useOutsideClick } from "../../helpers/isClickOutside";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { totalPrice } from "../../helpers/totalPrice";

export default function Cart({ open, setOpen }: { open: boolean, setOpen: (aug0: boolean) => void }) {
    const { cart } = useContext(StoreContext)
    const [animate, setAnimate] = useState(false)

    const cartRef = useOutsideClick(setOpen, false)

    useEffect(() => {
        if(open) {
            setTimeout(() => {
                setAnimate(true)
            }, 200)
            setAnimate(false)
        }
        else {
            setAnimate(false)
        }
    }, [open])

    return (
        <div ref={cartRef} className={`bg-white md:w-[500px] sm:w-[400px] w-[85%] overflow-y-auto flex flex-col gap-6 md:p-6 p-3 duration-700 ${animate ? "translate-x-0" : "translate-x-[150%]"}`}>
            <h4>Order Summary</h4>
            <div className="flex flex-col gap-2">
            {   
                cart.length === 0 ?
                <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                    <p className="font-bold text-[20px]">Your cart is empty</p>
                    <p className=""></p>
                </div>
                :
                products.filter((item) => cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product) => (
                    <CartCard key={product?.id} product={product} />
                ))
            }
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currencyFormatter(totalPrice(cart))}</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{currencyFormatter(cart.length > 0 ? 5000 : 0)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-bold">Total</p>
                    <p>{currencyFormatter(+totalPrice(cart) + cart.length > 0 ? 5000 : 0)}</p>
                </div>
            </div>
        </div>
    )
}