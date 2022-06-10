const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatars:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema)