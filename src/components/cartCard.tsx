import { useContext, useState } from "react"
import { StoreContext } from "../context/useStore"
import { ICart } from "../interface/store"
import { currencyFormatter } from "../helpers/currencyFormatter"
import Link from "next/link"

export default function CartCard({ product }: { product: { id: string, title: string, img: string, price: string, category: string } }) {
    const { cart, removeFromCart } = useContext(StoreContext)
    const [actions, setActions] = useState(false)
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragEndX, setDragEndX] = useState<number | null>(null);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent): void => {
        const clientX =
            e.type === 'touchstart'
                ? (e as React.TouchEvent).touches[0].clientX
                : (e as React.MouseEvent).clientX;
        setDragStartX(clientX);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent): void => {
        if (!dragStartX) return;
        const clientX =
            e.type === 'touchmove'
                ? (e as React.TouchEvent).touches[0].clientX
                : (e as React.MouseEvent).clientX;
        setDragEndX(clientX);
    };

    const handleDragEnd = (): void => {
        if (dragStartX !== null && dragEndX !== null) {
            const dragDistance = dragEndX - dragStartX;
            if (dragDistance > 50) {
                setActions(false); // Swipe left -> Next slide
            } else if (dragDistance < -50) {
                setActions(true); // Swipe right -> Previous slide
            }
        }
        setDragStartX(null);
        setDragEndX(null);
    };

    return (
        <div className="overflow-hidden w-full">
            <div 
                key={product?.id} 
                className={`relative flex items-center w-[108%] h-full gap-2 duration-500 ${actions ? "translate-x-[-8%]" : "translate-x-[0%]"}`} 
                onClick={() => setActions(true)} 
                onMouseOver={() => setActions(true)} 
                onMouseOut={() => setActions(false)}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                <Link href={`/product/${product?.id}`}>
                    <img src={product?.img} alt={product?.title} width={80} height={100} className="rounded h-full min-w-[80px]" />
                </Link>
                <div className="md:px-4 py-2 px-1 mr-12 w-full h-full justify-between flex-1 flex flex-col md:gap-2 gap-[6px]">
                    <Link href={`/product/${product?.id}`} className="uppercase text-[12px] leading-[140%] font-bold">{product?.title}</Link>
                    {
                        product?.category === "tee" ?
                        <p>Size: {cart?.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.variation.size)}</p> 
                        : 
                        ""                               
                    }
                    <p>Quantity: {cart?.filter((item: ICart) => item.id === product?.id).map((item: ICart) => item?.quantity)}</p>                              
                </div>
                
                <p className="flex items-center md:text-[18px] text-[15px]">{currencyFormatter(product?.price)}</p>
                <button className={`h-full bg-red-500 w-[7%] overflow-hidden duration-500 flex items-center justify-center gap-2 text-[10px] cursor-pointer text-white`} onClick={() => removeFromCart(product?.id) }>X</button>
            </div>
        </div>
    )
}