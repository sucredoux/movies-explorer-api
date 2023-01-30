const express = require('express');
const { createUser, login } = require('../controllers/users');

const authRoutes = express.Router();

authRoutes.post('/signup', createUser);
authRoutes.post('/signin', login);

module.exports = authRoutes;
