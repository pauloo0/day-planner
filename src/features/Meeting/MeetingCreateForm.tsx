import React, { useState } from 'react'
import { Meeting } from '../../app/types'

interface MeetingCreateFormProps {
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
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getSelectedDate } from '../Calendar/calendarSlice'
import { format } from 'date-fns'
import { IconCheck, IconX } from '@tabler/icons-react'
import { pb } from '../../app/db'

const MeetingCreateForm: React.FC<MeetingCreateFormProps> = (props) => {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector(getSelectedDate)

  defaultMeeting.start_date = selectedDate
  defaultMeeting.end_date = selectedDate
  defaultMeeting.start_time = format(new Date(), 'HH:mm')

  const [meeting, setMeeting] = useState(defaultMeeting)

  const { setIsFormOpen } = props

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

    if (meeting.start_date !== meeting.end_date)
      meeting.end_date = meeting.start_date

    meeting.user_id = pb.authStore.model?.id as string

    dispatch(createMeeting(meeting))
    setIsFormOpen(false)
  }

  const handleReset = () => {
    setIsFormOpen(false)
    setMeeting(defaultMeeting)
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      onReset={handleReset}
      className='flex items-center justify-between gap-4 p-2 mx-4 mt-2 border-2 shadow-sm rounded-2xl min-h-100px'
    >
      <section id='create-form-inputs' className='w-full'>
        <section className='flex flex-col gap-2'>
          <input
            type='text'
            id='title'
            name='title'
            value={meeting.title}
            onChange={(e) => handleInputChange(e)}
            placeholder='Título'
            className='p-1 text-xl bg-transparent border-b border-b-slate-300'
          />
          <div className='flex items-center justify-between'>
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
            placeholder='Descrição'
            value={meeting.description}
            onChange={(e) => handleInputChange(e)}
          />
        </section>
      </section>

      <section id='create-form-buttons' className='flex gap-2 flex-center'>
        <button type='submit' className='p-1 bg-green-500 rounded-md'>
          <IconCheck color='white' />
        </button>
        <button type='reset' className='p-1 bg-red-500 rounded-md'>
          <IconX color='white' />
        </button>
      </section>
    </form>
  )
}

export default MeetingCreateForm
