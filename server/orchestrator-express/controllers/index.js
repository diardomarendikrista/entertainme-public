const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

class Controller {
  static getRootHandler(req, res, next) {
    res.status(200).json({ message: 'Welcome to Entertainme' })
  }

  static async getEntertainme(req, res, next) {
    try {
      const entertainmeData = await redis.get('entertainme:data');
      if(!entertainmeData) {
        // console.log('ini data baru');
        let entertainme;
        const movies = axios.get('http://localhost:4001/movies');
        const tvSeries = axios.get('http://localhost:4002/tvSeries');
    
        Promise.all([movies, tvSeries])
          .then((response) => {
            entertainme = {
              movies: response[0].data.movies,
              tvSeries: response[1].data.tvSeries,
            }
            return redis.set('entertainme:data', JSON.stringify(entertainme));
          })
          .then(_ => {
            res.status(200).json(entertainme);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err)
          })
      } else {
        // console.log('ini data cache');
        res.status(200).json(JSON.parse(entertainmeData));
      }
    }
    catch(err) {
      next(err);
    }
  }

  // test waktu , ternyata 1,5x - 2x lebih lama dibanding promise all
  // static async getEntertainme(req, res, next) {
  //   try {
  //     const movies = await axios.get('http://localhost:4001/movies');
  //     const tvSeries = await axios.get('http://localhost:4002/tvSeries');

  //     const entertainme = {
  //       movies: movies.data.movies,
  //       tvSeries: tvSeries.data.tvSeries,
  //     }

  //     res.status(200).json(entertainme)
  //   }
  //   catch (err) {
  //     console.log(err);
  //     res.status(500).json(err)
  //   }
  // }
}

module.exports = Controller;