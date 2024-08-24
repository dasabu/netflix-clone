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
    // credentials = { email, password, username }
    set({ isSigningUp: true })
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials)
      set({
        user: response.data.data,
        isSigningUp: false,
      })
      toast.success('Account created successfully')
    } catch (error) {
      set({
        isSigningUp: false,
        user: null,
      })
      toast.error(error.response.data.message || 'Signup failed')
    }
  },

  login: async (credentials) => {
    // credentials = { email, password }
    set({ isLoggingIn: true })
    try {
      const response = await axios.post('/api/v1/auth/login', credentials)
      set({
        user: response.data.data,
        isLoggingIn: false,
      })
      toast.success('Login successfully')
    } catch (error) {
      set({
        user: null,
        isLoggingIn: false,
      })
      toast.error(error.response.data.message || 'Login failed')
    }
  },
}))
