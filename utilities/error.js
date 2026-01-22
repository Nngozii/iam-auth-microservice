//A function to create/throw custom errors and to be handles by the middleware in app.js
function errorHandler(statusCode, message) {
    const error = new Error
    error.statusCode = statusCode
    error.message = message

    return error
}

module.exports = errorHandler;
