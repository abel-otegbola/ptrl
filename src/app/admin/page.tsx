'use client'
import { getAllOrders } from "@/actions/useOrder"
import DataTable from "@/components/dataTable"
import { IOrder } from "@/interface/store"
import { useEffect, useState } from "react"

export default function AdminPage() {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        getAllOrders()
        .then(response => {
            setOrders(response)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="md:px-12 px-4">
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[20px] uppercase">Orders</h2>
                <p>Manage your orders</p>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <div>
                    <DataTable isLoading={false} data={orders} headers={["Fullname", "Email", "Phone Number", "Order Items", "Status", "Actions"]} />
                </div>
            </div>
        </div>
    )
}