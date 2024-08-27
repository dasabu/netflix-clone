import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleGetStarted = (e) => {
    e.preventDefault()
    // naavigate to signup page and pass email value to it
    navigate('/signup', { state: { email } })
  }

  return (
    <div className='hero-bg min-h-screen w-full'>
      {/* Navbar */}
      <header className='md:max-w-6xl mx-auto flex items-center justify-between md:p-10 pb-10 p-6'>
        <img
          src='/netflix-logo.png'
          alt='Netflix Logo'
          className='w-32 md:w-40'
        />
        <Link
          to={'/login'}
          className='px-4 py-1 text-base text-white bg-red-600 hover:bg-red-700 font-medium rounded-md'
        >
          Login
        </Link>
      </header>

      {/* hero section */}
      <div className='text-white flex flex-col items-center justify-center text-center mx-auto py-40 max-w-6xl gap-4'>
        <h1 className='md:max-w-4xl px-10 text-4xl sm:text-4xl md:text-6xl font-bold mb-4'>
          Unlimited movies, TV shows, and more
        </h1>
        <p className='text-lg px-10'>Watch anywhere. Cancel anytime.</p>
        <p className='mb-4 px-10'>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          className='flex flex-col md:flex-row gap-4 w-1/2'
          onSubmit={handleGetStarted}
        >
          <input
            type='text'
            className='rounded flex-auto bg-black/80 border border-gray-700 p-4 focus:outline-white focus:ring'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='bg-red-600 px-4 py-2 text-lg font-medium rounded-md hover:bg-red-700'>
            Get Started
          </button>
        </form>
      </div>
      {/* separator */}
      <div
        className='h-2 w-full bg-gradient-to-r from-red-700 via-red-600 to-red-500'
        aria-hidden='true'
      />
      {/* 1st section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-20'>
          {/* left side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Enjoy on your TV
            </h2>
            <p className='text-lg md:text-xl'>
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* right side */}
          <div className='flex-1 relative'>
            <img src='/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
            <video
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src='/hero-vid.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 2nd section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 relative'>
            <div className='relative'>
              <img
                src='/stranger-things-lg.png'
                alt='Stranger Things img'
                className='mt-4'
              />

              <div
                className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'
              >
                <img
                  src='/stranger-things-sm.png'
                  alt='image'
                  className='h-full'
                />
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-col gap-0'>
                    <span className='text-md lg:text-lg font-bold'>
                      Stranger Things
                    </span>
                    <span className='text-sm text-blue-500'>
                      Downloading...
                    </span>
                  </div>

                  <img
                    src='/download-icon.gif'
                    alt='download-gif'
                    className='h-12'
                  />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className='flex-1 md:text-left text-center'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>
              Download your shows to watch offline
            </h2>
            <p className='text-lg md:text-xl'>
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 3rd section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-20'>
          {/* left side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Watch everywhere
            </h2>
            <p className='text-lg md:text-xl'>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>

          {/* right side */}
          <div className='flex-1 relative overflow-hidden'>
            <img
              src='/device-pile.png'
              alt='Device image'
              className='mt-4 z-20 relative'
            />
            <video
              className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]'
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src='/video-devices.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>

      {/* seperator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 4th section*/}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-10'>
          {/* left */}
          <div className='flex-1 relative'>
            <img src='/kids.png' alt='Enjoy on your TV' className='mt-4' />
          </div>
          {/* right */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
              Create profiles for kids
            </h2>
            <p className='text-lg md:text-xl'>
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen
