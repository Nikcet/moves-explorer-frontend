class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DefaultError';
    this.statusCode = 500;
  }
}

export default DefaultError;
