const mongoose = require('mongoose')

// const mongoURI= "mongodb://localhost:27017"
const mongoURI= "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/inotebook"

const connectToMongo =  ()=>{
    mongoose.connect(mongoURI)
    .then((conn) =>{
        console.log("connected");

    })
    .catch((err)=>{
        console.log(err);
    })

}

module.exports = connectToMongo;