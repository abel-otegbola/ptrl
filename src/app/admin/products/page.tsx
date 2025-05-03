'use client'
import { getAllProducts, updateSingleProduct } from "@/actions/useProducts"
import ProductTable from "@/components/productTable"
import { IProduct } from "@/interface/store"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [popup, setPopup] = useState({ type: "", msg: "" });

    useEffect(() => {
        getAllProducts()
        .then(response => {
            setProducts(response)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleUpdate = (index: string, value: string | number | boolean | string[], product: IProduct) => {
        updateSingleProduct({ ...product, [index]: value })
        setProducts(
            products.map(item => {
                if(item._id === product._id) {
                    return { ...product, [index]: value }
                }
                else {
                    return item
                }
            }
            )
        )
    }

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
    }, [popup]);

    // const handleDeleteproducts = () => {
    //     selectedOrder.map(item => (
    //         deleteOrder(item)
    //     ))
    // }

    return (
        <div className="md:px-12 px-4">
            <Toaster />
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[20px] uppercase">Products</h2>
                <p>Manage your products</p>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <div>
                    <ProductTable isLoading={false} data={products} headers={["Name", "Category", "Available", "Inventory", "Sizes" ]} handleUpdate={handleUpdate} />
                </div>
            </div>
        </div>
    )
}