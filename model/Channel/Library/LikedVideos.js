const mongoose = require('mongoose');


const likedVideo = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    videos : {
        type : Array,
        default : []
    }
})

likedVideo.methods.addLikedVideo = async function(id){
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

likedVideo.methods.removeLikedVideo = async function(id){
    try {
        
        this.videos = this.videos.filter((e)=>{
            return e !== id;
        })

        this.save();

        console.log(this.videos);

        return ''
    } catch (error) {
        console.log(error);
    }
}

const LikedVideo = mongoose.model('LIKED VIDEOS',likedVideo)

module.exports = LikedVideo