class ValueError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValueError';
    this.statusCode = 400;
  }
}

export default ValueError;
