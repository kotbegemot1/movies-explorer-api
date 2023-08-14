const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const {
  USER_CONFLICT_EMAIL_MESSAGE,
  BAD_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_LOGOUT_MESSAGE,
} = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    email,
    password: hash,
  }))
    .then((user) => {
      res.send(user.toJSON());
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_EMAIL_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: USER_LOGOUT_MESSAGE });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  logout,
  getUserInfo,
};
