const mongoose = require('mongoose')

const videos = new mongoose.Schema({
    channel_id : {
        type : String
    },
    playlist_id : {
        type : String,
        default : ''
    },
    userId : {
        type : String,
    },
    
    thumbnail : {
        type : String,
    },
    headerTitle: {
        type : String,
    },
    
    description : {
        type : String,
    },
    field : {
        type : String,
        default : ''
    },
    langType : {
        type : String
    },
    createAt : {
        type : Date,
    }

})

const Videos = mongoose.model('VIDEOS',videos)

module.exports = Videos