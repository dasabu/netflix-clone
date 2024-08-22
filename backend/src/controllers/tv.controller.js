import ApiError from '../models/api/ApiError.js'
import { fetchFromTMDB } from '../utils/fetchFromTMDB.js'
import { TV_MESSAGE } from '../constants/messages.js'
import { TV_URL } from '../constants/url.js'
import { StatusCodes } from 'http-status-codes'
import { ApiResponse } from '../models/api/ApiResponse.js'

class TvController {
  // Get list of trending TVs and return a random TV in it
  async getTrendingTv(req, res) {
    // trending TV will be stored in 'results' field
    const { results: tvs } = await fetchFromTMDB(TV_URL.TRENDING_TV)
    if (tvs.length > 0) {
      // get a random TV
      const randomTv = tvs[Math.floor(Math.random() * tvs.length)]
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            TV_MESSAGE.GET_THE_TRENDING_TV_SUCCESSFULLY,
            randomTv
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        TV_MESSAGE.UNABLE_TO_FIND_THE_TV
      )
    }
  }

  // Get trailer(s) for a specific TV
  async getTvTrailers(req, res) {
    /* Note: Not handle invalid id case */
    const { id } = req.params
    // trailers of TV will be stored in results field
    const { results: trailers } = await fetchFromTMDB(TV_URL.TV_TRAILERS(id))
    if (trailers.length > 0) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            TV_MESSAGE.GET_TV_TRAILERS_SUCCESSFULLY,
            trailers
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        TV_MESSAGE.UNABLE_TO_GET_TV_TRAILERS
      )
    }
  }

  // Get details for a specific TV
  async getTvDetails(req, res) {
    const { id } = req.params
    const details = await fetchFromTMDB(TV_URL.TV_DETAILS(id))
    if (details) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            TV_MESSAGE.GET_TV_DETAILS_SUCCESSFULLY,
            details
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        TV_MESSAGE.UNABLE_TO_GET_TV_DETAILS
      )
    }
  }

  // Get similar TVs
  async getSimilarTVs(req, res) {
    const { id } = req.params
    const similarTvs = await fetchFromTMDB(TV_URL.SIMILAR_TV(id))
    if (similarTvs) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            TV_MESSAGE.GET_SIMILAR_TV_SUCCESSFULLY,
            similarTvs
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        TV_MESSAGE.UNABLE_TO_GET_SIMILAR_TV
      )
    }
  }

  // Get movies by category: 'Now playing' Movies, 'Top rated' Movies...
  async getTvsByCategory(req, res) {
    const { category } = req.params // 'popular', 'top_rated', 'now_playing', 'upcoming'
    const tvsByCategory = await fetchFromTMDB(TV_URL.TV_BY_CATEGORY(category))
    if (tvsByCategory) {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            TV_MESSAGE.GET_TV_BY_CATEGORY_SUCCESSFULLY,
            tvsByCategory
          )
        )
    } else {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        TV_MESSAGE.UNABLE_TO_GET_TV_BY_CATEGORY
      )
    }
  }
}

const tvController = new TvController()
export default tvController
