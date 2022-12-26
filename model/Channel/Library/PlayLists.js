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
        if(this.playlists.find(element => element === id) === undefined && id!==''){
            this.playlists = this.playlists.concat(id)
            this.save();
        }
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

const LibraryPlayLists = mongoose.model('LIBRARY PLAYLISTS',playLists)

module.exports = LibraryPlayLists
