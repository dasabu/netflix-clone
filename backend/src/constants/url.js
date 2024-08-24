export const MOVIE_URL = {
  TRENDING_MOVIES:
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
  MOVIE_TRAILERS: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
  MOVIE_DETAILS: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?language=en-US/`,
  SIMILAR_MOVIES: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
  MOVIES_BY_CATEGORY: (category) =>
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
}

export const TV_URL = {
  TRENDING_TV: 'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
  TV_TRAILERS: (id) =>
    `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
  TV_DETAILS: (id) => `https://api.themoviedb.org/3/tv/${id}?language=en-US/`,
  SIMILAR_TV: (id) =>
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
  TV_BY_CATEGORY: (category) =>
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
}

export const SEARCH_URL = {
  PERSON: (query) =>
    `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
  MOVIE: (query) =>
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
  TV: (query) =>
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
}
