import { createListenerMiddleware, addListener, isAnyOf } from "@reduxjs/toolkit";
import type { TypedStartListening, TypedAddListener } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "./store";
import {addEditedDay, clearEditedDays, deleteEditedDay, setEditedDays} from "./slices/daysSlice";

export const listenerMiddleware = createListenerMiddleware()
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export const startAppListening = listenerMiddleware.startListening as AppStartListening
export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>

listenerMiddleware.startListening({
    matcher: isAnyOf(addEditedDay, deleteEditedDay, clearEditedDays, setEditedDays),
    effect: (action, listenerApi) => {
        localStorage.setItem("editedDays", JSON.stringify((listenerApi.getState() as RootState).days.editedDays))
    }
})