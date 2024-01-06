import React, { useState } from 'react'

import { Meeting } from '../../app/types'
import { useAppDispatch } from '../../app/hooks'
import { updateMeeting } from './meetingsSlice'

interface MeetingEditFormProps {
  meeting: Meeting
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingEditForm: React.FC<MeetingEditFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const [meeting, setMeeting] = useState(props.meeting)

  const { setIsEditing } = props

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    let value = e.target.value

    if (name === 'start_time' || name === 'end_time') {
      value += ':00'
    }

    setMeeting({ ...meeting, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(updateMeeting(meeting))
    setIsEditing(false)
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex items-center space-x-4 border border-slate-500'
    >
      <div className='flex flex-col gap-2'>
        <input
          type='text'
          id='title'
          name='title'
          value={meeting.title}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type='text'
          id='description'
          name='description'
          value={meeting.description}
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type='date'
          id='start_date'
          name='start_date'
          value={meeting.start_date}
          onChange={(e) => handleInputChange(e)}
        />

        <div className='flex items-center space-x-2'>
          <input
            type='time'
            id='start_time'
            name='start_time'
            value={meeting.start_time}
            onChange={(e) => handleInputChange(e)}
          />
          -
          <input
            type='time'
            id='end_time'
            name='end_time'
            value={meeting.end_time}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>

      <div className='flex space-x-2'>
        <button
          type='submit'
          className='p-4 border-2 border-green-500 rounded-md'
        >
          Save
        </button>
        <button
          type='reset'
          className='p-4 border-2 rounded-md border-zinc-500'
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default MeetingEditForm
