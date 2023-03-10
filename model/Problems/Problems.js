const mongoose = require('mongoose')

const problems = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    mainTag : {
        type : String,
        required : true
    },
    subTags : {
        type : Array,
        default : []
    },
    difficulty : {
        type : Number,
        required : true
    },
    testCases : {
        type : Array,
        default : []
    },
    owner : {
        type : Object,
        default : {}
    }
})

const Problems = mongoose.model('CPP PROBLEMS',problems)

module.exports = Problems