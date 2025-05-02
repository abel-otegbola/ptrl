'use client'
import ProductCard from "@/components/productCard"
import { products } from "@/data/products"
import { useEffect, useState } from "react"

export default function ProductsPage() {
    // const [products, setproducts] = useState<IOrder[]>([])
    const [selectedOrder, setSelectedOrder] = useState<string[]>([])

    useEffect(() => {
        // getAllproducts()
        // .then(response => {
        //     setproducts(response)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }, [])

    // const handleDeleteproducts = () => {
    //     selectedOrder.map(item => (
    //         deleteOrder(item)
    //     ))
    // }

    return (
        <div className="md:px-12 px-4">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[20px] uppercase">Products</h2>
                <p>Manage your products</p>
            </div>
            <div className="w-full p-4 grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
        </div>
    )
}