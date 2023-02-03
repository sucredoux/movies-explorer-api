const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { validateMovieId, validateMovieInfo } = require('../middlewares/validation');

const movieRoutes = express.Router();

movieRoutes.get('', getMovies);
movieRoutes.post('', validateMovieInfo, createMovie);
movieRoutes.delete('/:id', validateMovieId, deleteMovie);

module.exports = movieRoutes;
