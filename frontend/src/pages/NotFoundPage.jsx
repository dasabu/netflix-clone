import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div
      className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white relative'
      style={{ backgroundImage: `url('/not-found.png')` }}
    >
      <header className='absolute top-0 left-0 p-4 w-full flex justify-between'>
        <Link to={'/'}>
          <img
            src='/netflix-logo.png'
            alt='Netflix logo'
            className='h-10 ml-10 mt-6 z-50'
          />
        </Link>
      </header>

      <div className='text-center z-10 mt-20'>
        <div
          className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-black/40 to-black/80 -z-50'
          aria-hidden='true'
        ></div>
        <h1 className='text-5xl sm:text-7xl font-bold mb-6 drop-shadow-lg'>
          Lost your way?
        </h1>
        <p className='mb-8 text-medium sm:text-xl max-w-lg mx-auto drop-shadow-md'>
          Sorry, we can't find that page. You might want to check the URL again
          or head back to the homepage.
        </p>
        <Link
          to={'/'}
          className='bg-red-600/80 hover:bg-red-800 text-white py-3 px-6 rounded-lg transition duration-300 transform shadow-lg font-medium'
        >
          Netflix Home
        </Link>
      </div>

      <footer className='absolute bottom-4 text-sm text-white'>
        &copy; {new Date().getFullYear()} Netflix, Inc.
      </footer>
    </div>
  )
}

export default NotFoundPage
