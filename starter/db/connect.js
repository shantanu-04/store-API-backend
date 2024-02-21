const mongoose = require('mongoose')

// const MONGO_URI="mongodb+srv://shantanu:storeapi123@nodeexpressproject.btescyk.mongodb.net/?retryWrites=true&w=majority"


const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB

