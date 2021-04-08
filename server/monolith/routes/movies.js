const router = require('express').Router();
const MovieController = require('../controllers/movie');

router.get('/', MovieController.getMovies);

router.post('/', MovieController.addMovie);
router.get('/:id', MovieController.getMovieById);
router.put('/:id', MovieController.editMovie);
router.delete('/:id', MovieController.deleteMovie);

module.exports = router;