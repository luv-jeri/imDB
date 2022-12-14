class _Error extends Error {
  constructor(message = 'Something went wrong', statusCode = 500) {
    super(message);
    this.status = statusCode;
    this.isOperational = true;

    Error.caputreStackTrace(this, this.constructor);
  }
}

module.exports = _Error;
