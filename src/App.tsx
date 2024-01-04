import React from 'react'

import Calendar from './features/Calendar/Calendar'
import MeetingList from './features/Meeting/MeetingList'

const App: React.FC = () => {
  return (
    <div>
      <Calendar />
      <MeetingList />
    </div>
  )
}

export default App
