const mongoose = require('mongoose')

const thumbnails = mongoose.Schema({
    id : {
        type : String,
    },
    file : {
        type : String
    }
})


thumbnails.methods.addFile = async function(file){
    try{
        this.file = file;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}




const Thumbnails = mongoose.model('THUMBNAILS FILES', thumbnails);

module.exports = Thumbnails;
