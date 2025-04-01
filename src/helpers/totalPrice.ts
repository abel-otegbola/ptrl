import { products } from "../data/products"
import { ICart } from "../interface/store"

export const totalPrice = (cart: ICart[]) => {
    return (
        products?.filter((item) => (cart.map(item => item.id)).indexOf(item.id) !== -1 )
        .map((product) => {return {price: +product?.price * cart.filter((item: ICart) => item.id === product?.id)[0]?.quantity}})
        .reduce((a: number,v: { price: number }) => a = a + v.price, 0)
    )
}