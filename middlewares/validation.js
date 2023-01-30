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
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
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
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
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
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
        'any.number': 'Длительность должна быть числом',
      }),
    year: Joi.number().integer().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    }).messages({
      'any.required': 'Обязательное поле',
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    movieId: Joi.string().hex()
      .messages({
        'any.required': 'Обязательное поле',
        'any.messages': 'Невалидный id',
      }),
    nameRU: Joi.string().required()/*.custom((value, helpers) => {
      if (!validator.isAlphanumeric(value, 'ru-RU', ' ')) {
        return helpers.message('Некорректный язык ввода');
      }
      return value;
    })*/
      .messages({
        'any.alphanum': 'Language not correct',
        'any.required': 'Обязательное поле',
      }),
    nameEN: Joi.string()/*.custom((value, helpers) => {
      if (validator.isAlphanumeric(value, 'en-US')) {
        return value;
      }
      return helpers.message('Некорректный язык ввода');
    })*/
      .messages({
        'any.required': 'Обязательное поле',
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
