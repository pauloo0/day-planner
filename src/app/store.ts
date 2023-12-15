import { configureStore } from '@reduxjs/toolkit'

// Reducers
import meetingsReducer from '../features/Meeting/meetingsSlice'
import calendarReducer from '../features/Calendar/calendarSlice'

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer,
    calendar: calendarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
