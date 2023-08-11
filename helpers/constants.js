const BAD_REQUEST_ERROR_CODE = 400;
const CONFLICT_ERROR_CODE = 409;
const FORBIDDEN_ERROR_CODE = 403;
const NOT_FOUND_ERROR_CODE = 404;
const UNAUTHORIZED_ERROR_CODE = 401;

const BAD_DATA_MESSAGE = 'Переданы некорректные данные';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден';
const MOVIE_FORBIDDEN_MESSAGE = 'Чужой фильм удалить нельзя';

const USER_CONFLICT_EMAIL_MESSAGE = 'при регистрации указан email, который уже существует на сервере';
const USER_NOT_FOUND_MESSAGE = 'Нет пользователя с таким id';
const USER_UNAUTHORIZED_MESSAGE = 'Необходима авторизовация';
const USER_LOGOUT_MESSAGE = 'Выход';
const USER_WRONG_AUTH_MESSAGE = 'Неправильные почта или пароль';

const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

const BAD_URL_MESSAGE = 'Введите корректный адресс ссылки';
const BAD_WAY_MESSAGE = 'Непрвильный путь';

const ALLOWED_CORS = [
  // 'https://last.sprint.front.nomoredomains.xyz',
  // 'http://last.sprint.front.nomoredomains.xyz',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const ALLOWED_HEADERS = 'Origin, Authorization, X-Requested-Width, Content-Type, Accept';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  BAD_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  USER_CONFLICT_EMAIL_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_LOGOUT_MESSAGE,
  USER_UNAUTHORIZED_MESSAGE,
  SERVER_ERROR_MESSAGE,
  BAD_URL_MESSAGE,
  USER_WRONG_AUTH_MESSAGE,
  BAD_WAY_MESSAGE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_HEADERS,
};
