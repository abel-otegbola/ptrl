'use client'
import ProductCard from "../components/productCard";
import { products } from "../data/products";

export default function HomePage() {

    return (
        <main className="">
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