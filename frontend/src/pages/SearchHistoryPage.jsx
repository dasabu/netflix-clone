import axios from 'axios'
import { useEffect, useState } from 'react'
import { Home, Loader, Search, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { SMALL_IMG_BASE_URL } from '../utils/constants'

function formatDate(dateString) {
  const date = new Date(dateString)
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = monthNames[date.getUTCMonth()]
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  return `${month} ${day}, ${year}`
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get(`/api/v1/search/history`)
        setSearchHistory(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        setSearchHistory([])
      } finally {
        setIsLoading(false)
      }
    }
    getSearchHistory()
  }, [])

  const handleDelete = async (entry) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the search history for "${entry.title}"?`
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`)
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id))
      toast.success('Search history item deleted successfully')
    } catch (error) {
      toast.error('Failed to delete search item')
    }
  }

  if (isLoading) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer'></div>
      </div>
    )
  }

  if (searchHistory?.length === 0) {
    return (
      <div className='bg-black min-h-screen text-white'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <h1 className='mt-6 text-center text-3xl font-bold mb-8'>
            Search History
          </h1>
          <div className='flex flex-col items-center h-96 justify-center'>
            <p className='text-2xl font-medium mb-8'>No search history found</p>
            <Link
              to='/'
              className='flex gap-2 text-red-600 hover:underline mb-4'
            >
              <Home />
              Home
            </Link>
            <Link
              to='/search'
              className='flex gap-2 text-red-600 hover:underline mt-2'
            >
              <Search />
              <span>Search something...</span>
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-black text-white min-h-screen'>
        <Navbar />
        <div className='max-w-6xl mx-auto px-6 py-12'>
          <h1 className='mt-6 text-center text-3xl font-bold mb-8'>
            Search History
          </h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {searchHistory?.map((entry) => (
              <Link
                to={`/watch/${entry.id}`}
                key={entry.id}
                className='min-w-0 bg-gray-800 p-4 rounded-lg flex items-start transition transform hover:scale-105 hover:bg-gray-700 duration-300 ease-in-out shadow-lg'
              >
                <img
                  src={SMALL_IMG_BASE_URL + entry.image}
                  alt='History image'
                  className='w-16 h-16 rounded-full object-cover mr-4 flex-shrink-0'
                  style={{ maxWidth: '64px' }}
                />
                <div className='flex flex-col flex-grow mr-4 min-w-0'>
                  <span
                    className='text-white text-lg truncate flex-grow max-w-[60%]'
                    style={{
                      maxWidth: '150px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {entry.title}
                  </span>
                  <span className='text-gray-400 text-sm'>
                    {formatDate(entry.createdAt)}
                  </span>
                </div>

                <span
                  className={`py-1 px-3 text-center rounded-full text-sm font-medium ml-auto flex-shrink-0 ${
                    entry.searchType === 'movie'
                      ? 'bg-red-600'
                      : entry.searchType === 'tv'
                      ? 'bg-blue-600'
                      : 'bg-green-600'
                  }`}
                >
                  {entry.searchType.toUpperCase()}
                </span>
                <Trash
                  className='ml-4 cursor-pointer text-gray-400 hover:text-red-600 transition duration-200 ease-in-out flex-shrink-0'
                  style={{ width: '24px', height: '24px' }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete(entry)
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default SearchHistoryPage
