const Movie = require('../models/movie');
const { OK, CREATED } = require('../constants/status');
const { BadRequestErr, NotFoundErr, ForbiddenErr } = require('../errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.status(OK).send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    const newMovie = await Movie.create({
      owner: ownerId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    });
    return res.status(CREATED).send({
      owner: newMovie.owner,
      country: newMovie.country,
      director: newMovie.director,
      duration: newMovie.duration,
      year: newMovie.year,
      description: newMovie.description,
      image: newMovie.image,
      trailerLink: newMovie.trailerLink,
      nameRU: newMovie.nameRU,
      nameEN: newMovie.nameEN,
      thumbnail: newMovie.thumbnail,
      movieId: newMovie.movieId,
      like: newMovie.like,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr('Переданы некорректные данные'));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден');
    } else if (!movie.owner._id.equals(req.user._id)) {
      throw new ForbiddenErr('У Вас нет доступа');
    } else {
      const movieToDelete = await Movie.findByIdAndDelete(req.params.id, { runValidators: true });
      return res.status(OK).send(movieToDelete);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Невалидный id'));
    }
    return next(err);
  }
};

const setLike = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { like: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден');
    }
    return res.status(OK).send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Переданы некорректные данные '))
    }
    return next(err);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $pull: { like: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!movie) {
      throw new NotFoundErr('Запрашиваемый объект не найден');
    }
    return res.status(OK).send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestErr('Переданы некорректные данные'));
    }
    return next(err);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie, setLike, deleteLike,
};
