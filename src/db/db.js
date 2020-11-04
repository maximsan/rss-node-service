const mongoose = require('mongoose');
// const { addAdmin } = require('./helpers');
// const initDB = require('./helpers');
const { winstonLogger } = require('../common/logger');

const runDB = appStart => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;

  db.on('error', error => {
    winstonLogger.error(`connection error: ${error}`);
  });
  db.once('open', async () => {
    console.log('Connection to database is successfully established!');

    // helper to init db with initial data if you need it
    // await initDB(db);

    // helper to add admin into db
    // addAdmin();
    appStart();
  });
};

module.exports = runDB;
