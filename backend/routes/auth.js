const { Joi, celebrate, Segments } = require('celebrate');
const express = require('express');
const { urlR } = require('../utils/constants');

const router = express.Router();

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlR).required(),
  },
  [Segments.PARAMS]: {
    link: Joi.string().pattern(urlR),
  },
}), createUser);

router.post('/signin', login);

module.exports = router;
