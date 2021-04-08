const router = require('express').Router();
const TvSeriesController = require('../controllers/tvSeries');

router.get('/', TvSeriesController.getTvSeries);

router.post('/', TvSeriesController.addTvSeries);
router.get('/:id', TvSeriesController.getTvSeriesById);
router.put('/:id', TvSeriesController.editTvSeries);
router.delete('/:id', TvSeriesController.deleteTvSeries);

module.exports = router;