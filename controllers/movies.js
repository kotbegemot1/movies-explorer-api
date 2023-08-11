const Movies = require('../models/movies');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const {
  BAD_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
} = require('../helpers/constants');

const getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id }).sort({ _id: -1 })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movies.findById(req.params.id)
    .populate('owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
      }
      if (req.user._id !== movie.owner.id) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_MESSAGE);
      }
      movie.deleteOne(movie)
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
