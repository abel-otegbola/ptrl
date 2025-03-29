import Slider from "./slider";

export default function Topbar() {
    return (
        <div className="overflow-hidden">
            <div className="flex gap-8 bg-[#C22026] p-4 overflow-hidden text-white uppercase w-full">
                <Slider />
            </div>

            <div className="grid grid-cols-3 md:px-12 px-4 py-6">
                <span></span>
                <div className="flex justify-center">
                    <img src="/logo.webp" width={150} height={40} alt="cart" />
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