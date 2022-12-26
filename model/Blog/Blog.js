const mongoose = require('mongoose')

const blog = new mongoose.Schema({
    headerTitle: {
        type : String,
        default : ''
    },
    file : {
        type : String,
        default : ''
    },
    description : {
        type : String,
        default : ''
    },
    userId : {
        type : String,
        default : ''
    },
    likeCount : {
        type : Number,
        default : 0
    }
})


blog.methods.addImg = async function(img){
    try{
        this.userImg = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}


blog.methods.addLike = async function(){
    try{
        this.likeCount = this.likeCount + 1;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

blog.methods.subLike = async function(){
    try{
        this.likeCount = this.likeCount - 1;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

const Blog = mongoose.model('BLOG',blog);

module.exports = Blog;