// 데이터베이스와의 상호작용을 담당하는 부분
// 데이터베이스의 테이블을 객체로 표현
// 이 객체를 통해 데이터베이스의 레코드를 생성, 조회, 수정, 삭제하는 역할

const db = require('../db')

// AVAILABLE MOVIE

// Create
const createAvailableMovie = async (params) => {
  const { photo, name, genre, directed_by, duration, casts, synopsis, slug, price, release_date } = params

  return await db`INSERT INTO available_movies (photo, name, genre, directed_by, duration, casts, synopsis, slug, price) VALUES (${photo}, ${name}, ${genre}, ${directed_by}, ${duration}, ${casts}, ${synopsis}, ${slug}, ${price}, ${release_date})`
}

// Read
const getAllAvailableMovies = async () => {
  return await db`SELECT * FROM available_movies`
}

const getAvailableMovieBySlug = async (params) => {
  const { slug } = params

  return await db`SELECT * FROM available_movies WHERE slug = ${slug}`
}

const getAvailableMovieByName = async (params) => {
  const { name } = params

  return await db`SELECT * FROM available_movies WHERE name = ${name}`
}

const getAvailableMovieById = async (params) => {
  const { id } = params

  return await db`SELECT * FROM available_movies WHERE id = ${id}`
}

const getCountAvailableMovie = async () => {
  return await db`SELECT COUNT(id) FROM available_movies`
}

const getAvailableMovieNameAsc = async () => {
  return await db`SELECT * FROM available_movies ORDER BY name ASC`
}

const getAvailableMovieNameDesc = async () => {
  return await db`SELECT * FROM available_movies ORDER BY name DESC`
}

const getAvailableMovieReleaseAsc = async () => {
  return await db`SELECT * FROM available_movies ORDER BY release_date ASC`
}

const getAvailableMovieReleaseDesc = async () => {
  return await db`SELECT * FROM available_movies ORDER BY release_date DESC`
}

const getAvailableMoviePagin = async (params) => {
  const { page, limit } = params

  return await db`SELECT * FROM available_movies LIMIT ${limit} OFFSET ${
      limit * (page - 1)
   }`
}

const getSearchAvailableMovie = async (params) => {
  const { name } = params

  return await db`SELECT * FROM available_movies WHERE name ILIKE ${'%' + name + '%'} ORDER BY release_date DESC`
}

// Update
const editAvailableMoviePhoto = async (params) => {
  const { id, photo, name, genre, directed_by, duration, casts, synopsis, slug, price, getUser, release_date } = params

  return await db`
  UPDATE available_movies SET
  "photo" = ${photo || getUser[0]?.photo},
  "name" = ${name || getUser[0]?.name},
  "genre" = ${genre || getUser[0]?.genre},
  "directed_by" = ${directed_by || getUser[0]?.directed_by},
  "duration" = ${duration || getUser[0]?.duration},
  "casts" = ${casts || getUser[0]?.casts},
  "synopsis" = ${synopsis || getUser[0]?.synopsis},
  "slug" = ${slug || getUser[0]?.slug},
  "price" = ${price || getUser[0]?.price}
  "release_date" = ${release_date || getUser[0]?.release_date}
  WHERE "id" = ${id}
  `
}

const editAvailableMovie = async (params) => {
  const { id, name, genre, directed_by, duration, casts, synopsis, slug, price, getUser, release_date } = params

  return await db`
  UPDATE available_movies SET
  "name" = ${name || getUser[0]?.name},
  "genre" = ${genre || getUser[0]?.genre},
  "directed_by" = ${directed_by || getUser[0]?.directed_by},
  "duration" = ${duration || getUser[0]?.duration},
  "casts" = ${casts || getUser[0]?.casts},
  "synopsis" = ${synopsis || getUser[0]?.synopsis},
  "slug" = ${slug || getUser[0]?.slug},
  "price" = ${price || getUser[0]?.price}
  "release_date" = ${release_date || getUser[0]?.release_date}
  WHERE "id" = ${id}
  `
}

// Delete
const deleteAvailableMovie = async (params) => {
  const { id } = params

  return await db`DELETE FROM "public"."available_movies" WHERE "id" = ${id}`
}

// UPCOMING MOVIE

// Create
const createUpcomingMovie = async (params) => {
  const { photo, name, genre, directed_by, duration, casts, synopsis, slug, release_date } = params

  return await db`INSERT INTO upcoming_movies (photo, name, genre, directed_by, duration, casts, synopsis, slug) VALUES (${photo}, ${name}, ${genre}, ${directed_by}, ${duration}, ${casts}, ${synopsis}, ${slug}, ${release_date})`
}

