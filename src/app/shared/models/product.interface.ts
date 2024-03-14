export interface Rating{
    rate: number;
    count: number;
}

export interface Product{
    id: number;
    title: string,
    price: number;
    description: string;
    image: string
    rating: Rating;
    qty: number;
    subTotal: number;
}