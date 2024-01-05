import React from 'react'
import { Meeting } from '../../app/types'

interface MeetingItemProps {
  meeting: Meeting
}

const MeetingItem: React.FC<MeetingItemProps> = (props) => {
  const { meeting } = props

  return (
    <div>
      <h2>{meeting.title}</h2>
      <p>{meeting.start_date}</p>
      <p>
        {meeting.start_time} - {meeting.end_time}
      </p>
    </div>
  )
}

export default MeetingItem
