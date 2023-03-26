require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const watchedListRouter = require("./routes/moviesWatched")
const usersRouter = require('./routes/users')

// Express App
const app = express()

app.use(express.json())
// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/users', usersRouter)
app.use('/api/watchedlist', watchedListRouter)

mongoose.connect('mongodb://localhost:27017').then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})

// Listen to port
app.listen(process.env.PORT, () => {
    console.log("Listening on Port", process.env.PORT)
})