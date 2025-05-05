'use client'
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import { IProduct } from "@/interface/store";
import { getAllProducts } from "@/actions/useProducts";

export default function HomePage() {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        getAllProducts()
        .then(response => {
            setProducts(response)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <main className="">
            <section className="md:px-12 px-4 py-12 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                {
                    products?.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </section>
        </main>
    )
}