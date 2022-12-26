const mongoose = require('mongoose')

const blogFiles = mongoose.Schema({
    id : {
        type : String,
    },
    file : {
        type : String
    }
})


blogFiles.methods.addFile = async function(file){
    try{
        this.file = file;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}




const BlogFiles = mongoose.model('BLOG FILES', blogFiles);

module.exports = BlogFiles;




