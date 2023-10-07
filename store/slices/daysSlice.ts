import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ICalendarDay, IDate} from "../../types/types";
import {countingDaysOfMonth} from "../../utils/date";

type updateDayType = {
    day: number
    month: number
}

export interface DaysState {
    days: ICalendarDay[]
    editedDays: ICalendarDay[]
}

const initialState: DaysState = {
    days: [],
    editedDays: [],
}

export const daysSlice = createSlice({
    name: 'days',
    initialState,
    reducers: {
        updateDays(state, action: PayloadAction<IDate>) {
            const month = +action.payload.month
            const year = +action.payload.year
            const daysCount = countingDaysOfMonth(month, year)
            state.days = []

            for (let i = 0; i < daysCount; i++) {
                const dayTemplate = {id: i, day: i + 1, highlighted: false, text: "", month, repeat: false, year}
                const editedDay = state.editedDays.find(item => {
                    if (item.day === i + 1 && month === item.month && item.repeat) return item
                    if (item.day === i + 1 && month === item.month && year === item.year) return item
                })

                if (editedDay) {
                    dayTemplate.highlighted = editedDay.highlighted
                    dayTemplate.text = editedDay.text
                    dayTemplate.repeat = editedDay.repeat

                    state.days.push(dayTemplate)
                } else {
                    state.days.push(dayTemplate)
                }
            }
        },

        updateDay(state, action: PayloadAction<updateDayType>) {
            const findDay = state.days.find(item => item.month === action.payload.month && item.day === action.payload.day)
            const findEditedDay = state.editedDays.find(item => item.month === action.payload.month && item.day === action.payload.day)

            if (findDay && findEditedDay) {
                findDay.text = findEditedDay.text
                findDay.highlighted = findEditedDay.highlighted
            }
        },

        addEditedDay(state, action: PayloadAction<ICalendarDay>) {
            const editedDay = state.editedDays.find(
                item => item.month === action.payload.month && item.day === action.payload.day && item.year === action.payload.year
            )

            if (editedDay) {
                editedDay.text = action.payload.text
                editedDay.highlighted = action.payload.highlighted
                editedDay.repeat = action.payload.repeat

            } else if (!action.payload.highlighted && action.payload.text === "") {
                return;
            } else {
                state.editedDays.push(action.payload)
            }
        },

        setEditedDays(state, action: PayloadAction<ICalendarDay[]>) {
            state.editedDays = action.payload
        },

        deleteEditedDay(state, action: PayloadAction<number>) {
            state.editedDays = state.editedDays.filter(item => item.id !== action.payload)
        },

        clearEditedDays(state) {
            state.editedDays = []
        }
    }
})

export const selectDays = (state: RootState) => state.days

export const {updateDays, updateDay, addEditedDay, deleteEditedDay, clearEditedDays, setEditedDays} = daysSlice.actions

export default daysSlice.reducer
