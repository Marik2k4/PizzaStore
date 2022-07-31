import { RootState } from "../store"

export const FilterSelector = (state: RootState) => state.filter
export const SortSelector = (state: RootState) => state.filter.sort