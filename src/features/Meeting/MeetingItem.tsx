import React, { useState } from 'react'
import { Meeting } from '../../app/types'

import MeetingInformation from './MeetingInformation'
import MeetingEditForm from './MeetingEditForm'

interface MeetingItemProps {
  meeting: Meeting
}

const MeetingItem: React.FC<MeetingItemProps> = (props) => {
  const { meeting } = props
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <MeetingEditForm meeting={meeting} setIsEditing={setIsEditing} />
  }

  return <MeetingInformation meeting={meeting} setIsEditing={setIsEditing} />
}

export default MeetingItem
