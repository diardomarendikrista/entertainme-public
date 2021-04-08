const router = require('express').Router();
const Controller = require('../controllers/index')
const Movies = require('./movies')
const tvSeries = require('./tvSeries')

router.get('/', Controller.getRootHandler)
router.use('/movies', Movies)
router.use('/tvSeries', tvSeries)

module.exports =  router;