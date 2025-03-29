import { useRef } from "react";
import { useIsVisible } from "../helpers/isVisible";

export default function ProductCard({ product }: { product: { id: number, title: string, img: string, price: string } }) {
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);

    return (
        <div ref={ref1} className={`flex flex-col gap-2 mb-4 overflow-hidden`}>
            <div className={`w-full 2xl:h-[20vw] sm:h-[250px] h-[220px] bg-[#f6f6f4] rounded-lg bg-cover bg-center duration-700 ease-in-out ${isVisible ? "translate-x-[0%]" : "translate-x-[100%]"}`} style={{ backgroundImage: `url('${product.img}')`, transitionDelay: `${product.id * 100}ms` }}></div>
            <p className={`uppercase text-[#989898] duration-700 ${isVisible ? "translate-x-[0%]" : "translate-x-[-100%]"}`}>{product.title}{product.id * 1000}</p>
            <p className={`md:text-[24px] text-[16px] tracking-[1%]  ${isVisible ? "translate-x-[0%]" : "translate-x-[-200%]"}`}>{product.price} NGN</p>
        </div> 
    )
}