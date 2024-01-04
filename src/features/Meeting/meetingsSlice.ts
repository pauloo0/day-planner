import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Meeting } from '../../app/types'
import { pb } from '../../app/db'

interface MeetingState {
  meetings: Meeting[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: MeetingState = {
  meetings: [],
  status: 'idle',
  error: null,
}

export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async () => {
    const response = await pb.collection('meetings').getFullList<Meeting>()
    return response
  }
)

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meetings = action.payload
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong!'
      })
  },
})

export const selectAllMeetings = (state: RootState) => state.meetings.meetings
export const selectMeetingsByDate = (date: string) => (state: RootState) =>
  state.meetings.meetings.filter((meeting) => meeting.start_date === date)

export const selectMeetingStatus = (state: RootState) => state.meetings.status
export const selectMeetingError = (state: RootState) => state.meetings.error

export default meetingsSlice.reducer
