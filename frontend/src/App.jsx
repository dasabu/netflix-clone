import { Route, Routes, Navigate } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { Loader } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/login'
          element={!user ? <LoginPage /> : <Navigate to={'/'} />}
        />
        <Route
          path='/signup'
          element={!user ? <SignUpPage /> : <Navigate to={'/'} />}
        />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
