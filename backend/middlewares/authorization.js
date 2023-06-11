const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-errors');
const Unauthorized = require('../errors/unauthorized');

module.exports.authorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new NotFoundError('Нужно авторизоваться'));
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new Unauthorized('Неверные данные'));
  }
};
