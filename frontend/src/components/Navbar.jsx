import { useState } from 'react'
import { LogOut, Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useAuthStore } from '../store/auth'
import { useMediaStore } from '../store/media'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const { setMediaType } = useMediaStore()
  const { user, logout } = useAuthStore()

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-10 h-20'>
      <Link to={'/'}>
        <img
          src='/netflix-logo.png'
          alt='Netflix Logo'
          className='w-32 sm:w-40'
        />
      </Link>

      {/* desktop navbar items */}
      <div className='hidden sm:flex md:gap-7 gap-5 items-center z-50'>
        <Link
          to={'/'}
          className='block hover:underline font-medium hover:font-bold transition-all duration-200'
          onClick={() => setMediaType('movie')}
        >
          Movies
        </Link>
        <Link
          to={'/'}
          className='block hover:underline font-medium hover:font-bold transition-all duration-200'
          onClick={() => setMediaType('tv')}
        >
          TV Shows
        </Link>
        <Link
          to={'/history'}
          className='block hover:underline font-medium hover:font-bold transition-all duration-200'
        >
          Search History
        </Link>
      </div>

      <div className='flex md:gap-5 gap-3 items-center z-50'>
        <Link to={'/search'}>
          <Search className='size-6 cursor-pointer' />
        </Link>
        <img
          src={user.image}
          alt='Avatar'
          className='h-8 rounded cursor-pointer'
        />
        <LogOut className='size-6 cursor-pointer' onClick={logout} />
        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className='absolute w-1/3 top-[4.25rem] right-[2.5rem] sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
          <Link
            to={'/'}
            className='block hover:underline font-medium hover:font-bold transition-all duration-200 p-2 focus:underline'
            onClick={() => {
              setMediaType('movie')
              toggleMobileMenu()
            }}
          >
            Movies
          </Link>
          <Link
            to={'/'}
            className='block hover:underline font-medium hover:font-bold transition-all duration-200 p-2'
            onClick={() => {
              setMediaType('tv')
              toggleMobileMenu()
            }}
          >
            TV Shows
          </Link>
          <Link
            to={'/history'}
            className='block hover:underline font-medium hover:font-bold transition-all duration-200 p-2'
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  )
}
export default Navbar
