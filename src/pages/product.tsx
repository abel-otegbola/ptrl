import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useIsVisible } from "../helpers/isVisible";
import { StoreContext } from "../context/useStore";
import { ICart } from "../interface/store";

export default function ProductPage() {
    const { title } = useParams();
    const [product, setProduct] = useState({ id: "0", title: "", price: "", img: "", description: "" })
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);
    const ref2 = useRef<HTMLDivElement>(null)
    const isVisible2 = useIsVisible(ref2);
    const { cart, addToCart, removeFromCart, changeVariation } = useContext(StoreContext)
    const [selectedSize, setSelectedSize] = useState("L")

    useEffect(() => {
        setProduct(products?.filter(item => item.title === title)[0])
        setSelectedSize(cart.filter((item: ICart) => item.id !== product?.id)[0]?.variation.size)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])
    

    return (
        <div className="grid lg:grid-cols-2 md:px-12 py-12 p-4 gap-12">
            <div className="xl:px-[10%] lg:px-[8%]">
                <div ref={ref1} className={`w-full lg:h-full h-[450px] pb-12 bg-[#f6f6f4] rounded-lg bg-cover bg-center duration-700 ease-in-out 
                    ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[10%]"}`} 
                    style={{ backgroundImage: `url('${product?.img}')` }}
                ></div>
            </div>
            
            <div className="flex flex-col gap-6 md:px-[8%]">
                    <div className="flex justify-between md:flex-nowrap flex-wrap items-start gap-4">
                        <div>
                            <p className={`uppercase text-[#989898] duration-700 ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-40%]"}`}>{product?.title}</p>
                            <p className={`md:text-[24px] text-[16px] tracking-[1%]  ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-60%]"}`}>{product?.price} NGN</p>
                        </div>

                        <button className="md:w-[200px] cursor-pointer border border-[#C22026] p-4 py-1 uppercase text-[#C22026]">In-stock</button>
                    </div>

                    <div className="flex flex-col gap-2 pb-12">
                        <p className="uppercase text-[#989898]">size</p>
                        <div className="flex md:gap-6 gap-3">
                            {
                                ["S", "M", "L", "XL", "XXL"].map(size => (
                                    <button 
                                        key={size} 
                                        className={`cursor-pointer border border-[#000] md:px-4 px-3 py-[2px] uppercase 
                                        ${selectedSize === size ? "bg-black text-white" : "border border-gray-500/[0.4]"}`}
                                        onClick={() => { changeVariation("size", product?.id || "", size); setSelectedSize(size)}}
                                    >
                                        {size}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    
                    <div ref={ref2} className="flex flex-col gap-4 pb-12 w-full">
                        {
                            cart.map((item: ICart) => item.id).indexOf(product?.id || "") === -1 ? 
                        <button className={`cursor-pointer border border-[#000] p-6 py-4 uppercase duration-700 delay-50 ${isVisible2 ? "opacity-[1]" : "opacity-[0]"}`} onClick={() => addToCart({id: product?.id || "0", quantity: 1, variation: { color: "black", size: selectedSize }}) }>add to cart</button>
                        :
                        <button className={`cursor-pointer border border-[#000] p-6 py-4 uppercase duration-700 delay-50 ${isVisible2 ? "opacity-[1]" : "opacity-[0]"}`} onClick={() => removeFromCart(product?.id || "")}>Remove from cart</button>
                        }
                        <button className={`cursor-pointer border border-[#C22026] bg-[#C22026] text-white p-6 py-4 uppercase delay-100 duration-700 ${isVisible2 ? "opacity-[1]" : "opacity-[0]"}`}>Buy now</button>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <p className="uppercase text-[#989898]">product information</p>
                        <div className="px-6" dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                    </div>
            </div>
           
        </div>
    )
}