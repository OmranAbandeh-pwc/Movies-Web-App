const express = require('express')
const { watchedList, getMovies, getSingleMovie, deleteMovie } = require('../controllers/watchedListController')
const { verifyToken } = require('../Global')
const router = express.Router()

// Router for Post a new movie in the movies list 
router.post('/moviewatchedlist/',verifyToken, watchedList)

// Router for single movie
router.get('/singlemovie/:id', verifyToken, getSingleMovie)

// Router for delete a movie
router.delete('/deletemovie/:id', deleteMovie)

// Router for Get all the movies in the moives watched list
router.post('/getmovieswatchedlist/',verifyToken ,getMovies)


module.exports = router;