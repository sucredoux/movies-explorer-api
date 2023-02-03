const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundErr } = require('../errors');
const { NO_PAGE } = require('../constants/messages');

const routes = express.Router();

routes.use('/', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, movieRoutes);

routes.use('/', auth, (req, res, next) => {
  next(new NotFoundErr(NO_PAGE));
});

module.exports = routes;
