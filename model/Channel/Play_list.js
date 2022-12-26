const mongoose = require('mongoose')

const playList = new mongoose.Schema({
    name : {
        type : String
    },
    description : {
        type : String
    },
    videos : {
        type : Array,
        default : []
    },
    videoCount : {
        type : Number,
        default : 0
    },
    
})

playList.methods.addVideo = async function(id){
    try {
        this.videos = this.videos.concat(id);
        this.videoCount = this.videoCount + 1;
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
}

playList.methods.getVideos = async function(){
    try {
        return this.videos;
    } catch (error) {
        console.log(error);
    }
}

const PlayList = mongoose.model('PLAY LIST',playList);

module.exports = PlayList