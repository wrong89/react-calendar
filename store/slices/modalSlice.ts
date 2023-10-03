import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export interface ModalState {
    isHidden: boolean
    triggerDay: number
}

const initialState: ModalState = {
    isHidden: true,
    triggerDay: 0
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isHidden = action.payload
        },

        saveTriggerDay(state, action: PayloadAction<number>) {
            state.triggerDay = action.payload
        }
    }
})

export const selectModal = (state: RootState) => state.modal

export const {toggleModal, saveTriggerDay} = modalSlice.actions

export default modalSlice.reducer