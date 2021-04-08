const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database = null;

function connect(cb) {
  client.connect()
    .then(_ => {
      database = client.db('entertainme');
      cb(true);
    })
    .catch(err => {
      console.log(err);
      cb(false);
    })
}

function getDatabase () {
  return database
}

module.exports = {
  connect,
  getDatabase
}