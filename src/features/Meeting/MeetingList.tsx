import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

import {
  fetchMeetings,
  selectAllMeetings,
  selectMeetingStatus,
  selectMeetingError,
} from './meetingsSlice'

const MeetingList: React.FC = () => {
  const dispatch = useAppDispatch()
  const meetings = useAppSelector(selectAllMeetings)

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
      <h1 className='text-3xl font-bold underline'>Hello World</h1>
      {meetings.map((meeting) => (
        <div key={meeting.id}>
          <h2>{meeting.title}</h2>
          <p>{meeting.start_date}</p>
          <p>
            {meeting.start_time} - {meeting.end_time}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MeetingList
