import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getLoginStatus, loginUser } from './userSlice'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const loginStatus = useAppSelector(getLoginStatus)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(loginUser({ email, password }))
  }

  return (
    <form
      onSubmit={(e) => handleLogin(e)}
      className='flex flex-col items-center justify-center gap-4'
    >
      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='email@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type='submit' disabled={loginStatus === 'loading' ? true : false}>
        {loginStatus === 'loading' ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}

export default Login
