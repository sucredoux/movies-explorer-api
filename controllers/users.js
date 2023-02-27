const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { OK, CREATED } = require('../constants/status');
const {
  BadRequestErr, NotFoundErr, AuthErr, MongoDuplicateErr,
} = require('../errors/index');
const { JWT_KEY } = require('../constants/config');
const {
  INCORRECT_DATA, DUPLICATE, WRONG_LOGIN, NO_USER
} = require('../constants/messages');

const SALT_ROUNDS = 10;

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({ name, email, password: hash });
    return res.status(CREATED).send({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr(INCORRECT_DATA));
    }
    if (err.name === 'MongoServerError') {
      return next(new MongoDuplicateErr(DUPLICATE));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthErr(WRONG_LOGIN);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AuthErr(WRONG_LOGIN);
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_KEY, { expiresIn: '14d' });
    return res.status(OK).send({ token });
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!req.user._id) {
      throw new NotFoundErr(NO_USER);
    }
    return res.status(OK).send(user);
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email: req.body.email, name: req.body.name },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundErr(NO_USER);
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestErr(INCORRECT_DATA));
    }
    if (err.name === 'MongoServerError') {
      return next(new MongoDuplicateErr(DUPLICATE));
    }
    return next(err);
  }
};

module.exports = {
  createUser, login, getUser, updateUser,
};
