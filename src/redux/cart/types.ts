export type CartItem = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

// interface - типизация объекта 
export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}