import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Loader, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import { useMediaStore } from '../store/media'

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('movie')
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { setMediaType } = useMediaStore()

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    tab === 'movie' ? setMediaType('Movie') : setMediaType('TV Show')
    setResults([])
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResults([]) // Clear previous results

    try {
      const response = await axios.get(
        `/api/v1/search/${activeTab}/${searchTerm}`
      )
      setResults(response.data.data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(
          'Nothing found, make sure you are searching under the right category'
        )
      } else {
        toast.error('An error occurred, please try again later')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center gap-3 mb-6 mt-6'>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-600 transition duration-300 ease-in-out`}
            onClick={() => handleTabClick('movie')}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-600 transition duration-300 ease-in-out`}
            onClick={() => handleTabClick('tv')}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-600 transition duration-300 ease-in-out`}
            onClick={() => handleTabClick('person')}
          >
            Person
          </button>
        </div>

        <form
          className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto'
          onSubmit={handleSearch}
        >
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={' Search for a ' + activeTab}
            className='w-full p-2 rounded bg-gray-800 text-white focus:outline-none'
          />
          <button
            className='flex justify-between gap-2 items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out'
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className='animate-spin size-5' />
            ) : (
              <>
                <span>Search</span>
                <Search className='size-5' />
              </>
            )}
          </button>
        </form>

        {/* Show the number of results */}
        <div className='text-center mb-4'>
          <p className='text-2xl font-medium'>
            {results.length} result(s) found
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null

            return (
              <div
                key={result.id}
                className='bg-gray-800 p-4 rounded transition duration-300 ease-in-out hover:bg-gray-700'
              >
                {activeTab === 'person' ? (
                  <div
                    key={result.id}
                    className='bg-gray-800 p-4 rounded transition duration-300 ease-in-out hover:bg-gray-700 group overflow-hidden'
                  >
                    <div className='flex flex-col items-center'>
                      <div className='relative overflow-hidden rounded-lg mb-2'>
                        <img
                          src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                          alt={result.name}
                          className='max-h-96 mx-auto text-center transition-transform duration-300 ease-in-out group-hover:scale-125'
                        />
                      </div>
                      <h2 className='mt-2 text-xl font-bold text-center transition-colors duration-300 ease-in-out group-hover:text-red-600'>
                        {result.name}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={'/watch/' + result.id}
                    onClick={() => {
                      setMediaType(activeTab)
                    }}
                    className='transition duration-300 ease-in-out hover:scale-105 group overflow-hidden rounded-md'
                  >
                    <div className='relative overflow-hidden rounded-md'>
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                        alt={result.title || result.name}
                        className='w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-125'
                      />
                    </div>
                    <h2 className='mt-4 text-lg font-bold text-center transition-colors duration-300 ease-in-out group-hover:text-red-600'>
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default SearchPage
