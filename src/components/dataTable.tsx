import { currencyFormatter } from "@/helpers/currencyFormatter";
import Link from "next/link";
import { products } from "@/data/products";
import { IOrder } from "@/interface/store";

export default function DataTable({ headers, data, isLoading }: { headers: string[], data: IOrder[], isLoading: boolean }) {

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
                                    <td key={i} className="p-2 max-w-[100px] truncate"><Link href={`/dashboard/order?id=${order?.id}`}>{order?.id}</Link></td>
                                    :
                                    header === "Date" ?
                                    <td key={i}>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    :
                                    header === "Fullname" ?
                                    <td key={i}>{order?.fullname}</td>
                                    :
                                    header === "Email" ?
                                    <td key={i}>{order?.email}</td>
                                    :
                                    header === "Phone Number" ?
                                    <td key={i}>{order?.phoneNumber}</td>
                                    :
                                    header === "Date" ?
                                    <td key={i}>{new Date(order?.updatedAt || "").toLocaleDateString("GB")}</td>
                                    :
                                    header === "Order Items" ?
                                    <td key={i} className="p-2 text-[10px]">
                                        <Link href={`/dashboard/order?id=${order?.id}`}>
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