class Controller {
  static getRootHandler(req, res, next) {
    res.status(200).json({ message: 'Welcome to TV Series' })
  }
}

module.exports = Controller;