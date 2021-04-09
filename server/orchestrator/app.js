const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

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

const resolvers = {
  Query: {
    Movies: () => {
      return axios({
        method: "GET",
        url: 'http://localhost:4001/movies/'
      })
        .then(({ data }) => {
          return data.movies
        })
        .catch(err => {
          throw err
        })
    },
    Movie: (_, args) => {
      const { _id } = args;
      return axios({
        method: "GET",
        url: 'http://localhost:4001/movies/' + _id
      })
        .then(({ data }) => {
          return data.movie
        })
        .catch(err => {
          throw err
        })
    },
    tvSeries: () => {
      return axios({
        method: "GET",
        url: 'http://localhost:4002/tvSeries/'
      })
        .then(({ data }) => {
          return data.tvSeries
        })
        .catch(err => {
          throw err
        })
    },
    tvSerie: (_, args) => {
      const { _id } = args;
      return axios({
        method: "GET",
        url: 'http://localhost:4002/tvSeries/' + _id
      })
        .then(({ data }) => {
          return data.tvSeries
        })
        .catch(err => {
          throw err
        })
    },
  },
  Mutation: {
    addMovie: (_, args) => {
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags
      }
      return axios({
        method: "POST",
        url: 'http://localhost:4001/movies/',
        data: newMovie
      })
        .then(({ data }) => {
          return data.movie[0]
        })
        .catch(err => {
          throw err
        })
    },
    editMovie: (_, args) => {
      const { _id } = args;
      const updateMovie = {
        title: args.updateMovie.title,
        overview: args.updateMovie.overview,
        poster_path: args.updateMovie.poster_path,
        popularity: args.updateMovie.popularity,
        tags: args.updateMovie.tags
      }
      return axios({
        method: "PUT",
        url: 'http://localhost:4001/movies/' + _id,
        data: updateMovie
      })
        .then(({ data }) => {
          return data.movie
        })
        .catch(err => {
          throw err
        })
    },
    deleteMovie: (_, args) => {
      const { _id } = args;
      return axios({
        method: "DELETE",
        url: 'http://localhost:4001/movies/' + _id
      })
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          throw err
        })
    },
    addTvSeries: (_, args) => {
      const newTvSeries = {
        title: args.newTvSeries.title,
        overview: args.newTvSeries.overview,
        poster_path: args.newTvSeries.poster_path,
        popularity: args.newTvSeries.popularity,
        tags: args.newTvSeries.tags
      }
      return axios({
        method: "POST",
        url: 'http://localhost:4002/tvSeries/',
        data: newTvSeries
      })
        .then(({ data }) => {
          return data.tvSeries[0]
        })
        .catch(err => {
          throw err
        })
    },
    editTvSeries: (_, args) => {
      const { _id } = args;
      const updateTvSeries = {
        title: args.updateTvSeries.title,
        overview: args.updateTvSeries.overview,
        poster_path: args.updateTvSeries.poster_path,
        popularity: args.updateTvSeries.popularity,
        tags: args.updateTvSeries.tags
      }
      return axios({
        method: "PUT",
        url: 'http://localhost:4002/tvSeries/' + _id,
        data: updateTvSeries
      })
        .then(({ data }) => {
          return data.tvSeries
        })
        .catch(err => {
          throw err
        })
    },
    deleteTvSeries: (_, args) => {
      const { _id } = args;
      return axios({
        method: "DELETE",
        url: 'http://localhost:4002/tvSeries/' + _id
      })
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          throw err
        })
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});