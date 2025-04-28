'use client'
import { useContext, useEffect, useRef, useState } from "react";
import { useIsVisible } from "../../../helpers/isVisible";
import { StoreContext } from "../../../context/useStore";
import { products } from "../../../data/products";
import { ICart } from "../../../interface/store";
import { currencyFormatter } from "../../../helpers/currencyFormatter";
import ProductCard from "../../../components/productCard";
import { useParams } from "next/navigation";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";

export default function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState({ id: "0", title: "", price: "", img: "", img2: "", description: "" })
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);
    const ref2 = useRef<HTMLDivElement>(null)
    const isVisible2 = useIsVisible(ref2);
    const { cart, addToCart,changeQuantity, removeFromCart, changeVariation, setOpenCart } = useContext(StoreContext)
    const [selectedSize, setSelectedSize] = useState("L")
    
    useEffect(() => {
        setProduct(products?.filter(item => item.id === slug)[0])
        setSelectedSize(cart?.filter((item: ICart) => item.id !== product?.id)[0]?.variation.size || selectedSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    

    return (
        <main>
            <div className="grid lg:grid-cols-2 md:px-12 md:py-12 p-4 gap-12">
                <div className="xl:px-[10%] lg:px-[8%]">
                    <Slider {...settings} className="w-full rounded-lg max-w-[92vw]">
                        {[product?.img, product?.img2].map((img, index) => (
                            <Image src={img} alt={product.title} key={index} width={2400} height={2400} className={`pb-12 w-full rounded-lg bg-cover bg-center`} 
                            />
                        ))}
                    </Slider>
                </div>
                
                <div className="flex flex-col gap-6 md:px-[8%]">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-3 md:text-[16px] text-[14px]">
                                <p className={`uppercase font-bold duration-700 ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-40%]"}`}>{product?.title}</p>
                                <p className={`font-medium ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-60%]"}`}>{currencyFormatter(product?.price)}</p>
                            </div>
                            <p className="uppercase text-[#989898]">all items in stock</p>

                        </div>

                        <div className="flex flex-col gap-2 pb-12">
                            <p className="uppercase text-[#989898]">size</p>
                            <div className="flex md:gap-6 gap-3 items-center">
                                {
                                    ["S", "M", "L", "XL", "XXL"].map(size => (
                                        <button 
                                            key={size} 
                                            disabled={size === "S" || size === "XXL"}
                                            className={`cursor-pointer border border-black md:px-4 px-3 py-[4px] uppercase leading-[24px] hover:bg-black hover:text-white duration-500
                                            ${selectedSize === size ? "bg-black text-white" : "border black"}
                                            ${size === "S" || size === "XXL" ? "opacity-[0.2]" : ""}
                                            `}
                                            onClick={() => { changeVariation("size", product?.id || "", size); setSelectedSize(size)}}
                                        >
                                            {size}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        
                        <div ref={ref2} className="flex flex-col gap-4 pb-2 w-full">
                            {
                            cart?.map((item: ICart) => item.id).indexOf(product?.id || "") === -1 ? 
                            <button 
                                className={`cursor-pointer border border-[#000] hover:bg-black hover:text-white p-6 py-4 rounded-lg uppercase duration-700 delay-50 ${isVisible2 ? "opacity-[1]" : "opacity-[0]"}`} 
                                onClick={() => addToCart({id: product?.id || "0", quantity: 1, variation: { size: selectedSize }}) }
                            >
                                add to cart
                            </button>
                            :
                            <div className="flex justify-between text-[20px] items-center gap-1">
                                <button 
                                    className="h-[50px] w-[100px] border border-black cursor-pointer rounded-lg" 
                                    onClick={() => changeQuantity(product?.id || "", "ADD")}
                                >
                                    +
                                </button>
                                <input 
                                    className="w-[40px] py-2 text-center" 
                                    type="number" 
                                    value={cart?.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item.quantity).toString()} 
                                    onChange={(e) => changeQuantity(product?.id, +e.target.value)} 
                                />
                                <button 
                                    className="h-[50px] w-[100px] text-[20px] border border-black cursor-pointer rounded-lg" 
                                    onClick={() => cart?.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item.quantity).toString() === "1" 
                                    ? removeFromCart(product?.id) : changeQuantity(product?.id || "", "MINUS")
                                }>
                                -
                                </button>
                            </div> 
                            }
                            
                            <button 
                                className={`cursor-pointer border border-[#C22026] hover:bg-[#a21010] bg-[#C22026] text-white p-6 py-4 rounded-lg uppercase delay-100 duration-700 ${isVisible2 ? "opacity-[1]" : "opacity-[0]"}`} 
                                onClick={cart?.find(element => element.id === product?.id) ? () => setOpenCart(true) : () => { 
                                    addToCart({id: product?.id || "0", quantity: 1, variation: {size: selectedSize }});
                                    setOpenCart(true)} 
                                }
                            >
                                Buy now
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-2 text-black leading-[36px] uppercase">
                            <div className="" dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                        </div>
                </div>
            
            </div>

            <section className="md:p-12 p-4 py-12">
                <h4 className="font-bold py-4 md:text-[20px] text-[16px]">You may also like</h4>
                <section className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-6 gap-4">
                    {
                        products?.filter(item => item.id !== slug).slice(0,4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </section>
            </section>
        </main>
    )
}