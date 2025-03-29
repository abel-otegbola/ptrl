import Slider from "./slider";

export default function Topbar() {
    return (
        <div className="overflow-hidden">
            <div className="flex gap-8 bg-[#C22026] leading-[100%] p-4 overflow-hidden text-white uppercase w-full">
                <Slider />
            </div>

            <div className="grid grid-cols-3 md:px-12 px-4 md:py-6 py-3">
                <span></span>
                <div className="flex justify-center">
                    <img src="/logo.webp" width={170} height={40} alt="cart" />
                </div>
                <div className="flex justify-end">
                    <button>
                        <img src="/cart.svg" width={32} height={32} alt="cart" />
                    </button>
                </div>
            </div>
        </div>
    )
}