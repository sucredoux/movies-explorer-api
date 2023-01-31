const express = require('express');
const { createUser, login } = require('../controllers/users');
const { validateAuthBody } = require('../middlewares/validation');

const authRoutes = express.Router();

authRoutes.post('/signup', validateAuthBody, createUser);
authRoutes.post('/signin', validateAuthBody, login);

module.exports = authRoutes;
