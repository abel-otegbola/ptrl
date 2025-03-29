export default function HomePage() {
    return (
        <main className="">
            <header className="flex xl:h-[740px] lg:h-[600px] md:h-[520px] h-[480px] w-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/bg.webp")' }}></header>

            <section className="md:px-12 px-4 py-12 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                {
                    [
                        { id: 0, title: "Bag of variety fruits", price: "15,000", img: "/001.png"},
                        { id: 1, title: "Bag of variety fruits", price: "15,000", img: "/002.png"},
                        { id: 2, title: "Bag of variety fruits", price: "5,000", img: "/003.png"},
                        { id: 3, title: "Bag of variety fruits", price: "7,000", img: "/004.png"},
                        { id: 4, title: "Bag of variety fruits", price: "20,000", img: "/005.png"},
                        { id: 5, title: "Bag of variety fruits", price: "10,000", img: "/002.png"},
                        { id: 6, title: "Bag of variety fruits", price: "15,000", img: "/001.png"},
                        { id: 7, title: "Bag of variety fruits", price: "7,000", img: "/004.png"},
                        { id: 8, title: "Bag of variety fruits", price: "20,000", img: "/005.png"},
                        { id: 9, title: "Bag of variety fruits", price: "5,000", img: "/003.png"},
                    ].map(product => (
                        <div key={product.id} className="flex flex-col gap-2 mb-4">
                            <div className="w-full h-[250px] bg-[#f6f6f4] rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${product.img}')` }}></div>
                            <p className="uppercase text-[#989898]">{product.title}</p>
                            <p className="md:text-[24px] text-[16px] tracking-[1%] ">{product.price} NGN</p>
                        </div> 
                    ))
                }
            </section>
        </main>
    )
}