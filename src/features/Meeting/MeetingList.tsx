import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import {
  fetchMeetings,
  selectMeetingsByDate,
  selectMeetingStatus,
  selectMeetingError,
} from './meetingsSlice'
import { getSelectedDate } from '../Calendar/calendarSlice'
import MeetingItem from './MeetingItem'

const MeetingList: React.FC = () => {
  const dispatch = useAppDispatch()

  const meetings = useAppSelector(
    selectMeetingsByDate(useAppSelector(getSelectedDate))
  )

  const meetingStatus = useAppSelector(selectMeetingStatus)
  const meetingError = useAppSelector(selectMeetingError)

  useEffect(() => {
    if (meetingStatus === 'idle') {
      dispatch(fetchMeetings())
    }
  }, [meetingStatus, dispatch])

  meetingError && <h1>{meetingError}</h1>
  meetingStatus === 'loading' && <h1>Loading...</h1>

  return (
    <div>
      {meetings.map((meeting) => (
        <MeetingItem meeting={meeting} />
      ))}
    </div>
  )
}

export default MeetingList
