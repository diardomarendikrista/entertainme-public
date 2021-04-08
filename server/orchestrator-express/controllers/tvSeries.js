const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const baseURL = 'http://localhost:4002/tvSeries/'

class TvSeriesController {
  static async getTvSeries (req, res, next) {
    try {
      const { data } = await axios.get(baseURL);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  
  static async getTvSeriesById (req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(baseURL + id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async addTvSeries (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const newTvSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
  
      const tvSeries = await axios.post(baseURL, newTvSeries);
      res.status(201).json({ tvSeries: tvSeries.data.tvSeries});
    }
    catch (err) {
      next(err);
    }
  }

  static async editTvSeries (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const { id } = req.params;
      const editTvSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }

      const { data } = await axios.put(baseURL + id, editTvSeries);
      if (Object.keys(data).length > 0) {
        res.status(200).json({ tvSeries: data.tvSeries});
      } else {
        next({ code: 404 });
      }
      
    }
    catch (err) {
      next(err)
    }
  }

  static async deleteTvSeries (req, res, next) {
    try {
      await redis.del('entertainme:data');
      const { id } = req.params;
      let deleteTvSeries = await axios.delete(baseURL + id);
      res.status(200).json(deleteTvSeries.data);
    }
    catch (err) {
      next(err);
    }
  }
}

module.exports = TvSeriesController;