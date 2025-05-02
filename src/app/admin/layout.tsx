'use client'
import Loginpage from "@/components/modals/login";
import { AuthContext } from "@/context/useAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      const { data } = useSession()
      const { logOut } = useContext(AuthContext)
    
    if(!data?.user) {
        return (
            <>
                <Toaster />
                <Loginpage />
            </>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="md:mx-12 mx-4 mb-6 py-6 border-b border-gray-200">
              <p className="text-[16px] font-semibold">Welcome Admin</p>
              <div className="flex justify-between items-center gap-6 flex-wrap">
                <div className="flex gap-2 mt-6">
                  <Link href={"/admin"} className="rounded p-1 px-2 text-[12px] border rounded">View orders</Link>
                  <Link href={"/admin/products"} className="rounded p-1 px-2 text-[12px] border rounded">View products</Link>
                </div>
                <button className="text-red-600 border border-red-500 rounded p-1 px-2 text-[12px] cursor-pointer" onClick={() => logOut()}>Logout</button>
              </div>
            </div>
            {children}
        </div>
    );
};