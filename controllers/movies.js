const Movie = require('../models/movie');
const { OK, CREATED } = require('../constants/status');
const { BadRequestErr, NotFoundErr, ForbiddenErr } = require('../errors');
const {
  INCORRECT_DATA, NOTFOUND, NO_ACCESS, INVALID_ID,
} = require('../constants/messages');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({
      owner: {
        $eq: req.user._id,
      },
    });
    return res.status(OK).send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const newMovie = await Movie.create({ ...req.body, owner: ownerId });
    return res.status(CREATED).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr(INCORRECT_DATA));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundErr(NOTFOUND);
    } else if (!movie.owner._id.equals(req.user._id)) {
      throw new ForbiddenErr(NO_ACCESS);
    } else {
      const movieToDelete = await Movie.findByIdAndDelete(req.params.id);
      return res.status(OK).send(movieToDelete);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr(INVALID_ID));
    }
    return next(err);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
