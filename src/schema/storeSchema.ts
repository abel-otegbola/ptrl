import * as Yup from 'yup';

export const orderSchema = Yup.object({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required("Phone number is required"), 
    address: Yup.string().required("Address is required"), 
    state: Yup.string().required("State is required"), 
    city: Yup.string().required("City is required"),
})

export const loginSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required("Password is required"),
})

export const productSchema = Yup.object({
    title: Yup.string().required("Name is required"),
    description: Yup.string().required('description is required'),
    price: Yup.string().required("Price is required"), 
    img: Yup.string().required("Image is required"), 
    category: Yup.string().required("Category is required"),
})