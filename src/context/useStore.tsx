'use client'
import { createContext, useState } from "react";
import { useLocalStorage } from "../helpers/useLocalStorage";
import { ICart } from "../interface/store";

interface IStoreContext {
    cart: ICart[];
    addToCart: (aug0: ICart) => void;
    removeFromCart: (id: string) => void;
    changeQuantity: (id: string, action: "ADD" | "MINUS" | number) => void;
    changeVariation: (type: string, id: string, value: string) => void;
    openCart: boolean,
    setOpenCart: (aug0: boolean) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export default function StoreContextProvider({ children }: {children: React.ReactNode}) {
    const [cart, setCart] = useLocalStorage("cart", [])
    const [openCart, setOpenCart] = useState(false)

    const addToCart = (data: ICart) => {
        setCart([...cart, data])
    }

    const removeFromCart = (id: string) => {
        setCart(cart.filter((item: ICart) => item.id !== id))
    }

    const changeQuantity = (id: string, action: "ADD" | "MINUS" | number) => {
        setCart(cart.map((item: ICart) => {
            if(item.id === id) {
                if(action === "ADD") {
                    return { id: item.id, quantity: item.quantity + 1, variation: item.variation }
                }
                else if(action === "MINUS") {
                    return { id: item.id, quantity: item.quantity < 2 ? item.quantity : item.quantity - 1, variation: item.variation }
                }
                else {
                    return { id: item.id, quantity: action, variation: item.variation }
                }
            }
            else return item;
        }))
    }

    const changeVariation = (type: string, id: string, value: string) => {
        setCart(cart.map((item: ICart) => {
            if(item.id === id) {
                if(type === "size") {
                    return { ...item, variation: { size: value } }
                }
                else {
                    return item
                }
            }
            else return item;
        }))
    }

    const data = {
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        changeVariation,
        openCart,
        setOpenCart
    }

    return (
        <StoreContext.Provider value={data} >
            {children}
        </StoreContext.Provider>
    )
}