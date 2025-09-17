function errorHandler(err, req, res, next) {
  console.error('Error: ', err.message);

  //тут нужно будет обработать ошибки

}

module.exports = errorHandler;