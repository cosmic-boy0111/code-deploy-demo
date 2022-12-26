const mongoose = require('mongoose');

const search = new mongoose.Schema({
    id  : { 
        type : String,
        default : ''
    },
    title  : { 
        type : String,
        default : ''
    },
    user_id : { 
        type : String,
        default : ''
    },
    tag : {
        type : String,
        default : ''
    }
})

const Search  = mongoose.model('SEARCH',search)

module.exports = Search
