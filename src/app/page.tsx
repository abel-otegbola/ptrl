'use client'
import { useRef } from "react";
import ProductCard from "../components/productCard";
import { useIsVisible } from "../helpers/isVisible";
import { products } from "../data/products";

export default function HomePage() {
    const ref2 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref2);

    return (
        <main className="">
            <header ref={ref2} className={`flex md:h-[0px] h-[480px] w-full bg-cover bg-no-repeat bg-center duration-500 ease-in-out ${isVisible ? "opacity-[1]" : "opacity-[0]"}`} style={{ backgroundImage: 'url("/bg.webp")' }}></header>

            <section className="md:px-12 px-4 py-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </section>
        </main>
    )
}