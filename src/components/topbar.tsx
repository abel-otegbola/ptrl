import { Link } from "react-router-dom";
import Slider from "./slider";
import { useContext, useState } from "react";
import { StoreContext } from "../context/useStore";
import Cart from "./modals/cart";

export default function Topbar() {
    const { cart } = useContext(StoreContext)
    const [open, setOpen] = useState(false)

    return (
        <>
        <div className={`z-[2] ${open ? "sticky top-0 " : ""}`}>
            <div className="overflow-hidden flex gap-8 bg-[#C22026] leading-[100%] p-4 overflow-hidden text-white uppercase w-full">
                <Slider />
            </div>

            <div className="relative grid grid-cols-3 md:px-12 px-4 py-1 bg-white">
                <Link to={"/"}><img src="/logo.png" width={100} height={20} alt="logo" /></Link>
                <div className="flex justify-center">
                </div>
                <div className="flex justify-end">
                    <button className="relative cursor-pointer" onClick={(e) => {setOpen(!open); e.stopPropagation()}}>
                        <img src="/cart.svg" width={32} height={32} alt="cart" />
                        <span className="absolute top-3 -right-1 bg-[#c22026] text-white rounded-full text-[10px] px-[6px]">{cart.length}</span>
                    </button>
                </div>
                <div className={`absolute justify-end fixed top-[110px] left-0 bg-black/[0.5] w-full h-[100%] z-[2] duration-500 ${open ? "flex" : "hidden"}`}>
                    <Cart open={open} setOpen={setOpen} />
                </div>
            </div>
            
        </div>

        </>
    )
}