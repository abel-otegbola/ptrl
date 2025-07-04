export default function Slider() {
    return (
        <div
            className="w-full gap-8 inline-flex flex-nowrap overflow-hidden"
        >
            <ul className="w-[1328px] flex items-center sm:text-[14px] text-[14px] justify-center gap-8 md:justify-start animate-infinite-scroll">
                <li className="min-w-[305px]">
                    <p>This drop has completely sold out</p>
                </li>
                <li className="min-w-[290px]">
                    <p>Stay tuned for our next release</p>
                </li>
                <li className="min-w-[305px]">
                    <p>This drop has completely sold out</p>
                </li>
                <li className="min-w-[290px]">
                    <p>Stay tuned for our next release</p>
                </li>
            </ul>     
            <ul className="w-[1296px] flex items-center sm:text-[14px] text-[14px] justify-center gap-8 md:justify-start animate-infinite-scroll">
                <li className="min-w-[305px]">
                    <p>This drop has completely sold out</p>
                </li>
                <li className="min-w-[290px]">
                    <p>Stay tuned for our next release</p>
                </li>
                <li className="min-w-[305px]">
                    <p>This drop has completely sold out</p> 
                    {/* Performane meets style 210px */}
                </li>
                <li className="min-w-[290px]">
                    <p>Stay tuned for our next release</p>
                    {/* Shipping Available to Lagos | Ibadan | Abuja | Ogun 400px */}
                </li>
            </ul>               
        </div>
    )
}