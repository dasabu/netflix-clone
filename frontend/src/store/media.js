import { create } from 'zustand'

export const useMediaStore = create((set) => ({
  mediaType: 'movie', // 'movie' or 'tv', default value will be 'movie'
  setMediaType: (type) => {
    set({ mediaType: type })
    console.log({ type })
  },
}))
