import { StatusCodes } from 'http-status-codes'

import ApiError from '../models/api/ApiError.js'
import { SEARCH_URL } from '../constants/url.js'
import { fetchFromTMDB } from '../utils/fetchFromTMDB.js'
import { SEARCH_MESSAGE } from '../constants/messages.js'
import { ApiResponse } from '../models/api/ApiResponse.js'
import { User } from '../models/user.model.js'

// 'https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1',

class SearchController {
  async searchPerson(req, res) {
    const { query } = req.params
    const response = await fetchFromTMDB(SEARCH_URL.PERSON(query))
    if (response?.results?.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        SEARCH_MESSAGE.RESOURCE_NOT_FOUND
      )
    } else {
      // update search history of a user
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: 'person',
            createdAt: new Date(),
          },
        },
      })
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            SEARCH_MESSAGE.GET_RESOURCE_SUCCESSFULLY,
            response.results
          )
        )
    }
  }

  async searchMovie(req, res) {
    const { query } = req.params
    const response = await fetchFromTMDB(SEARCH_URL.MOVIE(query))
    if (response?.results?.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        SEARCH_MESSAGE.RESOURCE_NOT_FOUND
      )
    } else {
      // update search history of a user
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: 'movie',
            createdAt: new Date(),
          },
        },
      })
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            SEARCH_MESSAGE.GET_RESOURCE_SUCCESSFULLY,
            response.results
          )
        )
    }
  }

  async searchTv(req, res) {
    const { query } = req.params
    const response = await fetchFromTMDB(SEARCH_URL.TV(query))
    if (response?.results?.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        SEARCH_MESSAGE.RESOURCE_NOT_FOUND
      )
    } else {
      // update search history of a user
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: 'tv',
            createdAt: new Date(),
          },
        },
      })
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            SEARCH_MESSAGE.GET_RESOURCE_SUCCESSFULLY,
            response.results
          )
        )
    }
  }

  async getSearchHistory(req, res) {
    const data = req.user?.searchHistory
    if (!data) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(
          new ApiError(
            StatusCodes.NOT_FOUND,
            SEARCH_MESSAGE.UNABLE_TO_GET_SEARCH_HISTORY
          )
        )
    } else {
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            SEARCH_MESSAGE.GET_RESOURCE_SUCCESSFULLY,
            data
          )
        )
    }
  }

  async removeItemFromSearchHistory(req, res) {
    const { id } = req.params
    /* because id of search history item in mongodb is in number format
    but req.params will return it in string format */
    const itemId = parseInt(id)
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: {
          searchHistory: { id: itemId },
        },
      })
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            SEARCH_MESSAGE.REMOVE_ITEM_IN_SEARCH_HISTORY_SUCCESSFULLY
          )
        )
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          new ApiError(
            StatusCodes.BAD_REQUEST,
            SEARCH_MESSAGE.UNABLE_TO_REMOVE_ITEM_IN_SEARCH_HISTORY
          )
        )
    }
  }
}

const searchController = new SearchController()
export default searchController
