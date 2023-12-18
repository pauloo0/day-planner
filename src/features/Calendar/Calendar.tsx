import React from 'react'
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

const dow = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const colStartClasses = [
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

const meetings = [
  {
    id: 'douiwaji',
    created: '2023-12-18',
    updated: '2023-12-18',
    title: 'Meeting 1',
    start_date: '2023-12-18',
    start_time: '09:00',
    end_date: '2023-12-18',
    end_time: '10:00',
  },
  {
    id: 'dou21waji',
    created: '2023-12-15',
    updated: '2023-12-15',
    title: 'Meeting 2',
    start_date: '2023-12-15',
    start_time: '11:00',
    end_date: '2023-12-15',
    end_time: '12:00',
  },
  {
    id: 'dodacaji',
    created: '2023-12-18',
    updated: '2023-12-18',
    title: 'Meeting 3',
    start_date: '2023-12-18',
    start_time: '13:00',
    end_date: '2023-12-18',
    end_time: '14:00',
  },
  {
    id: 'dodawaji',
    created: '2023-12-20',
    updated: '2023-12-20',
    title: 'Meeting 4',
    start_date: '2023-12-20',
    start_time: '15:00',
    end_date: '2023-12-20',
    end_time: '16:00',
  },
  {
    id: 'douiwlkj',
    created: '2023-12-20',
    updated: '2023-12-20',
    title: 'Meeting 5',
    start_date: '2023-12-20',
    start_time: '17:00',
    end_date: '2023-12-20',
    end_time: '18:00',
  },
]

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedDate = parse(
    useAppSelector(getSelectedDate),
    'yyyy-MM-dd',
    new Date()
  )

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

  return (
    <div>
      <h2 className='flex flex-row justify-around align-center'>
        <button type='button' onClick={goPreviousMonth}>
          Previous
        </button>
        {format(selectedDate, 'MMMM yyyy')}
        <button type='button' onClick={goNextMonth}>
          Next
        </button>
      </h2>
      <section className='grid grid-cols-7 gap-2 my-2'>
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
            className={`p-2 text-center cursor-pointer rounded-full
            ${colStartClasses[day.getDay()]}
            ${isEqual(day, selectedDate) ? 'bg-blue-400' : 'bg-blue-100'} ${
              isSameMonth(day, selectedDate) ? 'bg-blue-200' : 'bg-gray-200'
            }`}
            onClick={() => handleDateClick(day)}
          >
            <button>{format(day, 'd')}</button>
            <div
              className={`w-1 h-1 mx-auto ${
                meetings.some((meeting) =>
                  isSameDay(parseISO(meeting.start_date), day)
                ) && 'bg-red-500'
              } rounded-full`}
            ></div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Calendar
