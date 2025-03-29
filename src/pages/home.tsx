export default function HomePage() {
    return (
        <div>
            <div className="flex xl:h-[740px] lg:h-[600px] md:h-[520px] h-[480px] w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/bg.svg")' }}></div>

            <div className="md:px-12 px-4 py-12 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                {
                    [
                        { id: 0, title: "Bag of variety fruits", price: "15,000"},
                        { id: 1, title: "Bag of variety fruits", price: "7,000"},
                        { id: 2, title: "Bag of variety fruits", price: "8,000"},
                    ].map(product => (
                        <div key={product.id} className="flex flex-col gap-2 ">
                            <div className="w-full h-[250px] bg-[#f6f6f4] rounded-lg"></div>
                            <p className="uppercase md:text-[24px] text-[16px] leading-[36px] tracking-[1%] text-[#989898]">{product.title}</p>
                            <p className="md:text-[24px] text-[16px] leading-[36px] tracking-[1%] ">{product.price} NGN</p>
                        </div> 
                    ))
                }
            </div>
        </div>
    )
}