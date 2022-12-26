const mongoose = require('mongoose')

const playLists = new mongoose.Schema({
    id : {
        type : String
    },
    playlists : {
        type : Array,
        default : []
    }
})



playLists.methods.addPlaylists = async function(id) { 
    try {
        this.playlists = this.playlists.concat(id)
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
}

playLists.methods.getPlayLists = async function() { 
    try {
        return this.playlists;
    } catch (error) {
        console.log(error);
    }
}

const PlayLists = mongoose.model('PLAYLISTS',playLists)

module.exports = PlayLists
