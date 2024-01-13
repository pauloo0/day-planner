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

export const createMeeting = createAsyncThunk(
  'meetings/createMeeting',
  async (meeting: Meeting) => {
    const response = await pb.collection('meetings').create(meeting)
    return response
  }
)

export const updateMeeting = createAsyncThunk(
  'meetings/updateMeeting',
  async (meeting: Meeting) => {
    const response = await pb
      .collection('meetings')
      .update(meeting.id || '', meeting)
    return response
  }
)

export const deleteMeeting = createAsyncThunk(
  'meetings/deleteMeeting',
  async (id: string) => {
    await pb.collection('meetings').delete(id)
    return id
  }
)

export const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH MEETINGS
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

      // CREATE MEETING
      .addCase(createMeeting.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        const newMeeting: Meeting = {
          title: action.payload.title,
          description: action.payload.description,
          start_date: action.payload.start_date,
          start_time: action.payload.start_time,
          end_date: action.payload.end_date,
          end_time: action.payload.end_time,
        }

        state.status = 'succeeded'
        state.meetings.push(newMeeting)
      })
      .addCase(createMeeting.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong!'
      })

      // UPDATE MEETING
      .addCase(updateMeeting.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        const newMeeting: Meeting = {
          title: action.payload.title,
          description: action.payload.description,
          start_date: action.payload.start_date,
          start_time: action.payload.start_time,
          end_date: action.payload.start_date,
          end_time: action.payload.end_time,
        }

        state.status = 'succeeded'
        state.meetings = state.meetings.map((meeting) =>
          meeting.id === newMeeting.id ? newMeeting : meeting
        )
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong!'
      })

      // DELETE MEETING
      .addCase(deleteMeeting.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.meetings = state.meetings.filter(
          (meeting) => meeting.id !== action.payload
        )
      })
  },
})

export const selectAllMeetings = (state: RootState) => state.meetings.meetings
export const selectMeetingsByDate = (date: string) => (state: RootState) =>
  state.meetings.meetings
    .filter((meeting) => meeting.start_date === date)
    .sort((a, b) => {
      if (a.start_time < b.start_time) {
        return -1
      }
      if (a.start_time > b.start_time) {
        return 1
      }
      return 0
    })

export const selectMeetingStatus = (state: RootState) => state.meetings.status
export const selectMeetingError = (state: RootState) => state.meetings.error

export default meetingsSlice.reducer
