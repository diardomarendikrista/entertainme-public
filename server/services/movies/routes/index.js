const router = require('express').Router();
const Controller = require('../controllers/index')
const Movies = require('./movies')

router.get('/', Controller.getRootHandler)
router.use('/movies', Movies)

module.exports =  router;