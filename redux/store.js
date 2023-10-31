import { configureStore } from "@reduxjs/toolkit"
import eventSlice from "./globalStates"

export const store = configureStore({
  reducer: {
  event : eventSlice,
 
  },
})

