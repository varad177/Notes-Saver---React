const { mongoose } = require("mongoose");

// import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   
    title: {
        type: String,
        require: true,
        minLength:[3 , "min length 3 please"]
    },
    description: {
        type: String
    },
    
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('notes', NotesSchema)