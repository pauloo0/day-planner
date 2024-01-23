export type Meeting = {
  id?: string
  created?: string
  updated?: string
  title: string
  description?: string
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  user_id?: string
}

export type User = {
  id: string
  email: string
  username: string
  token: string
}
