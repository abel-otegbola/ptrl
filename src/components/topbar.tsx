import { Link } from "react-router-dom";
import Slider from "./slider";
import { useContext } from "react";
import { StoreContext } from "../context/useStore";

export default function Topbar() {
    const {cart} = useContext(StoreContext)

    return (
        <div className="overflow-hidden">
            <div className="flex gap-8 bg-[#C22026] leading-[100%] p-4 overflow-hidden text-white uppercase w-full">
                <Slider />
            </div>

            <div className="grid grid-cols-3 md:px-12 px-4 md:py-3 py-3">
                <Link to={"/"}><img src="/logo.png" width={100} height={60} alt="logo" /></Link>
                <div className="flex justify-center">
                </div>
                <div className="flex justify-end">
                    <button className="relative">
                        <img src="/cart.svg" width={32} height={32} alt="cart" />
                        <span className="absolute top-3 -right-1 bg-[#c22026] text-white rounded-full text-[10px] px-[6px]">{cart.length}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}