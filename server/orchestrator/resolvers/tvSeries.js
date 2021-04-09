const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const tvSeriesResolvers = {
  Query: {
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
  tvSeriesResolvers
}