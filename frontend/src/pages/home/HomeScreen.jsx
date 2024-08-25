import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const HomeScreen = () => {
  const { logout } = useAuthStore()

  return (
    <>
      <span>HomeScreen</span>
      <div>
        <button className='bg-red-500' onClick={logout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default HomeScreen
