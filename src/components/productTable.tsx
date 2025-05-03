import Link from "next/link";
import { IProduct } from "@/interface/store";
import Toggle from "./toggle";
import Input from "./input";

type ProductTableProps = { headers: string[], data: IProduct[], isLoading: boolean, handleUpdate: (index: string, value: string | number | boolean | string[], product: IProduct) => void }

export default function ProductTable({ headers, data, isLoading, handleUpdate }: ProductTableProps) {

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
                    data?.map((product: IProduct, i: number) => (
                        <tr key={i} className={`border border-gray-500/[0.2] border-x-transparent py-4 text-[12px] ${i%2 === 0 ? "bg-slate-100" : ""}`}>

                            {
                                headers.map((header, i) => (
                                    header === "Id" ?
                                    <td key={i} className="p-2 max-w-[100px] truncate"><Link href={`/admin/product?id=${product?.id}`}>{product?.id}</Link></td>
                                    :
                                    header === "Name" ?
                                    <td key={i} className="p-2 min-w-[180px]">{product?.title}</td>
                                    :
                                    header === "Category" ?
                                    <td key={i} className="p-2">{product?.category}</td>
                                    :
                                    header === "Available" ?
                                    <td className="p-2" key={i}><Toggle checkedValue={product?.available} onValueChange={(value) => handleUpdate("available", value, product)} /></td>
                                    :
                                    header === "Inventory" ?
                                    <td className="p-2 w-[120px]" key={i} >
                                        <Input className="w-[100px]" type="number" onChange={(e) => handleUpdate("stock", +e.target.value, product )} defaultValue={product?.stock} />
                                    </td>
                                    :
                                    header === "Actions" ?
                                    <td className="p-2 md:text-[12px] text-[10px] min-w-[120px] flex gap-2 " key={i}>
                                        <button className="border rounded p-1 px-2 cursor-pointer" onClick={() => {}}>Create Product</button>
                                    </td>
                                    :
                                    header === "Sizes" ?
                                    <td key={i} className="p-2 min-w-[200px]">
                                        {
                                            ["S", "M", "L", "XL", "XXL"].map(size => (
                                                <button 
                                                    key={size} 
                                                    className={`p-1 px-2 text-[10px] cursor-pointer border mx-1 ${product?.sizes.indexOf(size) !== -1 ? "bg-[#C22026]/[0.8] text-white border-black" : ""}`}
                                                    onClick={() => 
                                                        handleUpdate("sizes", product?.sizes.indexOf(size) !== -1 ? product.sizes.filter(item => item !== size) : [...product.sizes, size], product)
                                                    }
                                                >
                                                    {size}
                                                </button>
                                            ))
                                        }
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