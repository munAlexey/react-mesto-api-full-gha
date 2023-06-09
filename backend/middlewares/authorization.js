const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const {
  ERROR_UNAUTHORIZED,
} = require('../utils/constants');
const { ERROR_NOT_FOUND } = require('../utils/constants');

module.exports.authorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(ERROR_NOT_FOUND).send('Нужно авторизоваться');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new Error(ERROR_UNAUTHORIZED));
  }
};
