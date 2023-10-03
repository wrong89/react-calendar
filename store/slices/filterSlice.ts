import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface FilterState {
    searchValue: string
}

const initialState: FilterState = {
    searchValue: "",
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        sort(state, action: PayloadAction<string>) {

        }
    }
})

export const selectFilter = (state: RootState) => state.filter

export const { updateSearch } = filterSlice.actions

export default filterSlice.reducer