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
import axios from "axios";
import PaystackPop from '@paystack/inline-js'
import { API_BASE_URL } from "../../helpers/config";

export default function Cart({ open, setOpen }: { open: boolean, setOpen: (aug0: boolean) => void }) {
    const { cart } = useContext(StoreContext)
    const [animate, setAnimate] = useState(false)
    const popup = new PaystackPop()

    const cartRef = useOutsideClick(setOpen, false)

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

    return (
        <div ref={cartRef} className={`bg-white md:w-[500px] h-[100%] -translate-y-16 mb-12 sm:w-[400px] w-[100%] overflow-y-auto flex flex-col gap-6 px-6 pb-6 pt-2 duration-700 ${animate ? "translate-x-0" : "translate-x-[150%]"}`}>
            <div className="flex justify-end">
                <button className="py-4 cursor-pointer" onClick={() => setOpen(false)}>
                    <img src="/close.svg" width={30} height={30} alt="close" />
                </button>
            </div>
            <h4 className="md:text-[20px] text-[18px]">Order Summary</h4>
            <div className="flex flex-col gap-2">
            {   
                cart.length === 0 ?
                <div className="min-h-[200px] flex flex-col gap-4 justify-center items-center">
                    <p className="font-bold text-[20px]">Your cart is empty</p>
                    <p className=""></p>
                </div>
                :
                products.filter((item) => cart.map((item: ICart) => item.id).indexOf(item.id) !== -1 ).map((product) => (
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
                    <p>{currencyFormatter(cart.length > 0 ? 5000 : 0)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-bold md:text-[22px] text-[18px]">Total</p>
                    <p>{currencyFormatter(+totalPrice(cart) + (cart.length > 0 ? 5000 : 0))}</p>
                </div>
            </div>

            <h4 className="md:text-[20px] text-[18px] mt-4">Shipping Details</h4> 
                <Formik
                    initialValues={{ fullname: '', email: '', phoneNumber: '', address: '', state: '', city: '' }}
                    validationSchema={orderSchema}
                    validateOnBlur={true}
                    onSubmit={( values, { setSubmitting }) => {
                        axios.post(`${API_BASE_URL}/initialize`, {email: values.email, amount: ((+totalPrice(cart) + 5000) * 100).toString()})
                        .then(response => {
                            popup.resumeTransaction(response?.data?.data?.access_code)
                            popup.checkout({
                                key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
                                email: values.email,
                                amount: (+totalPrice(cart) + 5000) * 100,
                                reference: response?.data?.data?.reference,
                                onCancel: () => {
                                  console.log('Popup closed without payment');
                                },
                                onSuccess: (response) => {
                                  console.log('Payment completed. Reference:', response.reference);
                                  
                                  // Now verify the payment
                                  axios.get(`${API_BASE_URL}/verify/${response.reference}`)
                                    .then(verification => {
                                      console.log('Verified transaction:', verification.data);
                                      // The actual transaction ID is in verification.data.data.id
                                      const transactionId = verification.data.data.id;
                                      console.log('Transaction ID:', transactionId);
                                    });
                                }
                            });
                        
                        })
                        .catch(error => console.log(error))

                        // axios.post("http://localhost:3000/order", {...values, order_items: cart})
                        // .then(response => console.log(response))
                        // .catch(error => console.log(error))
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

                        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 mb-20">
                            <Input placeholder="Full name" label="Full name" name="fullname" value={values.fullname} onChange={handleChange} type="text" error={touched.fullname ? errors.fullname : ""}  />
                            <Input placeholder="Email Address" label="Email Address" name="email" value={values.email} onChange={handleChange} type="email" error={touched.email ? errors.email : ""}  />
                            <Input placeholder="Phone Number" label="Phone Number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} type="text" error={touched.phoneNumber ? errors.phoneNumber : ""}  />
                            <Input placeholder="Delivery Address" label="Delivery Address" name="address" value={values.address} onChange={handleChange} type="text" error={touched.address ? errors.address : ""}  />
                            <Input placeholder="State" label="State" name="state" value={values.state} onChange={handleChange} type="text" error={touched.state ? errors.state : ""}  />
                            <Input placeholder="City" label="City" name="city" value={values.city} onChange={handleChange} type="text" error={touched.city ? errors.city : ""}  />
                            <button type="submit" className="w-full cursor-pointer border border-[#C22026] hover:bg-[#a21010] bg-[#C22026] text-white p-6 py-4 rounded-lg mb-20">{ isSubmitting ? "" : "Proceed to Paystack"}</button>
                        </form>
                        )}
                </Formik>
        </div>
    )
}