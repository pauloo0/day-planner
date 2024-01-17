import React, { useState } from 'react'

import { Meeting } from '../../app/types'
import { useAppDispatch } from '../../app/hooks'
import { updateMeeting } from './meetingsSlice'
import { IconCheck, IconX } from '@tabler/icons-react'

interface MeetingEditFormProps {
  meeting: Meeting
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const MeetingEditForm: React.FC<MeetingEditFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const [meeting, setMeeting] = useState(props.meeting)

  const { setIsEditing } = props

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      className='shadow-sm border-2 p-2 flex items-center justify-between rounded-2xl min-h-[100px] gap-4'
    >
      <section id='edit-form-inputs' className='w-full'>
        <section className='flex flex-col gap-2'>
          <input
            type='text'
            id='title'
            name='title'
            className='p-1 text-xl bg-transparent border-b border-b-slate-300'
            value={meeting.title}
            onChange={(e) => handleInputChange(e)}
          />
          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-1 text-sm'>
              <input
                type='time'
                id='start_time'
                name='start_time'
                className='max-w-[75px] text-sm bg-transparent border-b border-b-slate-300 p-1'
                value={meeting.start_time}
                onChange={(e) => handleInputChange(e)}
              />
              -
              <input
                type='time'
                id='end_time'
                name='end_time'
                className='max-w-[75px] text-sm bg-transparent border-b border-b-slate-300 p-1'
                value={meeting.end_time}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <input
              type='date'
              id='start_date'
              name='start_date'
              className='p-1 bg-transparent border-b border-b-slate-300'
              value={meeting.start_date}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={2}
            className='p-1 text-sm bg-transparent border-b border-b-slate-300'
            value={meeting.description}
            onChange={(e) => handleInputChange(e)}
          />
        </section>
      </section>

      <section
        id='edit-form-buttons'
        className='flex items-center gap-2 cols-span-2'
      >
        <button type='submit' className='p-1 bg-green-500 rounded-md'>
          <IconCheck color='white' />
        </button>
        <button
          type='reset'
          className='p-1 bg-red-500 rounded-md'
          onClick={() => setIsEditing(false)}
        >
          <IconX color='white' />
        </button>
      </section>
    </form>
  )
}

export default MeetingEditForm
