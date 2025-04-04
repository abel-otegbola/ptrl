import { useRef } from "react";
import { useIsVisible } from "../helpers/isVisible";
import { Link } from "react-router-dom";

export default function Footer() {
    const ref3 = useRef<HTMLDivElement>(null)
    const isVisible = useIsVisible(ref3);

    return (
        <footer className="grid sm:grid-cols-2 gap-8 md:px-12 px-4 py-20 bg-[#F4F4F2] text-[#989898]">

            <div className="flex flex-col gap-6">
                <h4 className="font-bold leading-[24px] md:text-[22px] text-[18px] py-2 text-black uppercase">Our Mission</h4>

                <div ref={ref3} className="flex flex-col gap-6 py-2">
                    <p className={`duration-700 ${isVisible ? "opacity-[1]" : "opacity-[0]"}`}>Late nights, big dreams, and an unshakable vision.</p>
                    <p className={`duration-700 delay-50 ${isVisible ? "opacity-[1]" : "opacity-[0]"}`}>That&apos;s how we built <span className="text-[#c22026]">PTRL</span> - a Lagos-born streetwear brand built for the bold, the relentless, the ones who move different.</p>
                    <p className={`duration-700 delay-50 ${isVisible ? "opacity-[1]" : "opacity-[0]"}`}>Never follow. never settle. the mision is to redefine style with a mix of performance, culture, and raw energy.</p>
                    <p className={`duration-700 delay-100 ${isVisible ? "opacity-[1]" : "opacity-[0]"}`}>If you came for the hype, you&apos;ll stay for the quality</p>
                    <p className={`duration-700 delay-100 ${isVisible ? "opacity-[1]" : "opacity-[0]"}`}>We don&apos;t just make clothes. we make statements</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:items-center">
                <img src="/logo.png" width={90} height={60} alt="logo" className=" mt-8" />
                <p className="uppercase">Follow us</p>
                <div className="flex items-center md:gap-8 gap-4 text-[#C22026] uppercase">
                    <Link to={"https://www.instagram.com/ptrlstudios"} className=""><img src="/instagram.svg" width={25} height={25} alt="instagram"  /></Link>
                    <Link to={"https://whatsapp.com"} className=""><img src="/whatsapp.svg" width={25} height={25} alt="whatsapp"  /></Link>
                </div>
            </div>

        </footer>
    )
}