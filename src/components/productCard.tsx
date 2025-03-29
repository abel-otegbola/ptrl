import { useRef } from "react";
import { useIsVisible } from "../helpers/isVisible";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: { id: number, title: string, img: string, price: string } }) {
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);

    return (
        <div ref={ref1} className={`flex flex-col gap-2 mb-4 overflow-hidden`}>
            <Link to={`/product/${product.title}`} className={`w-full 2xl:h-[20vw] sm:h-[250px] h-[220px] bg-[#f6f6f4] rounded-lg bg-cover bg-center duration-700 ease-in-out ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[10%]"}`} style={{ backgroundImage: `url('${product.img}')`, transitionDelay: `${product.id * 100}ms` }}></Link>
            <Link to={`/product/${product.title}`} className={`uppercase text-[#989898] duration-700 ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-40%]"}`}>{product.title}</Link>
            <p className={`md:text-[24px] text-[16px] tracking-[1%]  ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-60%]"}`}>{product.price} NGN</p>
        </div> 
    )
}