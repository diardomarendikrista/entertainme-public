const router = require('express').Router();
const Controller = require('../controllers/index');
const MovieController = require('../controllers/movie');
const TvSeriesController = require('../controllers/tvSeries');

router.get('/', Controller.getRootHandler);
router.get('/entertainme', Controller.getEntertainme);

router.get('/getMovies', MovieController.getMovies);
router.get('/getMovies/:id', MovieController.getMoviesById);
router.post('/addMovie', MovieController.addMovie);
router.put('/editMovie/:id', MovieController.editMovie);
router.delete('/deleteMovie/:id', MovieController.deleteMovie);

router.get('/getTvSeries', TvSeriesController.getTvSeries);
router.get('/getTvSeries/:id', TvSeriesController.getTvSeriesById);
router.post('/addTvSeries', TvSeriesController.addTvSeries);
router.put('/editTvSeries/:id', TvSeriesController.editTvSeries);
router.delete('/deleteTvSeries/:id', TvSeriesController.deleteTvSeries);

module.exports =  router;