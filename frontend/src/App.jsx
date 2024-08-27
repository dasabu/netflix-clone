import { Route, Routes, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'

import { useAuthStore } from './store/auth'
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import WatchPage from './pages/WatchPage'
import NotFoundPage from './pages/NotFoundPage'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    authCheck()
  }, [authCheck])

  // Loading spinner
  if (isCheckingAuth) {
    return (
      <div className='h-screen bg-black w-full'>
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
        <Route
          path='/search'
          element={user ? <SearchPage /> : <Navigate to={'/'} />}
        />
        <Route
          path='/watch/:id'
          element={user ? <WatchPage /> : <Navigate to={'/'} />}
        />
        <Route
          path='/history'
          element={user ? <SearchHistoryPage /> : <Navigate to={'/'} />}
        />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
