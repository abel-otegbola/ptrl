import { Metadata } from "next"
import Footer from "../components/footer"
import Topbar from "../components/topbar"
import { Inter } from "next/font/google";
import StoreContextProvider from "../context/useStore";
import './globals.css'
import AuthProvider from "@/context/useAuth";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'PTRL',
    description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body className={`${inter.className} antialiased md:text-[14px] text-[12px]`}>
                <AuthProvider>
                    <StoreContextProvider>
                        <Topbar />
                        <div id="root">{children}</div>
                        <Footer />
                    </StoreContextProvider>
                </AuthProvider>
            </body>
        </html>
    )
}