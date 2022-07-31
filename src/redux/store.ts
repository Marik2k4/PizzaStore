import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice'; // Категории и сортировка 
import cart from './cart/slice'; // корзины 
import pizza from './pizza/slice'; // получение пицц с сервера 

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();