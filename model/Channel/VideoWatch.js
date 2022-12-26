const mongoose = require('mongoose');

const videoWatch = new mongoose.Schema({
    id : {
        type : String
    },
    videosCount : {
        type : Number,
        default : 0
    },
    videos : {
        type : Array,
        default : []
    }
})

videoWatch.methods.addVideoWatch = async function(id){
    try {

        if(this.videos.find(element => element === id) === undefined){
            
            this.videos = this.videos.concat(id);
            this.videosCount = this.videosCount + 1;
            this.save();

        }
        return '';

    } catch (error) {
        console.log(error);
    }
}

const VideoWatch = mongoose.model('VIDEO WATCH',videoWatch);

module.exports = VideoWatch