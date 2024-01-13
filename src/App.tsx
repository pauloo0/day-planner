import React, { useEffect, useState } from 'react'

import Calendar from './features/Calendar/Calendar'
import MeetingList from './features/Meeting/MeetingList'
import MeetingCreateForm from './features/Meeting/MeetingCreateForm'

import { IconX, IconPlus } from '@tabler/icons-react'

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [calendarHeight, setCalendarHeight] = useState(0)
  const [meetingListHeight, setMeetingListHeight] = useState('')

  useEffect(() => {
    const screenHeight = window.innerHeight
    setMeetingListHeight(screenHeight - calendarHeight - 40 + 'px')
  }, [calendarHeight, meetingListHeight])

  console.log(meetingListHeight)

  return (
    <>
      <Calendar setCalendarHeight={setCalendarHeight} />
      <section
        className={`mt-4 bg-slate-100 min-h-[${meetingListHeight}] text-slate-900 rounded-t-[40px] `}
      >
        <MeetingList />
        <button
          type='button'
          className='absolute bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white font-bold p-2 rounded transition-all duration-150'
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? <IconX /> : <IconPlus />}
        </button>
        {isFormOpen && <MeetingCreateForm setIsFormOpen={setIsFormOpen} />}
      </section>
    </>
  )
}

export default App
