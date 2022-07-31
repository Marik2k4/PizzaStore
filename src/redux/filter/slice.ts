import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, sortPropertyEnum } from "./types";

// начальное состояние 
const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: sortPropertyEnum.RATING_DESC
    }
};

// создаём slice 
const filterSlice = createSlice({
    name: 'filters', // название
    initialState, // начальное состояние 
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            // сохраняем в state
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length){
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else{
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: sortPropertyEnum.RATING_DESC,
                }
            }
        },
    },
});

export const { 
    setCategoryId, 
    setSearchValue,
    setSort, 
    setCurrentPage, 
    setFilters 
} = filterSlice.actions;

export default filterSlice.reducer;