const { gql } = require('apollo-server');

const tvSeries = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type tvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageTvSeries {
    message: String
  }

  input TvSeriesInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    tvSeries: [tvSeries]
    tvSerie(_id: ID): tvSeries
  }

  extend type Mutation {
    addTvSeries(newTvSeries: TvSeriesInput): tvSeries
    editTvSeries(_id: ID, updateTvSeries: TvSeriesInput): tvSeries
    deleteTvSeries(_id: ID): MessageTvSeries
  }
`;

module.exports = { tvSeries };