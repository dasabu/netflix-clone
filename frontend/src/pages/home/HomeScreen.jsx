import { useState } from 'react'

import React from 'react'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'

import Navbar from '../../components/Navbar'
import useGetTrendingMedia from '../../hooks/useGetTrendingMedia'
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from '../../utils/constants'
import { useMediaStore } from '../../store/media'
import MovieSlider from '../../components/MovieSlider'

const HomeScreen = () => {
  const { trendingMedia } = useGetTrendingMedia()
  const { mediaType } = useMediaStore()
  const [imgLoading, setImgLoading] = useState(true)

  if (!trendingMedia) {
    return (
      <div className='h-screen text-white relative'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'></div>
      </div>
    )
  } else {
    return (
      <>
        <div className='relative h-screen text-white'>
          <Navbar />
          {/* Loading shimmer effect when movie is still loading */}
          {imgLoading && (
            <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'></div>
          )}
          {/* HERO SECTION - Movie backdrop */}
          <img
            src={ORIGINAL_IMG_BASE_URL + trendingMedia?.backdrop_path}
            alt='hero-img'
            className='absolute top-0 left-0 w-full h-full object-cover -z-50'
            onLoad={() => setImgLoading(false)}
          />
          {/* Gradient black overlay */}
          <div
            className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/90 via-black/40 to-transparent -z-50'
            aria-hidden='true'
          ></div>
          {/* Movie information */}
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
            <div className='max-w-2xl'>
              <h1 className='md:text-6xl text-4xl font-extrabold text-balance'>
                {trendingMedia?.title || trendingMedia?.name}
              </h1>
              <p className='mt-2 md:text-lg text-base'>
                {trendingMedia?.release_date?.split('-')[0] ||
                  trendingMedia?.first_air_date?.split('-')[0]}{' '}
                | {trendingMedia?.adult ? '18+' : 'PG-13'}
              </p>
              <p className='mt-4 md:text-lg text-base'>
                {trendingMedia?.overview.length > 200
                  ? trendingMedia?.overview.slice(0, 200) + '...'
                  : trendingMedia?.overview}
              </p>
            </div>
            {/* Play and More info button */}
            <div className='flex mt-8'>
              <Link
                to={`watch/${trendingMedia?.id}`}
                className='bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mr-4 flex items-center transition-transform duration-200 ease-in-out transform hover:scale-105'
              >
                <button className='md:text-base text-sm flex items-center justify-between'>
                  <Play className='md:size-6 size-4 inline-block mr-2 fill-black transition-all duration-200 ease-in-out' />
                  Play
                </button>
              </Link>

              <Link
                to={`watch/${trendingMedia?.id}`}
                className='bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4 flex items-center transition-transform duration-200 ease-in-out transform hover:scale-105'
              >
                <button className='md:text-base text-sm flex items-center justify-between'>
                  <Info className='md:size-6 size-4 inline-block mr-2 transition-all duration-200 ease-in-out' />
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3 bg-black py-10 text-white'>
          {mediaType === 'movie'
            ? MOVIE_CATEGORIES.map((category) => (
                <MovieSlider category={category} key={category} />
              ))
            : TV_CATEGORIES.map((category) => (
                <MovieSlider category={category} key={category} />
              ))}
        </div>
      </>
    )
  }
}

export default HomeScreen
