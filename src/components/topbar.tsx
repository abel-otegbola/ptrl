'use client'
import Slider from "./slider";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/useStore";
import Cart from "./modals/cart";
import Link from "next/link";

export default function Topbar() {
    const { cart, openCart, setOpenCart } = useContext(StoreContext)
    const [cartAmount, setCartAmount] = useState(0)

    useEffect(() => {
        setCartAmount(cart.length)
    }, [cart])

    return (
        <>
        <div className={`relative z-[2] bg-white ${openCart ? "sticky top-0 left-0" : ""}`}>
            <div className="overflow-hidden flex gap-8 bg-[#C22026] z-[30] leading-[100%] p-4 overflow-hidden text-white uppercase w-full">
                <Slider />
            </div>

            <div className="relative flex justify-between md:px-12 px-4 sm:py-1 bg-white">
                <Link href={"/"} className="z-[3] bg-white sm:w-auto w-[100%]"><img src="/logo.png" width={100} height={20} alt="logo" /></Link>
                <div className="flex justify-end">
                    <button className="relative cursor-pointer" onClick={() => setOpenCart(!openCart)}>
                        <img src="/cart.svg" width={32} height={32} alt="cart" />
                        <span className="absolute top-3 -right-1 bg-[#c22026] text-white rounded-full text-[10px] px-[6px]">{cartAmount}</span>
                    </button>
                </div>
            </div>
                <div className={`absolute justify-end fixed top-[112px] left-0 bg-black/[0.5] w-full h-[100%] z-[2] duration-500 ${openCart ? "flex" : "hidden"}`}>
                    <Cart open={openCart} setOpen={setOpenCart} />
                </div>
            
        </div>

        </>
    )
}