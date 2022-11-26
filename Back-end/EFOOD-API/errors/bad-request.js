const CustomAPIError = require('./custom-api')
const { StatusCodes } = require('http-status-codes')
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest