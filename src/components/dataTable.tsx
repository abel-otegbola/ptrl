import Link from "next/link";
import { products } from "@/data/products";
import { IOrder } from "@/interface/store";
import { sendOrderEmail } from "@/helpers/sendOrder";
import { shippingStates } from "@/data/shippingStates";
import { deleteOrder } from "@/actions/useOrder";

export default function DataTable({ headers, data, isLoading }: { headers: string[], data: IOrder[], isLoading: boolean }) {

    const handleSendEmail = (order: IOrder) => {
        sendOrderEmail(order, "", "champepesings@gmail.com", "seller", order.order_items, shippingStates.find(item => item.title === order.state)?.price || 0)
    }

    return (
        <table className="table-auto text-left md:text-[12px] text-[10px] w-full">
            
            <thead>
                <tr className="font-medium text-[10px] uppercase border border-transparent border-b-gray-400/[0.2]">
                    {
                        headers.map((header, i) => (
                            <th key={i} className="p-2">{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="">
                {
                    data?.map((order: IOrder, i: number) => (
                        <tr key={i} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100 dark:bg-gray-200/[0.05]" : ""}`}>

                            {
                                headers.map((header, i) => (
                                    header === "Id" ?
                                    <td key={i} className="p-2 max-w-[100px] truncate"><Link href={`/admin/order?id=${order?._id}`}>{order?._id}</Link></td>
                                    :
                                    header === "Date" ?
                                    <td key={i}>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    :
                                    header === "Fullname" ?
                                    <td className="p-2" key={i}><Link href={`/admin/order?id=${order?._id}`}>{order?.fullname}</Link></td>
                                    :
                                    header === "Email" ?
                                    <td className="p-2" key={i}><Link href={`/admin/order?id=${order?._id}`}>{order?.email}</Link></td>
                                    :
                                    header === "Phone Number" ?
                                    <td className="p-2 min-w-[120px]" key={i}>{order?.phoneNumber}</td>
                                    :
                                    header === "Date" ?
                                    <td className="p-2" key={i}>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    :
                                    header === "Order Items" ?
                                    <td key={i} className="p-2 text-[10px] min-w-[240px]">
                                        <Link href={`/admin/order?id=${order?._id}`}>
                                        <ol className="">
                                        {
                                            order?.order_items.map(item => products.filter(product => product.id === item?.id)[0]).map(order => (
                                                <li key={order?.id} className="flex items-center gap-2 my-1">
                                                    {order?.title}
                                                </li>
                                            ))
                                        }
                                        </ol>
                                        </Link>
                                    </td>
                                    :
                                    header === "Total" ?
                                    <td key={i} className="p-2">
                                    </td>
                                    :
                                    header === "Status" ?
                                    <td key={i} className="p-2">
                                        {order?.order_status}
                                    </td>
                                    :
                                    header === "Actions" ?
                                    <td className="p-2 md:text-[12px] text-[10px] min-w-[120px] flex gap-2 " key={i}>
                                        <button className="border rounded p-1 px-2 cursor-pointer" onClick={() => handleSendEmail(order)}>Send to mail</button>
                                        <button className="border border-red-500 text-red-600 rounded p-1 px-2 cursor-pointer" onClick={() => deleteOrder(order._id || "")}>Delete</button>
                                    </td>
                                    
                                    : ""
                                ))
                            }
                            
                            
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    )
}