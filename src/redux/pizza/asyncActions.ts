import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus', 
    async (params) => {
        const { category, sortBy, order, search, currentPage } = params;
        const { data } = await axios.get(
            `https://62c55ad0134fa108c24f751c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
        );

        return data;
    }
);
  