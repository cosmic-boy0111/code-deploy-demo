const mongoose = require('mongoose')

const likeBlogs = new mongoose.Schema({
    id : {
        type : String,
        default : '',
    },
    blogArray : {
        type : Array,
        default : []
    }
})

likeBlogs.methods.addBlog = async function(id){
    try{
        this.blogArray = this.blogArray.concat(id);
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

likeBlogs.methods.subBlog = async function(id){
    try{
        this.blogArray = this.blogArray.filter(item => item !== id);
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

likeBlogs.methods.getList = async function(){
    try{
        return this.blogArray ;
    } catch(err){
        console.log(err);
    }
}

const LikeBlogs = mongoose.model('LIKE BLOGS',likeBlogs);

module.exports = LikeBlogs