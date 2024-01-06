import React, { useState } from 'react'

import Calendar from './features/Calendar/Calendar'
import MeetingList from './features/Meeting/MeetingList'
import MeetingForm from './features/Meeting/MeetingForm'

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div>
      <Calendar />
      <MeetingList />
      <button type='button' onClick={() => setIsFormOpen(!isFormOpen)}>
        {isFormOpen ? 'Cancelar' : 'Novo'}
      </button>
      {isFormOpen && <MeetingForm mode='add' setIsFormOpen={setIsFormOpen} />}
    </div>
  )
}

export default App
