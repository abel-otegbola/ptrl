import { useContext, useState } from "react"
import { StoreContext } from "../context/useStore"
import { ICart } from "../interface/store"
import { currencyFormatter } from "../helpers/currencyFormatter"

export default function CartCard({ product }: { product: { id: string, title: string, img: string, price: string } }) {
    const { cart, removeFromCart } = useContext(StoreContext)
    const [actions, setActions] = useState(false)

    return (
        <div className="overflow-hidden w-full">
            <div key={product?.id} className={`relative flex items-center w-[108%] h-full gap-2 duration-500 ${actions ? "translate-x-[-8%]" : "translate-x-[0%]"}`} onDrag={() => setActions(true)} onMouseOver={() => setActions(true)} onMouseOut={() => setActions(false)}>
                <a href={`/product/${product?.id}`}>
                    <img src={product?.img} alt={product?.title} width={80} height={100} className="rounded h-full min-w-[80px]" />
                </a>
                <div className="md:px-4 py-2 px-1 mr-12 w-full h-full flex-1 flex flex-col md:gap-2 gap-[6px]">
                    <a href={`/product/${product?.id}`} className="uppercase text-[12px] leading-[140%] font-bold">{product?.title}</a>
                    <p>Size: {cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.variation.size)}</p>                                
                    <p>Quantity: {cart.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.quantity)}</p>                              
                </div>
                
                <p className="flex items-center md:text-[18px] text-[15px]">{currencyFormatter(product?.price)}</p>
                <button className={`h-full bg-red-500 w-[7%] overflow-hidden duration-500 flex items-center justify-center gap-2 text-[10px] cursor-pointer text-white`} onClick={() => removeFromCart(product?.id) }>X</button>
            </div>
        </div>
    )
}