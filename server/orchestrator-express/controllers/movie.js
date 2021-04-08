const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const baseURL = 'http://localhost:4001/movies/'

class MovieController {
  static async getMovies (req, res, next) {
    try {
      const { data } = await axios.get(baseURL);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  
  static async getMoviesById (req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(baseURL + id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async addMovie (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
  
      const movie = await axios.post(baseURL, newMovie);
      res.status(201).json({ movie: movie.data.movie});
    }
    catch (err) {
      next(err);
    }
  }

  static async editMovie (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const { id } = req.params;
      const editMovie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }

      const { data } = await axios.put(baseURL + id, editMovie);
      if (Object.keys(data).length > 0) {
        res.status(200).json({ movie: data.movie});
      } else {
        next({ code: 404 });
      }
      
    }
    catch (err) {
      next(err)
    }
  }

  static async deleteMovie (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const { id } = req.params;
      let deleteMovie = await axios.delete(baseURL + id);
      res.status(200).json(deleteMovie.data);
    }
    catch (err) {
      next(err);
    }
  }
}

module.exports = MovieController;