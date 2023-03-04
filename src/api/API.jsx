export const byNameFetch = (search) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US&query=${search}&page=1`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
export const popularFetch = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US&page=1`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};
export const nowPlayingFetch = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US&page=1`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
export const topRatedFetch = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US&page=1`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
export const upComingFetch = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US&page=1`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
export const genresFetch = () => {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=7628a5281d6b5433c1bb079225d0aa8d&language=en-US`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};
