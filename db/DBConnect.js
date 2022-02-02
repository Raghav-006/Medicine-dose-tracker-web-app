const mongoose = require("mongoose");
var chalk = require('chalk');
var log = console.log;

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/test-schedule';

try {
    mongoose.connection.on('connecting', () => {
        log(chalk.magenta(`connecting to database: ${uri}`))
    });
    mongoose.connect(uri, {
        //mongoose.connect(PROCESS.ENV.ATLAS_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        family: 4
    },(err, db)=>{
        if(err){
            return console.log(chalk.bgGreen('unable to connect to database: '+ uri + err ));
        }
        if(db){
            console.log(chalk.yellowBright.bold("Connected successfully to mongodb server "+ uri));
        }
    });
    mongoose.connection.on('disconnected', () => {
        log(chalk.bgCyanBright(`disconnected to database: ${uri}`))
    });
    mongoose.connection.on('reconnected', () => {
        log(chalk.redBright(`reconnected again to database: ${uri}`))
    });
}catch(error){
    console.log(chalk.blue('unable to connect to database:'));
    handleError(error);
}