import { useRef } from "react";
import { useIsVisible } from "../helpers/isVisible";
import { currencyFormatter } from "../helpers/currencyFormatter";
import Link from "next/link";

export default function ProductCard({ product }: { product: { id: string, title: string, img: string, price: string } }) {
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);

    return (
        <div ref={ref1} className={`flex flex-col items-center gap-2 mb-4 overflow-hidden`}>
            <Link href={`/product/${product.id}`} className={`flex items-center justify-center text-center w-full 2xl:h-[350px] xl:h-[300px] sm:h-[270px] h-[220px] bg-[#f6f6f4] rounded-lg duration-700 ease-in-out ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[10%]"}`} style={{ transitionDelay: `${+product.id * 100}ms` }}>
                <img src={product?.img} alt={product?.title} width={260} height={260} />
            </Link>
            <Link href={`/product/${product.id}`} className={`text-center uppercase md:w-[75%] font-bold md:leading-[24px] leading-[16px] md:text-[15px] text-[12px] duration-700 ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-40%]"}`}>{product.title}</Link>
            <p className={`font-medium ${isVisible ? "translate-y-[0%] opacity-[1] md:text-[15px] text-[14px] leading-[24px]" : "opacity-[0] translate-y-[-60%]"}`}>
                {currencyFormatter(product.price)}
            </p>
        </div> 
    )
}