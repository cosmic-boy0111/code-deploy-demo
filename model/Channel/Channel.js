const mongoose = require('mongoose');


const channels = new mongoose.Schema({
    name : {
        type : String
    },
    subCounts : {
        type : Number,
        default : 0
    },
    about : {
        type : String,
        default : ''
    },
    joinDate : {
        type : Date,
        default : ''
    }
})


const Channels = mongoose.model('CHANNELS',channels)
module.exports = Channels