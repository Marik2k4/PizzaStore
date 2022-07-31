import { RootState } from "../store";

export const CartSelector = (state: RootState) => state.cart;

export const CartItemByIdSelector = (id: string) => (state: RootState) => 
    state.cart.items.find(obj => obj.id == id);