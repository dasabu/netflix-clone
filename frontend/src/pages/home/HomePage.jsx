import React from 'react'

import { useAuthStore } from '../../store/useAuthStore'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'

const HomePage = () => {
  const { user } = useAuthStore()

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>
}

export default HomePage
