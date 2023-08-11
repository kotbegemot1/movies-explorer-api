const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  BAD_URL_MESSAGE,
  USER_WRONG_AUTH_MESSAGE,
} = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [(email) => validator.isEmail(email), BAD_URL_MESSAGE],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const copyDict = ret;
    delete copyDict.password;
    return copyDict;
  },
});

userSchema.statics.findUserByCredentials = function checkPassword(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(USER_WRONG_AUTH_MESSAGE));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(USER_WRONG_AUTH_MESSAGE));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
