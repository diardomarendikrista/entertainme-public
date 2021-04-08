const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb')

const collectionName = 'TvSeries';
class TvSeries {
  static find() {
    return getDatabase().collection(collectionName).find().toArray()
  }

  static findOne(id) {
    return getDatabase().collection(collectionName).findOne({
      _id: ObjectId(id)
    })
  }

  static create(newData) {
    return getDatabase().collection(collectionName).insertOne(newData);
  }

  static delete(id) {
    return getDatabase().collection(collectionName).deleteOne({
      _id: ObjectId(id)
    });
  }

  static update(id, updatedData) {
    return getDatabase().collection(collectionName).updateOne({ _id: ObjectId(id) }, updatedData);
  }
}

module.exports = TvSeries;