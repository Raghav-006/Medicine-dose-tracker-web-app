const mongoose = require("mongoose");
const chalk = require("chalk");
const log = console.log;

const connectDB = (uri) => {
    try {
      mongoose.connection.on('connecting', () => {
        log(chalk.magenta(`connecting to database: ${uri}`))
      });
      mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: false,
      }, (err, db) => {
        if (err) {
          return log(chalk.bgGreen('unable to connect to database: ' + uri + ' ' + err));
        }
        if (db) {
          log(chalk.yellowBright.bold("Connected successfully to mongodb server " + uri));
        }
      });
      mongoose.connection.on('disconnected', () => {
        log(chalk.bgCyanBright(`disconnected to database: ${uri}`))
      });
      mongoose.connection.on('reconnected', () => {
        log(chalk.redBright(`reconnected again to database: ${uri}`))
      });
    } catch (error) {
      log(chalk.white('unable to connect to database URl: ' + error));
    }
};

module.exports = connectDB;