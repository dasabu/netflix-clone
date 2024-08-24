import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true })
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials)
      set({ user: response.data.data, isSigningUp: false })
      toast.success('Account created successfully')
    } catch (error) {
      console.log('signup error:', error.response.data.message)
      set({ isSigningUp: false, user: null })
      toast.error(error.response.data.message || 'Signup failed')
    }
  },
}))
