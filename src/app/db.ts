import PocketBase from 'pocketbase'

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || ''

export const pb = new PocketBase(DATABASE_URL)
