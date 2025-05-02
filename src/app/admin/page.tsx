'use client'
import { getAllOrders } from "@/actions/useOrder"
import DataTable from "@/components/dataTable"
import { sendOrderEmail } from "@/helpers/sendOrder"
import { useEffect, useState } from "react"

export default function AdminPage() {
    const [orders, setOrders] = useState([])

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
        <>
            <div className="items-center h-[80px]">
                <h2 className="font-bold text-[28px] uppercase">Orders</h2>
                <p>Manage your orders</p>
            </div>
            <div className="w-full overflow-x-auto min-h-[400px] rounded-lg border border-gray-500/[0.1] bg-gray-100/[0.08]">
                <div>
                    <DataTable isLoading={false} data={orders} headers={["Id", "Fullname", "Email", "Phone Number", "Status"]} />
                </div>
            </div>
        </>
    )
}