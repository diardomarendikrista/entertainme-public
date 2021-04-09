const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const moviesResolvers = {
  Query: {
    Movies: async () => {
      try {
        const cacheMovies = await redis.get('movies:data');
        if (!cacheMovies) {
          // console.log('ini data movie baru');
          const { data } = await axios({
              method: "GET",
              url: 'http://localhost:4001/movies/'
            })
          await redis.set('movies:data', JSON.stringify(data.movies));
          return data.movies
        } else {
          // console.log('ini data movie cache');
          return JSON.parse(cacheMovies);
        }
      }
      catch(err) {
        throw err;
      }
    },
    Movie: (_, args) => {
      const { _id } = args;
      return axios({
        method: "GET",
        url: 'http://localhost:4001/movies/' + _id
      })
        .then(({ data }) => {
          return data.movie;
        })
        .catch(err => {
          throw err;
        })
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        await redis.del('movies:data');
        const newMovie = {
          title: args.newMovie.title,
          overview: args.newMovie.overview,
          poster_path: args.newMovie.poster_path,
          popularity: args.newMovie.popularity,
          tags: args.newMovie.tags
        }
        const { data } = await axios({
            method: "POST",
            url: 'http://localhost:4001/movies/',
            data: newMovie
          })
        return data.movie[0];
      }
      catch (err) {
        throw err;
      }
    },
    editMovie: async (_, args) => {
      try {
        await redis.del('movies:data');
        const { _id } = args;
        const updateMovie = {
          title: args.updateMovie.title,
          overview: args.updateMovie.overview,
          poster_path: args.updateMovie.poster_path,
          popularity: args.updateMovie.popularity,
          tags: args.updateMovie.tags
        }
        const { data } = await axios({
            method: "PUT",
            url: 'http://localhost:4001/movies/' + _id,
            data: updateMovie
          })
        return data.movie;
      }
      catch (err) {
        throw err;
      }
    },
    deleteMovie: async (_, args) => {
      try {
        await redis.del('movies:data');
        const { _id } = args;
        const { data } = await axios({
            method: "DELETE",
            url: 'http://localhost:4001/movies/' + _id
          })
        return data;
      }
      catch (err) {
        throw err;
      }
    },
  }
};

module.exports = {
  moviesResolvers
}