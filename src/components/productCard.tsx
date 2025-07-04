import { useRef } from "react";
import { useIsVisible } from "../helpers/isVisible";
import { currencyFormatter } from "../helpers/currencyFormatter";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/interface/store";

export default function ProductCard({ product }: {product: IProduct}) {
    const ref1 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref1);

    return (
        <div ref={ref1} className={`flex flex-col items-center gap-2 mb-4 overflow-hidden`}>
            <Link href={`/product/${product._id}`} className={`flex items-center justify-center relative text-center w-full 2xl:h-[350px] xl:h-[300px] sm:h-[270px] h-[240px] bg-[#f6f6f4] rounded-lg duration-700 ease-in-out ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[10%]"}`} style={{ transitionDelay: `${+(product?.id || 0) * 100}ms` }}>
                <Image src={product?.img || "/preview.png"} alt={product?.title} width={2400} height={2400} className="md:h-auto h-auto w-full" />
                {/* {
                    product.available ?
                    ""
                    :
                    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black/[0.2] rounded-lg">
                        <p className="text-white">Coming soon</p>
                    </div>
                } */}
                <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-black/[0.2] rounded-lg">
                    <p className="text-white">Sold out</p>
                </div>
            </Link>
            <Link href={`/product/${product._id}`} className={`text-center uppercase md:w-[75%] font-bold md:leading-[24px] leading-[16px] md:text-[15px] text-[12px] duration-700 ${isVisible ? "translate-y-[0%] opacity-[1]" : "opacity-[0] translate-y-[-40%]"}`}>{product.title}</Link>
            <p className={`font-medium ${isVisible ? "translate-y-[0%] opacity-[1] md:text-[15px] text-[14px] leading-[24px]" : "opacity-[0] translate-y-[-60%]"}`}>
                {
                    product.available ?
                    currencyFormatter(product.price)
                    :
                    ""
                }
            </p>
        </div> 
    )
}