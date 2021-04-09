const { root } = require('./root');
const { movies } = require('./movies');
const { tvSeries } = require('./tvSeries');

const typeDefs = [root, movies, tvSeries];

module.exports = { typeDefs }