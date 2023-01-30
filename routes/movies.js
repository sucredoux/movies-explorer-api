const express = require('express');
const {
  getMovies, createMovie, deleteMovie, setLike, deleteLike
} = require('../controllers/movies');
const errorHandler = require('../middlewares/error-handler');
const { validateMovieId, validateMovieInfo } = require('../middlewares/validation');

const movieRoutes = express.Router();

movieRoutes.get('', getMovies);
movieRoutes.post('', validateMovieInfo, createMovie);
movieRoutes.delete('/:id', validateMovieId, deleteMovie);
movieRoutes.put('/:id/like', validateMovieId, setLike);
movieRoutes.delete('/:id/like', validateMovieId, deleteLike);

/*movieRoutes.use(errorHandler);*/

module.exports = movieRoutes;
