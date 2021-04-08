class Controller {
  static getRootHandler(req, res, next) {
    res.status(200).json({ message: 'Welcome to Entertainme' })
  }
}

module.exports = Controller;