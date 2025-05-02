export interface ICart {
    id: string, quantity: number, variation: { size: string }
}
export interface IOrder {
    _id?: string,
    fullname: string, 
    email: string, 
    phoneNumber: string, 
    address: string, 
    state: string, 
    city: string,
    order_items: ICart[], 
    reference: string,
    updatedAt?: string,
}