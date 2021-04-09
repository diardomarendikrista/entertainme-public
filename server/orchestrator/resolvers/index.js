const { moviesResolvers } = require('./movies');
const { tvSeriesResolvers } = require('./tvSeries');

const resolvers = {
  Query: {
    ...moviesResolvers.Query,
    ...tvSeriesResolvers.Query
  },
  Mutation: {
    ...moviesResolvers.Mutation,
    ...tvSeriesResolvers.Mutation
  }
};

module.exports = {
  resolvers
}