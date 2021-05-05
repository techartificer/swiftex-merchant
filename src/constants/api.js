let baseURL = 'http://localhost:4141';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.swiftex.app';
  console.log('Prod: ', baseURL);
}
module.exports = { baseURL };
