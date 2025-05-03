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
        <div className="gap-[5%] min-h-[100vh] md:px-12 px-4">
            <div className="items-center h-[40px]">
                <h2 className="font-bold text-[20px] uppercase">Order</h2>
            </div>

            <div className="flex flex-wrap items-start gap-6">
                <div className="md:w-[55%] w-full ">   

                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="font-semibold border-b border-gray-200 text-[16px] mt-4">Personal Information:</h1>

                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Fullname:</span> {order?.fullname}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Email:</span> {order?.email}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Phone Number:</span> {order?.phoneNumber}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="font-semibold border-b border-gray-200 text-[16px] mt-4">Shipping Information:</h1>

                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">Shipping Address:</span> {order?.address}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">City:</span> {order?.city}
                        </h2>
                        <h2 className="flex items-center gap-1 flex justify-between">
                            <span className="font-medium">State:</span> {order?.state}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <h1 className="font-semibold border-b border-gray-200 text-[16px] mt-4">Order Status:</h1>

                        <h2 className="grid grid-cols-4 items-center gap-1 flex justify-between">
                            
                            {  
                                ["Pending", "Payment Successful", "Processed", "Delivered"].map(status => (
                                    <button 
                                        key={status} 
                                        className={`w-full px-2 py-1 text-[12px] rounded ${order?.order_status === status ? "bg-[#C22026]" : "border border-gray-400"}`}
                                        onClick={() => updateSingleOrder({ ...order, order_status: status })}
                                    >{status}</button>
                                ))
                            }
                        </h2>
                    </div>

                </div>

                <div className="flex flex-col gap-6 md:w-[40%] w-full p-4 my-4 bg-gray-300/[0.08] border border-gray-500/[0.2]">
                    <h2 className="text-primary font-semibold uppercase flex items-center gap-1">Order details</h2>
                    <div className="w-full py-2 overflow-x-auto text-[12px]">
                        <table className="table-auto text-left border-collapse w-full min-w-[400px]">
                            <thead>
                                <tr className="text-primary text-[11px]">
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    products.filter((item) => order?.order_items?.map(item => item.id).indexOf(item.id) !== -1 )
                                    .map((product) => (
                                        <tr key={product.id} className="border border-gray-500/[0.2] border-x-transparent">
                                            <td  className="py-2 gap-2">
                                                {product?.title}
                                            </td>
                                            <td  className="py-2">{product?.price}.00</td>
                                            <td className="py-2">{order?.order_items?.filter(item => item.id === product?.id).map(item => item.quantity)}</td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            {currencyFormatter(shippingStates.find(item => item.title === order.state)?.price || 0)}
                        </div>

                        <div className="flex justify-between">
                            <p>Total</p>
                            <p className="font-bold text-[18px]">{currencyFormatter(totalPrice(order?.order_items) + (shippingStates.find(item => item.title === order.state)?.price || 0))}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}