const express = require('express');
const { createUser, login } = require('../controllers/users');
const { validateAuthBody, validateUserInfo } = require('../middlewares/validation');

const authRoutes = express.Router();

authRoutes.post('/signup', validateUserInfo, createUser);
authRoutes.post('/signin', validateAuthBody, login);

module.exports = authRoutes;
