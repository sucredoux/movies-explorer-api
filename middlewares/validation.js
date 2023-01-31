const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateAuthBody = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'string.empty': 'Поле не может быть пустым',
      }),
  },
});

const validateUserInfo = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'any.messages': 'Невалидный id',
    }),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'string.empty': 'Поле не может быть пустым',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
  }),
});

const validateMovieInfo = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'any.messages': 'Невалидный id',
    }),
  }),
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
        'any.number': 'Длительность должна быть числом',
        'string.empty': 'Поле не может быть пустым',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    })
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }).messages({
      'any.required': 'Обязательное поле',
      'string.empty': 'Поле не может быть пустым',
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    })
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    movieId: Joi.string().hex()
      .messages({
        'any.required': 'Обязательное поле',
        'any.messages': 'Невалидный id',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
        'string.empty': 'Поле не может быть пустым',
      }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'any.messages': 'Невалидный id',
    }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).messages({
      'any.messages': 'Невалидный id',
    }),
  }),
});

module.exports = {
  validateAuthBody,
  validateUserInfo,
  validateMovieInfo,
  validateUserId,
  validateMovieId,
};
