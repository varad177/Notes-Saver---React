// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    
    name: {
        type: String,
        // unique: [true , "name already exist"],
       
        required: [true, 'it is required so'],
        minLength: [3, 'min 3 please character']
    },
    email: {
        type: String,
        required: [true, 'it is required'],
        // unique: [true , "email already exist"]
        unique: true

    }
    ,
    password: {
        type: String,
        require: [true, 'it is required'],
        minLength: [5, 'min 5 please character']
        // unique: [true , "password already exist"]
       
    },
    date: {
        type: Date,
        default: Date.now
    }

});

// const User = mongoose.model('users', UserSchema)
// User.createIndexes()
// module.exports =  User
module.exports = mongoose.model('user', UserSchema)