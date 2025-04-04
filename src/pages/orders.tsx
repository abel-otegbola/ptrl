import { useContext, useEffect } from "react";
import { products } from "../data/products";
import { StoreContext } from "../context/useStore";
import { ICart } from "../interface/store";
import CartCard from "../components/cartCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../helpers/config";

export default function OrdersPage() {
    const { cart } = useContext(StoreContext)
    const { reference } = useParams();

    useEffect(() => {
        if(reference) {
            axios.get(`${API_BASE_URL}/verify/${reference}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }, [reference])

    return (
        <main className="flex items-center flex-col gap-6 py-[8%] mx-auto md:w-[700px]">
            <h2 className="font-bold">Order {reference} placed successfully</h2>
            {   
                cart.length === 0 ?
                <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                    <p className="font-bold text-[20px]">Your cart is empty</p>
                    <p className=""></p>
                </div>
                :
                products.filter((item) => cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product) => (
                    <CartCard key={product?.id} product={product} />
                ))
            }

            
        </main>
    )
}