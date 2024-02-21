require('dotenv') .config()
// const MONGO_URI = require('./db/connect')

// const mongoose = require('mongoose')

const express = require('express')
const app = express()

//middleware
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Page</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// })

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`the server is running on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()




