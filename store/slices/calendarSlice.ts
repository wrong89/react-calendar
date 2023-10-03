import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {countingDaysOfMonth, dateDay, dateMonth, dateYear} from "../../utils/date";

export interface CalendarState {
    currentMonth: number
    currentDay: number
    currentYear: number
}

const initialState: CalendarState = {
    currentMonth: dateMonth,
    currentDay: dateDay,
    currentYear: dateYear,
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        updateYear(state, action: PayloadAction<number>) {
            state.currentYear = action.payload
        },

        updateMonth(state, action: PayloadAction<number>) {
            state.currentMonth = action.payload

            if (action.payload < 1) {
                state.currentMonth = 12
                state.currentYear -= 1
            }

            if (action.payload > 12) {
                state.currentMonth = 1
                state.currentYear += 1
            }
        },

        updateDay(state, action: PayloadAction<number>) {
            const count = countingDaysOfMonth(state.currentMonth, state.currentYear)
            state.currentDay = action.payload

            if (state.currentDay > count) {
                state.currentDay = 1
                state.currentMonth += 1
            }
            if (state.currentDay < 1) {
                state.currentDay = count
                state.currentMonth -= 1
            }
        }
    }
})

export const selectCalendar = (state: RootState) => state.calendar

export const {updateMonth, updateYear, updateDay} = calendarSlice.actions

export default calendarSlice.reducer