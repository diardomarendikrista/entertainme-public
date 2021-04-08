const router = require('express').Router();
const Controller = require('../controllers/index')
const tvSeries = require('./tvSeries')

router.get('/', Controller.getRootHandler)
router.use('/tvSeries', tvSeries)

module.exports =  router;