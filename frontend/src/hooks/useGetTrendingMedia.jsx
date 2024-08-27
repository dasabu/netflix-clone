import { useState, useEffect } from 'react'
import { useMediaStore } from '../store/media'
import axios from 'axios'

const useGetTrendingMedia = () => {
  const [trendingMedia, setTrendingMedia] = useState(null)
  const { mediaType } = useMediaStore()

  useEffect(() => {
    const getTrendingMedia = async () => {
      const response = await axios.get(`/api/v1/${mediaType}/trending`)
      if (response?.data?.data) {
        setTrendingMedia(response.data.data)
      }
    }
    getTrendingMedia()
  }, [mediaType])

  return { trendingMedia }
}

export default useGetTrendingMedia
