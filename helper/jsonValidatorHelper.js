const Ajv = require('ajv');
const ajv = new Ajv()
const CustomError = require('../helper/customErrorHelper')

function validateBody(body, schema) {
    const validate = ajv.compile(schema)
    const isValidated = validate(body)
    if (!isValidated) {
        throw new CustomError(
            400,
            "ER_INVALID_FORMAT",
            "Wrong body",
            validate.errors.map(err => `${err.dataPath} ${err.message}`).join(),
            validate.schema
        )
    }
}


module.exports = validateBody