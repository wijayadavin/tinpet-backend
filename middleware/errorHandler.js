const _ = require('lodash');
const CustomError = require('../helper/customErrorHelper');


function routeErrorHandler(err, req, res, next) {
  const errorCodes = [_.toPlainObject(err).code, err, err.code]

  if (errorCodes.some((err) => err === 'ER_INVALID_FORMAT'))
    return res.status(400).send(err)

  if (errorCodes.some((err) => err === 'ER_BAD_FIELD_ERROR'))
    return res.status(400).send(err)

  if (errorCodes.some((err) => err === 'ER_DATA_TOO_LONG'))
    return res.status(400).send(err);

  if (errorCodes.some((err) => err === 'ER_NOT_FOUND'))
    return res.status(401).send(err);

  if (errorCodes.some((err) => err === 'ER_DUP_ENTRY'))
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