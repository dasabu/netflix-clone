import { Route, Routes } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
