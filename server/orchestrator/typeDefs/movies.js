const { gql } = require('apollo-server');

const movies = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MessageMovie {
    message: String
  }

  input MovieInput {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    Movies: [Movies]
    Movie(_id: ID): Movies
  }

  extend type Mutation {
    addMovie(newMovie: MovieInput): Movies
    editMovie(_id: ID, updateMovie: MovieInput): Movies
    deleteMovie(_id: ID): MessageMovie
  }
`;

module.exports = { movies };