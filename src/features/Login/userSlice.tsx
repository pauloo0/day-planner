import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../app/types'
import { pb } from '../../app/db'

interface UserState {
  user: User
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}

const initialState: UserState = {
  user: {
    id: (pb.authStore.model?.id as string) || '',
    email: (pb.authStore.model?.email as string) || '',
    username: (pb.authStore.model?.username as string) || '',
    token: pb.authStore.token || '',
  },
  status: 'idle',
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: { email: string; password: string }) => {
    try {
      await pb.collection('users').authWithPassword(user.email, user.password)

      return {
        id: (pb.authStore.model?.id as string) || '',
        email: (pb.authStore.model?.email as string) || '',
        username: (pb.authStore.model?.username as string) || '',
        token: pb.authStore.token || '',
      }
    } catch (error) {
      console.log('Login error : ', error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'idle'
      const user = {
        id: action.payload?.id || '',
        email: action.payload?.email || '',
        username: action.payload?.username || '',
        token: action.payload?.token || '',
      }

      state.user = user
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Login failed'
    })
  },
})

export const getUserId = (state: RootState) => state.user.user.id
export const getLoginStatus = (state: RootState) => state.user.status

export default userSlice.reducer
