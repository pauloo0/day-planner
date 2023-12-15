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
            {format(day, 'd')}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Calendar
