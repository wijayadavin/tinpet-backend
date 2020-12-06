const _ = require('lodash');
const CustomError = require('../helper/customErrorHelper');


function routeErrorHandler(err, req, res, next) {
  let errorCode
  if (err['parent']) {
    errorCode = err['parent'].code
    err = err['parent']
  }
  if (err.code) {
    errorCode = err.code
  }
  if (err.name === "SequelizeValidationError") {
    err = err.errors[0]
    err.code = 400
    err.name = "ER_INVALID_FORMAT"
    errorCode = err.name
  }
  if (errorCode === 'ER_INVALID_FORMAT')
    return res.status(400).send(err)

  if (errorCode === 'ER_BAD_FIELD_ERROR')
    return res.status(400).send(err)

  if (errorCode === 'ER_DATA_TOO_LONG')
    return res.status(400).send(err);

  if (errorCode === 'ER_NOT_FOUND')
    return res.status(404).send(err);

  if (errorCode === 'ER_DUP_ENTRY')
    return res.status(409).send(err);

  else {
    console.error(err)
    if (err) {
      res.status(err.status).send(err)
    } else {
      res.status(500).send(new CustomError(
        500,
        'ER_INTERNAL',
        "An error occured that wasn't supossed to, please contact support"
      ))
    }
  }

}

module.exports = routeErrorHandler