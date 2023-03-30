const MovieWL = require('../models/watchedListModel')
const mongoose = require('mongoose')
const { findById } = require('../models/watchedListModel')




// GET All the movies 
const getMovies = async (req, res) => {
    const userid = req.userid
    const movies = await MovieWL.find({userid : userid})
    res.status(200).json(movies)
}

//GET a single movie
const getSingleMovie = async (req, res) => {
    const { id } = req.params
    const userid = req.userid

    const movie = await MovieWL.findOne({ id: id })
    if(movie && movie.userid === userid){
        res.status(200).json({movie,msg:"exist"})
    }else{
        res.status(200).json({msg:"notexist"})
    }
}

// DELETE a movie from watched list
const deleteMovie = async (req, res) => {
    const { id } = req.params
    const check = await MovieWL.findOne({id : id})
    if(check){
        const movie = await MovieWL.findOneAndDelete({id : id})    
        res.status(200).json(movie)
    } else {
        res.status(404).json({msg :"not found"})
    }
    
}


// POST movie api

const watchedList = async (req, res) => {
    const {id,poster_path,title,release_date,vote_average, isWatched} = req.body
    const userid = req.userid

    const checkWatchedMovie = await MovieWL.findOne({ id: id})

    if(checkWatchedMovie){
        res.status(200).json({msg:"exist"})
    } else {
        const movieWatched = await MovieWL.create({ id,userid,poster_path,title,release_date,vote_average, isWatched })
        res.status(200).json({msg:'notexist'})
    }
   
}

module.exports = { watchedList, getMovies, getSingleMovie, deleteMovie }