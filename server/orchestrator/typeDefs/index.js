const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Message {
    message: String
  }

  type tvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  
  input TvSeriesInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Query {
    Movies: [Movies]
    Movie(_id: ID): Movies
    tvSeries: [tvSeries]
    tvSerie(_id: ID): tvSeries
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movies
    editMovie(_id: ID, updateMovie: MovieInput): Movies
    deleteMovie(_id: ID): Message
    addTvSeries(newTvSeries: TvSeriesInput): tvSeries
    editTvSeries(_id: ID, updateTvSeries: TvSeriesInput): tvSeries
    deleteTvSeries(_id: ID): Message
  }
`;

module.exports = { typeDefs };