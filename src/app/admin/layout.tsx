'use client'
import Input from "@/components/input";
import { AuthContext } from "@/context/useAuth";
import { loginSchema } from "@/schema/storeSchema";
import { Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      const { data } = useSession()
      const { login, loading, logOut } = useContext(AuthContext)
    
    if(!data?.user) {
        return (
          <div className="min-h-[400px] flex mt-4 md:mx-[12%] sm:items-center justify-between">
          
                      <div className="flex w-full">
                          <div className="sm:w-[550px] mx-auto w-full sm:p-12 p-6">
                              
                              <div className="flex flex-col justify-center items-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
                                  <div>
                                      <h1 className="font-bold md:text-[20px] text-[16px] text-center">
                                          Sign in
                                      </h1>
                                  </div>
          
                                  <Formik
                                      initialValues={{ email: '', password: ''}}
                                      validationSchema={loginSchema}
                                      onSubmit={( values, { setSubmitting }) => {
                                          login(values.email, values.password, '/admin');
                                          setSubmitting(false);
                                      }}
                                      >
                                      {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleSubmit,
                                          isSubmitting,
                                      }) => (
          
                                          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 ">
                                              
                                              <Input name="email" label="" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""} placeholder="Email Address" />
          
                                              <Input name="password" label="" value={values.password} onChange={handleChange} type={"password"} error={touched.password ? errors.password : ""} placeholder="Password" />
          
                                              <button type="submit" className="w-full cursor-pointer border border-[#C22026] hover:bg-[#a21010] bg-[#C22026] text-white p-6 py-4 rounded-lg mb-4">{ isSubmitting || loading ? "Loading..." : "Sign in"}</button>
          
                                          </form>
                                      )}
                                  </Formik>
                              </div>
                          </div>
                      </div>
          
                  </div>
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