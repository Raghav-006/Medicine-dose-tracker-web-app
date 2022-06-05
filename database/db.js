const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.ATLAS_URI,{
        useUniFiedTopology: true,
        useNewUrlParser: true,
    },()=>{
        console.log('connected to the database medicationss')
    })
} catch (error) {
    console.log('unable to connect') 
};