const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  INVALID_EMAIL,
  REQUIRED_FIELD,
  NOT_TO_BE_EMPTY,
  INVALID_ID,
  MUST_BE_NUMBER,
  INVALID_LINK,
  MAX_LENGTH_NAME,
  MIN_LENGTH_NAME,
} = require('../constants/messages');

const validateAuthBody = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(INVALID_EMAIL);
    })
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
  },
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.min': MAX_LENGTH_NAME,
        'string.max': MIN_LENGTH_NAME,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(INVALID_EMAIL);
    })
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'number.base': MUST_BE_NUMBER,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INVALID_LINK);
    })
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INVALID_LINK);
    })
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(INVALID_LINK);
    })
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'number.base': MUST_BE_NUMBER,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': REQUIRED_FIELD,
        'string.empty': NOT_TO_BE_EMPTY,
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'any.messages': INVALID_ID,
    }),
  }),
});

module.exports = {
  validateAuthBody,
  validateUserInfo,
  validateMovieInfo,
  validateMovieId,
};
