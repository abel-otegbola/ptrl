'use client'
import { products } from "../../data/products";
import { ICart } from "../../interface/store";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/useStore";
import CartCard from "../cartCard";
import { useOutsideClick } from "../../helpers/isClickOutside";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { totalPrice } from "../../helpers/totalPrice";
import Input from "../input";
import { Formik } from "formik";
import { orderSchema } from "../../schema/storeSchema";
import emailjs from "@emailjs/browser";
import { paystack } from "../../helpers/paystack";
import { initializeTransaction } from "@/actions/useInitializePayment";
import { Toaster, toast } from "react-hot-toast";

export interface PaystackResponse {
    status: boolean;
    message: string;
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
}

export default function Cart({ open, setOpen }: { open: boolean, setOpen: (aug0: boolean) => void }) {
    const { cart } = useContext(StoreContext)
    const [animate, setAnimate] = useState(false)
    const [status, setStatus] = useState("")
    const [popup, setPopup] = useState({ type: "", msg: "" });

    const cartRef = useOutsideClick(setOpen, false)

    useEffect(() => {
        emailjs.init(process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY || "");
    }, []);

    useEffect(() => {
        if(open) {
            setTimeout(() => {
                setAnimate(true)
            }, 200)
            setAnimate(false)
        }
        else {
            setAnimate(false)
        }
    }, [open])

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
    }, [popup]);

    return (
        <div ref={cartRef} className={`bg-white md:w-[500px] h-[100%] -translate-y-16 mb-12 sm:w-[400px] w-[100%] flex flex-col gap-6 px-6 pb-6 pt-2 duration-700 ${animate ? "translate-x-0" : "translate-x-[150%]"}`}>
            <div className="flex justify-end sticky top-0 z-[25] ">
                <button className="py-2 cursor-pointer bg-white" onClick={() => setOpen(false)}>
                    <img src="/close.svg" width={30} height={30} alt="close" />
                </button>
            </div>
            
            <Toaster containerClassName="p-8" />

            <div className="overflow-y-auto flex flex-col gap-6 ">
                <h4 className="md:text-[20px] text-[18px]">Order Summary</h4>
                <div className="flex flex-col gap-2">
                {   
                    cart?.length === 0 ?
                    <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                        <p className="font-bold text-[20px]">Your cart is empty</p>
                        <p className=""></p>
                    </div>
                    :
                    products.filter((item) => cart?.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product) => (
                        <CartCard key={product?.id} product={product} />
                    ))
                }
                </div>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>{currencyFormatter(totalPrice(cart))}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Shipping</p>
                        <p>free</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-bold md:text-[22px] text-[18px]">Total</p>
                        <p>{currencyFormatter(+totalPrice(cart))}</p>
                    </div>
                </div>

                <h4 className="md:text-[20px] text-[18px] mt-4">Shipping Details</h4> 
                <Formik
                    initialValues={{ fullname: '', email: '', phoneNumber: '', address: '', state: '', city: '' }}
                    validationSchema={orderSchema}
                    validateOnBlur={true}
                    onSubmit={async ( values, { setSubmitting }) => {
                        try {
                            const response = await initializeTransaction(values.email, ((+totalPrice(cart)) * 100).toString());
                            setStatus("initiated")
                            if((response as PaystackResponse)?.status) {
                                await paystack((response as PaystackResponse)?.data?.access_code, values.email, cart, (response as PaystackResponse)?.data?.reference, values, setStatus, setPopup)
                            }
                            else {
                                setPopup({ type: "error", msg: "Couldn't initiate payment. Try again" })
                                setSubmitting(false)
                            }
                        } 
                        catch (error) {
                            setPopup({ type: "error", msg: "Payment error" + error })
                            setSubmitting(false)
                        }
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

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 mb-20">
                            <Input placeholder="Full name" label="Full name" name="fullname" value={values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""}  />
                            <Input placeholder="Email Address" label="Email Address" name="email" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""}  />
                            <Input placeholder="Phone Number" label="Phone Number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} type="text" error={touched.phoneNumber ? errors.phoneNumber : ""}  />
                            <Input placeholder="Delivery Address" label="Delivery Address" name="address" value={values.address} onChange={handleChange} type="text" error={touched.address ? errors.address : ""}  />
                            <Input placeholder="State" label="State" name="state" value={values.state} onChange={handleChange} type="text" error={touched.state ? errors.state : ""}  />
                            <Input placeholder="City" label="City" name="city" value={values.city} onChange={handleChange} type="text" error={touched.city ? errors.city : ""}  />
                            <button disabled={cart?.length < 1 || isSubmitting} type="submit" className={`w-full cursor-pointer border border-[#C22026] hover:bg-[#a21010] bg-[#C22026] text-white p-6 py-4 rounded-lg mb-4 ${(cart?.length < 1 || isSubmitting) ? "opacity-[0.5] cursor-not-allowed": "opacity-[1]"}`}>{ isSubmitting ? status : "Proceed to Paystack"}</button>
                        </form>
                        )}
                </Formik>
            </div>
        </div>
    )
}