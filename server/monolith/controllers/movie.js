const Movie = require('../models/movie');

class MovieController {
  static getMovies(req, res, next) {
    Movie.find()
      .then(movies => {
        res.status(200).json(movies);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
  }

  static getMovieById(req, res, next) {
    const { id } = req.params;

    Movie.findOne(id)
      .then(movie => {
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ message: `data not found`});
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
  }

  static addMovie(req, res, next) {
    const newMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    Movie.create(newMovie)
      .then(movie => {
        res.status(201).json(movie.ops);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
  }

  static editMovie(req, res, next) {
    const { id } = req.params;
    const editMovie = {
      $set: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      },
    }

    Movie.update(id, editMovie)
      .then(response => {
        if (response.matchedCount) {
          return Movie.findOne(id)
        } else {
          res.status(404).json({ message: `data not found`});
        }
      })
      .then(movie => {
        res.status(200).json(movie);
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
  }

  static deleteMovie(req, res, next) {
    const { id } = req.params;

    Movie.delete(id)
      .then(response => {
        if (response.deletedCount) {
          res.status(200).json({ message: `delete success`});
        } else {
          res.status(404).json({ message: `data not found`});
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      })
  }

}

module.exports = MovieController;