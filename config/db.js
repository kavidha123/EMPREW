require('dotenv').config()
const mongoose = require('mongoose');


exports.connectMongoose = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then((e) => console.log("Connected to Mongodb =>> Employee Review System"))
        .catch((e) => console.log("Not Connect Mongodb"))
}

