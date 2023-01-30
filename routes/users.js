const express = require('express');
const { getUser, updateUser } = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/me', getUser);
userRoutes.patch('/me', updateUser);

module.exports = userRoutes;
