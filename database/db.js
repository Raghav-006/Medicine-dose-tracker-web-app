/*const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.ATLAS_URI,{
        useUniFiedTopology: true,
        useNewUrlParser: true,
    },()=>{
        console.log('connected to the database medicationss');
    })
} catch (error) {
    console.log('unable to connect') 
};*/
const mongoose = require("mongoose");
const chalk = require('chalk');
const log = console.log;

const connectDB = (uri) => {
    try {
        mongoose.connection.on('connecting', () => {
            log(chalk.magenta(`connecting to database: ${uri}`))
        });
        mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }, (err, db) => {
            if (err) {
                return console.log(chalk.bgGreen('unable to connect to database: ' + uri));
            }
            if (db) {
                console.log(chalk.yellowBright.bold("Connected successfully to mongodb server " + uri));
            }
        });
        mongoose.connection.on('disconnected', () => {
            log(chalk.bgCyanBright(`disconnected to database: ${uri}`))
        });
        mongoose.connection.on('reconnected', () => {
            log(chalk.redBright(`reconnected again to database: ${uri}`))
        });
    } catch (error) {
        console.log(chalk.white('unable to connect to database URl: ' + error));
    }
};

module.exports = connectDB;