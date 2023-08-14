const router = require('express').Router();
const {
  validateUserById,
  validateUserInfo,
} = require('../helpers/joiValidate');

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', validateUserById, getUserInfo);
router.patch('/users/me', validateUserInfo, updateUserInfo);

module.exports = router;
