import React, { useState } from 'react'
import { Meeting } from '../../app/types'

interface MeetingFormProps {
  mode: 'add' | 'edit'
  meeting?: Meeting
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultMeeting: Meeting = {
  title: '',
  description: '',
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
}

import { createMeeting } from './meetingsSlice'
import { useAppDispatch } from '../../app/hooks'

const MeetingForm: React.FC<MeetingFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const [meeting, setMeeting] = useState(defaultMeeting)

  const { setIsFormOpen } = props

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

    dispatch(createMeeting(meeting))
    setIsFormOpen(false)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor='title'>Title:</label>
      <input
        type='text'
        id='title'
        name='title'
        value={meeting.title}
        onChange={(e) => handleInputChange(e)}
      />
      <label htmlFor='description'>Description:</label>
      <input
        type='text'
        id='description'
        name='description'
        value={meeting.description}
        onChange={(e) => handleInputChange(e)}
      />
      <label htmlFor='start_date'>Start Date:</label>
      <input
        type='date'
        id='start_date'
        name='start_date'
        value={meeting.start_date}
        onChange={(e) => handleInputChange(e)}
      />
      <label htmlFor='start_time'>Start Time:</label>
      <input
        type='time'
        id='start_time'
        name='start_time'
        value={meeting.start_time}
        onChange={(e) => handleInputChange(e)}
      />
      <label htmlFor='end_date'>End Date:</label>
      <input
        type='date'
        id='end_date'
        name='end_date'
        value={meeting.end_date}
        onChange={(e) => handleInputChange(e)}
      />
      <label htmlFor='end_time'>End Time:</label>
      <input
        type='time'
        id='end_time'
        name='end_time'
        value={meeting.end_time}
        onChange={(e) => handleInputChange(e)}
      />
      <button type='submit'>Save</button>
      <button type='reset'>Cancel</button>
    </form>
  )
}

export default MeetingForm
