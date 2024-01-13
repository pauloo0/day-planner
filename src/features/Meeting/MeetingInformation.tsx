import React from 'react'
import { Meeting } from '../../app/types'
import { useAppDispatch } from '../../app/hooks'
import { deleteMeeting } from './meetingsSlice'
import { IconPencil, IconTrash } from '@tabler/icons-react'

interface MeetingInformationProps {
  meeting: Meeting
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingInformation: React.FC<MeetingInformationProps> = (props) => {
  const dispatch = useAppDispatch()
  const { meeting, setIsEditing } = props

  const startTime = meeting.start_time.slice(0, 5)
  const endTime = meeting.end_time.slice(0, 5)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  return (
    <div className='shadow-sm border-2 p-2 flex items-center justify-between rounded-2xl min-h-[100px]'>
      <section className='flex flex-col gap-2'>
        <h1 className='text-xl flex gap-2 items-end'>{meeting.title}</h1>
        <span className='text-sm text-slate-500'>
          <time>{startTime}</time> - <time>{endTime}</time>
        </span>

        <p>{meeting.description}</p>
      </section>

      <section id='meeting-buttons' className='flex items-center gap-2'>
        <button
          type='button'
          className='p-1 rounded-md bg-amber-500'
          onClick={handleEditClick}
        >
          <IconPencil color='white' />
        </button>
        <button
          type='button'
          className='p-1 bg-red-500 rounded-md'
          onClick={() => dispatch(deleteMeeting(meeting.id || ''))}
        >
          <IconTrash color='white' />
        </button>
      </section>
      {/*       
      <div>
        <h2>{meeting.title}</h2>
        <h3>{meeting.description}</h3>
        <p>{meeting.start_date}</p>
        <p>
          {meeting.start_time} - {meeting.end_time}
        </p>
      </div>
      <div className='flex space-x-2'>
        <button
          type='button'
          className='p-4 border-2 rounded-md border-amber-500'
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          type='button'
          className='p-4 border-2 border-red-500 rounded-md'
          onClick={() => dispatch(deleteMeeting(meeting.id || ''))}
        >
          Delete
        </button>
      </div> */}
    </div>
  )
}

export default MeetingInformation
