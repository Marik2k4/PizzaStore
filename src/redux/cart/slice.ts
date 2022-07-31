import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLocalStorage();

// начальное состояние 
const initialState: CartSliceState = {
    totalPrice,
    items,
};

// создаём slice 
const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            // Если такой объет уже есть увеличиваем счетчик 
            const findById = state.items.find(obj => obj.id == action.payload.id);

            const findByType = state.items.find(obj => obj.type == action.payload.type);

            const findBySize = state.items.find(obj => obj.size == action.payload.size);

            if (findById && findByType && findBySize) {
                findById.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<string>) {
            const findById = state.items.find(obj => obj.id == action.payload);

            if(findById) {
                findById.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id != action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
       
    },
});

export const { 
    addItem,
    minusItem,
    removeItem,
    clearItems
} = cartSlice.actions;

export default cartSlice.reducer;