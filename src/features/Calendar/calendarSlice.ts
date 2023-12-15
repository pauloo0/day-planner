import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface Calendar {
  selectedDate: string
}

const initialState: Calendar = {
  selectedDate: new Date().toISOString().slice(0, 10),
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
  },
})

export const { setSelectedDate } = calendarSlice.actions

export const getSelectedDate = (state: RootState) => state.calendar.selectedDate

export default calendarSlice.reducer
