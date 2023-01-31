const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/validation');

const userRoutes = express.Router();

userRoutes.get('/me', validateUserInfo, getUser);
userRoutes.patch('/me', validateUserInfo, updateUser);

module.exports = userRoutes;
