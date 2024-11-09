import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useMediaStore } from '../store/media'
import Navbar from '../components/Navbar'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants'
import { formatReleaseDate } from '../utils/date'
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton'

const WatchPage = () => {
  const { id } = useParams()
  const [trailers, setTrailers] = useState([])
  const [mediaDetails, setMediaDetails] = useState({})
  const [similarMedia, setSimilarMedia] = useState([])

  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const { mediaType } = useMediaStore()
  const scrollContainerRef = useRef(null)

  // Get trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const response = await axios.get(`/api/v1/${mediaType}/${id}/trailers`)
        setTrailers(response.data.data)
      } catch (error) {
        console.log('WatchPage error at getTrailers: ', error.message)
        setTrailers([])
      }
    }
    getTrailers()
  }, [mediaType, id])

  // Get similar media
  useEffect(() => {
    const getSimilarMedia = async () => {
      try {
        const response = await axios.get(`/api/v1/${mediaType}/${id}/similar`)
        setSimilarMedia(response.data.data.results)
      } catch (error) {
        console.log('WatchPage error at getSimirlarMedia: ', error.message)
        setSimilarMedia([])
      }
    }
    getSimilarMedia()
  }, [mediaType, id])

  // Get media details
  useEffect(() => {
    const getMediaDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/${mediaType}/${id}/details`)
        setMediaDetails(response.data.data)
      } catch (error) {
        setMediaDetails(null)
      } finally {
        setIsLoading(false)
      }
    }
    getMediaDetails()
  }, [mediaType, id])

  // handler method to get next trailer
  const handleNextTrailer = () => {
    if (currentTrailerIndex < trailers.length - 1) {
      setCurrentTrailerIndex(currentTrailerIndex + 1)
    }
  }

  // handler method to get previous trailer
  const handlePrevTrailer = () => {
    if (currentTrailerIndex > 0) {
      setCurrentTrailerIndex(currentTrailerIndex - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollTo = scrollLeft - clientWidth

      if (scrollTo < 0) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: 'smooth',
        })
      } else {
        scrollContainerRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        })
      }
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainerRef.current
      const scrollTo = scrollLeft + clientWidth

      if (scrollTo >= scrollWidth) {
        scrollContainerRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
      } else {
        scrollContainerRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        })
      }
    }
  }

  if (isLoading)
    return (
      <div className='min-h-screen bg-black p-10'>
        <WatchPageSkeleton />
      </div>
    )

  if (!mediaDetails) {
    return (
      <div className='bg-black text-white h-screen'>
        <div className='max-w-6xl mx-auto'>
          <Navbar />
          <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
            <h2 className='text-2xl sm:text-5xl font-bold text-balance'>
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black min-h-screen w-full text-white'>
      <div className='mx-auto container h-full'>
        <Navbar />
        {/* Button to control trailers */}
        {trailers.length > 0 && (
          <div className='flex justify-between items-center px-4 mt-4'>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={currentTrailerIndex === 0}
            >
              <ChevronLeft size={24} onClick={handlePrevTrailer} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIndex === trailers.length - 1
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
              disabled={currentTrailerIndex === trailers.length - 1}
            >
              <ChevronRight size={24} onClick={handleNextTrailer} />
            </button>
          </div>
        )}
        {/* Trailer */}
        <div className='aspect-videok sm:px-20 md:px-32 px-4 mb-20 mt-4'>
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={'100%'}
              height={'70vh'}
              className='mx-auto rounded-lg overflow-hidden'
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
            />
          )}
          {/* No Trailers Available notification */}
          {trailers.length === 0 && (
            <h2 className='text-xl text-center mt-10 px-8'>
              No trailers available for{' '}
              <span className='font-bold text-red-600'>
                {mediaDetails?.title || mediaDetails?.name}
              </span>{' '}
              :(
            </h2>
          )}
        </div>
        {/* Movie/TV Show Details */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto px-10 pb-20'>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-5xl font-bold text-balance'>
              {mediaDetails?.title || mediaDetails?.name}
            </h2>

            <p className='mt-4 text-lg'>
              {formatReleaseDate(
                mediaDetails?.release_date || mediaDetails?.first_air_date
              )}{' '}
              |{' '}
              {mediaDetails?.adult ? (
                <span className='text-red-600'>18+</span>
              ) : (
                <span className='text-green-600'>PG 13</span>
              )}
            </p>
            <p className='mt-8 text-lg'> {mediaDetails?.overview} </p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + mediaDetails.poster_path}
            alt='Movie Poster'
            className='max-h-[600px] rounded-md'
          />
        </div>
        {/* Similar Movies/TV Shows */}
        {similarMedia.length > 0 && (
          <div className='mt-4 max-w-6xl mx-auto relative px-10'>
            <h3 className='text-3xl font-bold py-10'>
              Similar Movies/TV Shows
            </h3>

            <div
              className='flex overflow-x-scroll scrollbar-hide gap-4 pb-8'
              ref={scrollContainerRef}
            >
              {similarMedia.map((media) => (
                <Link
                  className='w-52 flex-none relative overflow-hidden rounded-md group'
                  key={media.id}
                  to={`/watch/${media.id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                >
                  <div className='relative overflow-hidden rounded-md'>
                    <img
                      src={SMALL_IMG_BASE_URL + media.poster_path}
                      alt='Poster path'
                      className='w-full h-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                    />
                  </div>
                  <h4 className='mt-2 text-lg font-semibold text-center transition-colors duration-300 ease-in-out group-hover:text-red-600'>
                    {media.title || media.name}
                  </h4>
                </Link>
              ))}
              <ChevronLeft
                className='absolute top-1/2 -translate-y-1/2 left-1 md:left-3 flex items-center justify-center size-12 rounded-full bg-red-600/50 hover:bg-red-700/90 hover:scale-110 transition-all duration-300 ease-in-out text-white z-10 hover:cursor-pointer'
                onClick={scrollLeft}
              />
              <ChevronRight
                className='absolute top-1/2 -translate-y-1/2 right-1 md:right-3 flex items-center justify-center size-12 rounded-full bg-red-600/50 hover:bg-red-700/90 hover:scale-110 transition-all duration-300 ease-in-out text-white z-10 hover:cursor-pointer'
                onClick={scrollRight}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WatchPage
