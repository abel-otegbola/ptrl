import * as Yup from 'yup';

export const orderSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required("Phone number is required"), 
    address: Yup.string().required("Address is required"), 
    state: Yup.string().required("State is required"), 
    city: Yup.string().required("City is required"),
})