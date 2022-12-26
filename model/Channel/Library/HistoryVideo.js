const mongoose = require('mongoose');


const historyVideo = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    videos : {
        type : Array,
        default : []
    }
})

historyVideo.methods.addHistoryVideo = async function(id){
    try {
        if(this.videos.find(element => element === id) === undefined){
            this.videos = this.videos.concat(id)
            this.save();
        }

        return ''
    } catch (error) {
        console.log(error);
    }
}

const HistoryVideo = mongoose.model('HISTORY VIDEOS',historyVideo)

module.exports = HistoryVideo