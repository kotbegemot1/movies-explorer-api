const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { BAD_WAY_MESSAGE } = require('../helpers/constants');

const {
  validateCreateUser,
  validateLogin,
} = require('../helpers/joiValidate');

const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/', require('./users'));
router.use('/', require('./movies'));

router.post('/signout', logout);

router.use('*', (req, res, next) => next(new NotFoundError(BAD_WAY_MESSAGE)));

module.exports = router;
