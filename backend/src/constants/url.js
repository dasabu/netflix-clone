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
