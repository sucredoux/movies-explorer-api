const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors');

const routes = express.Router();

routes.use('/', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, movieRoutes);

routes.use('/', express.json(), auth, (req, res, next) => {
  try {
    throw new NotFoundErr('Страница не найдена');
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
