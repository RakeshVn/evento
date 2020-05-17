const mongo = module.exports

const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const config = require('./config');

mongo.connect = async function () {

  try {

    const mongoUri = config.mongo.host;

    await mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true });

    console.log('mongo connected')

    mongoose.connection.on('error', () => {
      throw new Error(`unable to connect to database: ${mongoUri}`);
    });

    if (config.MONGOOSE_DEBUG) {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
      });
    }

  } catch (error) {

    console.error(error)
    throw new Error(error)

  }

}