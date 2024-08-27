import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { useMediaStore } from '../store/media'
import { Link } from 'react-router-dom'
import { SMALL_IMG_BASE_URL } from '../utils/constants'

const MovieSlider = ({ category }) => {
  const { mediaType } = useMediaStore()
  const [media, setMedia] = useState([])
  const [showArrows, setShowArrows] = useState(false) // scroll left and right arrows

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const getMedia = async () => {
      const response = await axios.get(`/api/v1/${mediaType}/${category}`)
      if (response?.data?.data?.results) setMedia(response.data.data.results)
    }
    getMedia()
  }, [mediaType, category])

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

  return (
    <div
      className='text-white bg-black relative px-5 md:px-20'
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className='mb-4 font-bold text-2xl'>
        {category
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}{' '}
        {mediaType === 'movie' ? 'Movies' : 'TV Shows'}
      </h2>
      <div
        className='flex space-x-4 overflow-x-auto scroll-smooth scrollbar-hide'
        ref={scrollContainerRef}
      >
        {media.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className='min-w-[250px] relative group'
            key={item.id}
          >
            {/* Movie image */}
            <div className='rounded-lg overflow-hidden'>
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt='Movie image'
                className='transition-transform duration-300 ease-in-out group-hover:scale-125'
              />
            </div>
            {/* Movie name */}
            <p className='mt-2 text-center transition-all duration-300 ease-in-out group-hover:font-bold group-hover:text-red-600'>
              {item?.name || item?.title}
            </p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className='absolute top-1/2 -translate-y-1/2 left-[1.75rem] md:left-[6rem] flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 hover:scale-105 transition-all duration-300 text-white z-10'
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className='absolute top-1/2 -translate-y-1/2 right-[1.75rem] md:right-[6rem] flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 hover:scale-105 transition-all duration-300 text-white z-10'
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  )
}

export default MovieSlider
