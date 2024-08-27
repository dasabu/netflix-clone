import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { isLoggingIn, login } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login({ email, password })
  }

  return (
    <div className='hero-bg relative h-screen'>
      <header className='max-w-6xl mx-auto flex items-center justify-between md:p-10 pb-10 p-6'>
        <Link to={'/'}>
          <img
            src='/netflix-logo.png'
            alt='netflix-clone-logo'
            className='md:w-40 w-32'
          ></img>
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white font-bold text-2xl mb-4'>
            Login
          </h1>
          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label
                htmlFor='email'
                className='text-sm font-medium text-gray-300 block'
              >
                Email
              </label>
              <input
                type='text'
                placeholder='example@gmail.com'
                id='email'
                className='text-white w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-transparent focus:ring'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='text-sm font-medium text-gray-300 block'
              >
                Password
              </label>
              <input
                type='password'
                placeholder='••••••'
                id='password'
                className='text-white w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-transparent focus:ring'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className='w-full text-white font-semibold bg-red-600 p-2 rounded-md hover:bg-red-700'
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <div>
            <div className='text-center text-gray-400 text-white'>
              Don't have account?{' '}
              <Link
                to='/signup'
                className='text-red-500 hover:text-red-700 hover:underline'
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
