import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  parse,
  isEqual,
  add,
  isSameDay,
  parseISO,
} from 'date-fns'
import { setSelectedDate, getSelectedDate } from './calendarSlice'
import {
  fetchMeetings,
  selectMeetingError,
  selectMeetingStatus,
  selectAllMeetings,
} from '../Meeting/meetingsSlice'

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

const dow = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const colStartClasses = [
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

interface CalendarProps {
  setCalendarHeight: React.Dispatch<React.SetStateAction<number>>
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const calendarRef = useRef<HTMLDivElement>(null)
  const { setCalendarHeight } = props

  useEffect(() => {
    if (!calendarRef.current) return
    const calendarHeight = calendarRef.current?.offsetHeight || 0
    setCalendarHeight(calendarHeight)
  }, [calendarRef, setCalendarHeight])

  const dispatch = useAppDispatch()
  const selectedDate = parse(
    useAppSelector(getSelectedDate),
    'yyyy-MM-dd',
    new Date()
  )

  const month = format(selectedDate, 'MMMM')
  const year = format(selectedDate, 'yyyy')

  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  })

  const handleDateClick = (date: Date) => {
    dispatch(setSelectedDate(format(date, 'yyyy-MM-dd')))
  }

  const goPreviousMonth = () => {
    const newMonth = format(add(selectedDate, { months: -1 }), 'yyyy-MM-dd')
    dispatch(setSelectedDate(newMonth))
  }
  const goNextMonth = () => {
    const newMonth = format(add(selectedDate, { months: 1 }), 'yyyy-MM-dd')
    dispatch(setSelectedDate(newMonth))
  }

  const meetings = useAppSelector(selectAllMeetings)

  const meetingStatus = useAppSelector(selectMeetingStatus)
  const meetingError = useAppSelector(selectMeetingError)

  useEffect(() => {
    if (meetingStatus === 'idle') {
      dispatch(fetchMeetings())
    }
  }, [meetingStatus, dispatch])

  meetingError && console.log(meetingError)

  return (
    <section id='calendar' className='mx-4' ref={calendarRef}>
      <section
        id='calendar-navigation'
        className='mt-8 flex items-center justify-between'
      >
        <div id='month-year' className='flex items-center'>
          <h1 className='text-2xl flex items-end justify-start gap-1.5'>
            {month}
            <span className='text-base'>{year}</span>
          </h1>
        </div>
        <div id='month-controller' className='flex items-center gap-3'>
          <button
            type='button'
            className='p-1 bg-orange-600 rounded-md'
            onClick={goPreviousMonth}
          >
            <IconChevronLeft />
          </button>
          <button
            type='button'
            className='p-1 bg-orange-600 rounded-md'
            onClick={goNextMonth}
          >
            <IconChevronRight />
          </button>
        </div>
      </section>

      <section id='days-of-week' className='grid grid-cols-7 gap-2 my-2'>
        {dow.map((day, index) => (
          <div key={index} className='text-center'>
            {day}
          </div>
        ))}
      </section>

      <section className='grid grid-cols-7 gap-2'>
        {daysOfMonth.map((day) => (
          <div
            key={day.toString()}
            className={`p-1 text-center cursor-pointer rounded-md hover:bg-orange-500
            ${colStartClasses[day.getDay()]}
            ${isEqual(day, selectedDate) ? 'bg-orange-600' : ''} ${
              isSameMonth(day, selectedDate) ? '' : 'color-gray-400'
            }`}
            onClick={() => handleDateClick(day)}
          >
            <button>{format(day, 'd')}</button>
            <div
              className={`w-1.5 h-1.5 mx-auto ${
                meetings.some((meeting) =>
                  isSameDay(parseISO(meeting.start_date), day)
                ) && 'bg-cyan-300 border border-slate-900'
              } rounded-full`}
            ></div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Calendar
