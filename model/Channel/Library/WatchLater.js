const mongoose = require('mongoose');


const watchLater = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    videos : {
        type : Array,
        default : []
    }
})

watchLater.methods.addWatchLater = async function(id){
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

const WatchLater = mongoose.model('WATCH LATER',watchLater)

module.exports = WatchLater