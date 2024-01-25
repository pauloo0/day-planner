import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getLoginStatus, loginUser } from './userSlice'

import { IconEye, IconEyeOff } from '@tabler/icons-react'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const loginStatus = useAppSelector(getLoginStatus)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(loginUser({ email, password }))
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={(e) => handleLogin(e)}
        className='flex flex-col justify-center w-10/12 max-w-[400px] gap-6 px-6 py-10 shadow-lg bg-slate-100 text-slate-900 rounded-2xl'
      >
        <div className='flex flex-col items-start justify-start w-full'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='email@example.com'
            className='w-full px-2 py-1 border rounded bg-slate-50 border-slate-300'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start justify-start w-full'>
          <label htmlFor='password'>Password:</label>
          <div className='relative w-full'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Password'
              className='w-full px-2 py-1 border rounded bg-slate-50 border-slate-300'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-0 px-2 py-1 border border-l-0 rounded rounded-tl-none rounded-bl-none bg-slate-50 border-slate-300'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 mt-4 tracking-wide text-white bg-orange-600 rounded hover:bg-orange-700'
          disabled={loginStatus === 'loading' ? true : false}
        >
          {loginStatus === 'loading' ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
