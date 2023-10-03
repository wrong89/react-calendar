import {configureStore} from "@reduxjs/toolkit";
import modal from "./slices/modalSlice";
import calendar from "./slices/calendarSlice"
import days from "./slices/daysSlice"
import filter from "./slices/filterSlice"
import {listenerMiddleware} from "./listenerMiddleware";

const editedDaysState = JSON.parse(localStorage.getItem("editedDays") || "null")

export const store = configureStore({
    preloadedState: {
        days: editedDaysState === null ? {days: [], editedDays: []} : {days: [], editedDays: editedDaysState}
    },
    reducer: {
        calendar,
        filter,
        modal,
        days
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        listenerMiddleware.middleware
    ]
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch