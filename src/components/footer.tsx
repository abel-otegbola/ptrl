
export default function Footer() {
    return (
        <footer className="flex flex-col items-center text-center gap-8 md:px-12 px-4 py-20">

            <h4 className="font-bold leading-[24px] md:text-[50px] text-[30px]">OUR STORY</h4>

            <div className="flex flex-col gap-4 py-8 uppercase text-[#989898]">
                <p>Late nights, big dreams, and an unshakable vision.</p>
                <p>that&apos;s how we built ptrl - a lagos-born streetwear brand built for the bold, the relentless, the ones who move different.</p>
                <p>never follow. never settle. the mision is to redefine style with a mix of performance, culture, and raw energy.</p>
                <p>if you came for the hpye, you&apos;ll stay for the quality</p>
                <p>We don&apos;t just make clothes. we make statements</p>
            </div>
            
            <div className="flex flex-col gap-4">
                <p className="text-[#000]">&copy; {new Date().getFullYear()}, PTRL</p>
                <div className="flex items-center gap-6 text-[#C22026] uppercase">
                    <p>[Whatsapp]</p>
                    <p>[Instagram]</p>
                </div>
            </div>

        </footer>
    )
}