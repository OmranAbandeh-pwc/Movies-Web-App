
const mongoose = require('mongoose')


const movieWatchedList = ({
    id:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    poster_path:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    release_date:{
        type:String,
        required:true
    },
    vote_average:{
        type:Number,
        required:true
    },
    isWatched:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('MovieWL', movieWatchedList)