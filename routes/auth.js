const express = require('express');
const { createUser, login } = require('../controllers/users');
const { validateAuthBody, validateNewUserInfo } = require('../middlewares/validation');

const authRoutes = express.Router();

authRoutes.post('/signup', validateNewUserInfo, createUser);
authRoutes.post('/signin', validateAuthBody, login);

module.exports = authRoutes;
