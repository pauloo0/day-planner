import React, { useState } from 'react'

import Calendar from './features/Calendar/Calendar'
import MeetingList from './features/Meeting/MeetingList'
import MeetingCreateForm from './features/Meeting/MeetingCreateForm'

import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <MantineProvider>
      <Calendar />
      <MeetingList />
      <button type='button' onClick={() => setIsFormOpen(!isFormOpen)}>
        {isFormOpen ? 'Cancelar' : 'Novo'}
      </button>
      {isFormOpen && <MeetingCreateForm setIsFormOpen={setIsFormOpen} />}
    </MantineProvider>
  )
}

export default App
