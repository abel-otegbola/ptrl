'use client'
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { IOrder } from "@/interface/store"
import { currencyFormatter } from "@/helpers/currencyFormatter"
import { products } from "@/data/products"
import { getSingleOrder, updateSingleOrder } from "@/actions/useOrder"
import { totalPrice } from "@/helpers/totalPrice"
import { shippingStates } from "@/data/shippingStates"

export default function OrderSummary() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({} as IOrder)

    const id = searchParams.get("id")

    const handleStatus = (value: string) => {
        updateSingleOrder({ ...order })
    }
    
    useEffect(() => {
        if(id) {
            setLoading(true)
            getSingleOrder(id)
            .then((response) => {
                setLoading(false)
                if(response?.error) {
                    setLoading(false)                    
                }
                else {
                    setOrder(response)
                    setLoading(false)
                }
            })
            .catch((error: { message: string }) => {
                setLoading(false)
            });
        }
    }, [id])

    return (
        <div className="gap-[5%] min-h-[100vh] md:px-12 px-4 py-[40px]">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Order</h2>
            </div>

            <div className="flex flex-wrap items-start gap-6">
                <div className="md:w-[55%] w-full ">   

                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="font-semibold border-b border-gray-200 text-[16px] mt-4">Product Information:</h1>

                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Name:</span> {order?.fullname}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Description:</span> {order?.email}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Price:</span> {order?.phoneNumber}
                        </h2>

                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Category:</span> {order?.address}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Sizes:</span> {order?.city}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Available:</span> {order?.city}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Stock:</span> {order?.state}
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    )
}