const Ajv = require('ajv');
const ajv = new Ajv()
const CustomError = require('../helper/customErrorHelper')

function validateBody(body, schema) {
    const validated = ajv.compile(schema)
    if (!validated(body)) {
        throw new CustomError(
            400,
            "ER_INVALID_FORMAT",
            "Wrong body",
            validated.errors.map(err => `${err.dataPath} ${err.message}`).join()
        )
    }
}


module.exports = validateBody