import React from 'react'
import { Meeting } from '../../app/types'

interface MeetingInformationProps {
  meeting: Meeting
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingInformation: React.FC<MeetingInformationProps> = (props) => {
  const { meeting, setIsEditing } = props

  const handleEditClick = () => {
    setIsEditing(true)
  }

  return (
    <div className='flex items-center space-x-4 border border-slate-500'>
      <div>
        <h2>{meeting.title}</h2>
        <h3>{meeting.description}</h3>
        <p>{meeting.start_date}</p>
        <p>
          {meeting.start_time} - {meeting.end_time}
        </p>
      </div>
      <button
        type='button'
        className='p-4 border-2 rounded-md border-amber-500'
        onClick={handleEditClick}
      >
        Edit
      </button>
    </div>
  )
}

export default MeetingInformation