// Read
const getAllUpcomingMovies = async () => {
  return await db`SELECT * FROM upcoming_movies`
}

const getUpcomingMovieBySlug = async (params) => {
  const { slug } = params

  return await db`SELECT * FROM upcoming_movies WHERE slug = ${slug}`
}

const getUpcomingMovieByName = async (params) => {
  const { name } = params

  return await db`SELECT * FROM upcoming_movies WHERE name = ${name}`
}

const getUpcomingMovieById = async (params) => {
  const { id } = params

  return await db`SELECT * FROM upcoming_movies WHERE id = ${id}`
}

const getCountUpcomingMovie = async () => {
  return await db`SELECT COUNT(id) FROM upcoming_movies`
}

const getUpcomingMovieNameAsc = async () => {
  return await db`SELECT * FROM upcoming_movies ORDER BY name ASC`
}

const getUpcomingMovieNameDesc = async () => {
  return await db`SELECT * FROM upcoming_movies ORDER BY name DESC`
}

const getUpcomingMovieReleaseAsc = async () => {
  return await db`SELECT * FROM upcoming_movies ORDER BY release_date ASC`
}

const getUpcomingMovieReleaseDesc = async () => {
  return await db`SELECT * FROM upcoming_movies ORDER BY release_date DESC`
}

const getUpcomingMoviePagin = async (params) => {
  const { page, limit } = params

  return await db`SELECT * FROM upcoming_movies LIMIT ${limit} OFFSET ${
      limit * (page - 1)
   }`
}

const getSearchUpcomingMovie = async (params) => {
  const { name } = params

  return await db`SELECT * FROM upcoming_movies WHERE name ILIKE ${'%' + name + '%'} ORDER BY release_date DESC`
}

// Update
const editUpcomingMoviePhoto = async (params) => {
  const { id, photo, name, genre, directed_by, duration, casts, synopsis, slug, getUser, release_date } = params

  return await db`
  UPDATE upcoming_movies SET
  "photo" = ${photo || getUser[0]?.photo},
  "name" = ${name || getUser[0]?.name},
  "genre" = ${genre || getUser[0]?.genre},
  "directed_by" = ${directed_by || getUser[0]?.directed_by},
  "duration" = ${duration || getUser[0]?.duration},
  "casts" = ${casts || getUser[0]?.casts},
  "synopsis" = ${synopsis || getUser[0]?.synopsis},
  "slug" = ${slug || getUser[0]?.slug},
  "release_date" = ${release_date || getUser[0]?.release_date}
  WHERE "id" = ${id}
  `
}

const editUpcomingMovie = async (params) => {
  const { id, name, genre, directed_by, duration, casts, synopsis, slug, getUser, release_date } = params

  return await db`
  UPDATE upcoming_movies SET
  "name" = ${name || getUser[0]?.name},
  "genre" = ${genre || getUser[0]?.genre},
  "directed_by" = ${directed_by || getUser[0]?.directed_by},
  "duration" = ${duration || getUser[0]?.duration},
  "casts" = ${casts || getUser[0]?.casts},
  "synopsis" = ${synopsis || getUser[0]?.synopsis},
  "slug" = ${slug || getUser[0]?.slug},
  "release_date" = ${release_date || getUser[0]?.release_date}
  WHERE "id" = ${id}
  `
}

// Delete
const deleteUpcomingMovie = async (params) => {
  const { id } = params

  return await db`DELETE FROM "public"."upcoming_movies" WHERE "id" = ${id}`
}

module.exports = {
  createAvailableMovie,
  getAllAvailableMovies,
  getAvailableMovieByName,
  getAvailableMovieBySlug,
  getAvailableMovieById,
  getCountAvailableMovie,
  getAvailableMovieNameAsc,
  getAvailableMovieNameDesc,
  getAvailableMovieReleaseAsc,
  getAvailableMovieReleaseDesc,
  getAvailableMoviePagin,
  getSearchAvailableMovie,
  editAvailableMoviePhoto,
  editAvailableMovie,
  deleteAvailableMovie,
  createUpcomingMovie,
  getUpcomingMovieBySlug,
  getUpcomingMovieByName,
  getAllUpcomingMovies,
  getUpcomingMovieById,
  getCountUpcomingMovie,
  getUpcomingMovieNameAsc,
  getUpcomingMovieNameDesc,
  getUpcomingMovieReleaseAsc,
  getUpcomingMovieReleaseDesc,
  getUpcomingMoviePagin,
  getSearchUpcomingMovie,
  editUpcomingMoviePhoto,
  editUpcomingMovie,
  deleteUpcomingMovie
}
