import React from 'react'

import { useAuthStore } from '../../store/useAuthStore'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'

const HomePage = () => {
  const user = true
  // const { user } = useAuthStore()

  if (user) return <AuthScreen />
  else return <HomeScreen />
}

export default HomePage
