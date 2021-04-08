class Controller {
  static getRootHandler(req, res, next) {
    res.status(200).json({ message: 'Welcome to the janggel' })
  }
}

module.exports = Controller;