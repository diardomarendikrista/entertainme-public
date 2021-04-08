const TvSeries = require('../models/tvSeries');

class TvSeriesController {
  static getTvSeries(req, res, next) {
    TvSeries.find()
      .then(tvSeries => {
        res.status(200).json({ tvSeries });
      })
      .catch(next)
  }

  static getTvSeriesById(req, res, next) {
    const { id } = req.params;

    TvSeries.findOne(id)
      .then(tvSeries => {
        if (tvSeries) {
          res.status(200).json({ tvSeries });
        } else {
          next({
            code: 404,
            message: `data not found`
          })
        }
      })
      .catch(next)
  }

  static addTvSeries(req, res, next) {
    const newTvSeries = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags
    }

    TvSeries.create(newTvSeries)
      .then(tvSeries => {
        res.status(201).json({ tvSeries: tvSeries.ops });
      })
      .catch(next)
  }

  static editTvSeries(req, res, next) {
    const { id } = req.params;
    const editTvSeries = {
      $set: {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      },
    }

    TvSeries.update(id, editTvSeries)
      .then(response => {
        if (response.matchedCount > 0) {
          return TvSeries.findOne(id)
        } else {
          throw { code: 404, message: `data not found` }
        }
      })
      .then(tvSeries => {
        res.status(200).json({ tvSeries });
      })
      .catch(next)
  }

  static deleteTvSeries(req, res, next) {
    const { id } = req.params;

    TvSeries.delete(id)
      .then(response => {
        if (response.deletedCount) {
          res.status(200).json({ message: `delete success`});
        } else {
          next({
            code: 404,
            message: `data not found`
          })
        }
      })
      .catch(next)
  }
}

module.exports = TvSeriesController;