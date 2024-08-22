import ApiError from '../models/api/ApiError.js'
import { fetchFromTMDB } from '../utils/fetchFromTMDB.js'
import { MOVIE_MESSAGE } from '../constants/messages.js'
import { MOVIE_URL } from '../constants/url.js'
import { StatusCodes } from 'http-status-codes'
import { ApiResponse } from '../models/api/ApiResponse.js'

class MovieController {
  // Get list of trending movies and return a random movie in it
  async getTrendingMovie(req, res) {
    // trending movies will be stored in 'results' field
    const { results: movies } = await fetchFromTMDB(MOVIE_URL.TRENDING_MOVIES)
    if (movies.length > 0) {
      // get a random movie
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            MOVIE_MESSAGE.GET_THE_TRENDING_MOVIE_SUCCESSFULLY,
            randomMovie
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        MOVIE_MESSAGE.UNABLE_TO_FIND_THE_MOVIE
      )
    }
  }

  // Get trailer(s) for a specific movie
  async getMovieTrailers(req, res) {
    /* Note: Not handle invalid id case */
    const { id } = req.params
    // trailers of movie will be stored in results field
    const { results: trailers } = await fetchFromTMDB(
      MOVIE_URL.MOVIE_TRAILERS(id)
    )
    if (trailers.length > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            MOVIE_MESSAGE.GET_MOVIE_TRAILERS_SUCCESSFULLY,
            trailers
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        MOVIE_MESSAGE.UNABLE_TO_GET_MOVIE_TRAILERS
      )
    }
  }

  // Get details for a specific movie
  async getMovieDetails(req, res) {
    const { id } = req.params
    const details = await fetchFromTMDB(MOVIE_URL.MOVIE_DETAILS(id))
    if (details) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            MOVIE_MESSAGE.GET_MOVIE_DETAILS_SUCCESSFULLY,
            details
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        MOVIE_MESSAGE.UNABLE_TO_GET_MOVIE_DETAILS
      )
    }
  }

  // Get similar movies
  async getSimilarMovies(req, res) {
    const { id } = req.params
    const similarMovies = await fetchFromTMDB(MOVIE_URL.SIMILAR_MOVIES(id))
    if (similarMovies) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            MOVIE_MESSAGE.GET_SIMILAR_MOVIES_SUCCESSFULLY,
            similarMovies
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        MOVIE_MESSAGE.UNABLE_TO_GET_SIMILAR_MOVIES
      )
    }
  }

  // Get movies by category: 'Now playing' Movies, 'Top rated' Movies...
  async getMoviesByCategory(req, res) {
    const { category } = req.params // 'popular', 'top_rated', 'now_playing', 'upcoming'
    const moviesByCategory = await fetchFromTMDB(
      MOVIE_URL.MOVIES_BY_CATEGORY(category)
    )
    if (moviesByCategory) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            MOVIE_MESSAGE.GET_MOVIES_BY_CATEGORY_SUCCESSFULLY,
            moviesByCategory
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        MOVIE_MESSAGE.UNABLE_TO_GET_MOVIES_BY_CATEGORY
      )
    }
  }
}

const movieController = new MovieController()
export default movieController
