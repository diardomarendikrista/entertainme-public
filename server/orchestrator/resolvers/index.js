const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const resolvers = {
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
    tvSeries: async () => {
      try {
        const cacheTvSeries = await redis.get('tvSeries:data');
        if (!cacheTvSeries) {
          // console.log('ini data series baru');
          const { data } = await axios({
              method: "GET",
              url: 'http://localhost:4002/tvSeries/'
            })
          await redis.set('tvSeries:data', JSON.stringify(data.tvSeries));
          return data.tvSeries
        }
        else {
          // console.log('ini data series cache');
          return JSON.parse(cacheTvSeries);
        }
      } catch (err) {
        throw err;
      }
    },
    tvSerie: (_, args) => {
      const { _id } = args;
      return axios({
        method: "GET",
        url: 'http://localhost:4002/tvSeries/' + _id
      })
        .then(({ data }) => {
          return data.tvSeries;
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
    addTvSeries: async (_, args) => {
      try {
        await redis.del('tvSeries:data');
        const newTvSeries = {
          title: args.newTvSeries.title,
          overview: args.newTvSeries.overview,
          poster_path: args.newTvSeries.poster_path,
          popularity: args.newTvSeries.popularity,
          tags: args.newTvSeries.tags
        }
        const { data } = await axios({
            method: "POST",
            url: 'http://localhost:4002/tvSeries/',
            data: newTvSeries
          })
        return data.tvSeries[0];
      }
      catch (err) {
        throw err;
      }
    },
    editTvSeries: async (_, args) => {
      try {
        await redis.del('tvSeries:data');
        const { _id } = args;
        const updateTvSeries = {
          title: args.updateTvSeries.title,
          overview: args.updateTvSeries.overview,
          poster_path: args.updateTvSeries.poster_path,
          popularity: args.updateTvSeries.popularity,
          tags: args.updateTvSeries.tags
        }
        const { data } = await axios({
            method: "PUT",
            url: 'http://localhost:4002/tvSeries/' + _id,
            data: updateTvSeries
          })
        return data.tvSeries;
      }
      catch (err) {
        throw err;
      }
    },
    deleteTvSeries: async (_, args) => {
      try {
        await redis.del('tvSeries:data');
        const { _id } = args;
        const { data } = await axios({
            method: "DELETE",
            url: 'http://localhost:4002/tvSeries/' + _id
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
  resolvers
}