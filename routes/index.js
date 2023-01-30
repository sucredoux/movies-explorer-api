const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use('/', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/movies', auth, movieRoutes);

module.exports = routes;
