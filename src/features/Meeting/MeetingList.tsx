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
    <section className='mx-4 pt-10 flex flex-col gap-2 overflow-auto'>
      {meetings.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
    </section>
  )
}

export default MeetingList
