const express = require('express')
const { watchedList, getMovies, getSingleMovie, deleteMovie } = require('../controllers/watchedListController')
const router = express.Router()

// Router for Post a new movie in the movies list 
router.post('/moviewatchedlist/', watchedList)

// Router for single movie
router.get('/singlemovie/:id', getSingleMovie)

// Router for delete a movie
router.delete('/deletemovie/:id', deleteMovie)

// Router for Get all the movies in the moives watched list
router.get('/getmovieswatchedlist/', getMovies)


module.exports = router;