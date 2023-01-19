class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 409;
    this.message = message;
  }
}

export default BadRequestError;
