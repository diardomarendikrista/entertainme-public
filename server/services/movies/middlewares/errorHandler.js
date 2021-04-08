function errorHandler(err, req, res, next) {
  if (err.code == '400') {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: err.message
    });
  } else if (err.code == '401') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: err.message
    });
  } else if (err.code == '403') {
    res.status(403).json({
      status: 'error',
      code: 403,
      message: err.message
    });
  } else if (err.code == '404') {
    console.log(`masuk?`);
    res.status(404).json({
      status: 'error',
      code: 404,
      message: err.message
    });
  } else if (err.code == '405') {
    res.status(405).json({
      status: 'error',
      code: 405,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: err.message,
      isHandled: false,
      detail: err
    });
  }
}

module.exports = errorHandler;

