function errorHandler(err, req, res, next) {
  if (err.code == '400' || err.message == 'Request failed with status code 400') {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'bad request / invalid input',
      detail: err
    });
  } else if (err.code == '401' || err.message == 'Request failed with status code 401') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'not authorized',
      detail: err
    });
  } else if (err.code == '403' || err.message == 'Request failed with status code 403') {
    res.status(403).json({
      status: 'error',
      code: 403,
      message: 'forbidden',
      detail: err
    });
  } else if (err.code == '404' || err.message == 'Request failed with status code 404') {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'data not found',
      detail: err
    });
  } else if (err.code == '405' || err.message == 'Request failed with status code 405') {
    res.status(405).json({
      status: 'error',
      code: 405,
      message: err.message,
      detail: err
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

