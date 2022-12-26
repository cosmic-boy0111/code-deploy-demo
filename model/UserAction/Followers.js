const mongoose = require('mongoose')

const followers = new mongoose.Schema({
    id : {
        type : String
    },

    followers : {
        type : Array,
        default : []
    }

})

followers.methods.addFollower = async function(id){
    try {
        this.followers = this.followers.concat(id)
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
    
}

followers.methods.deleteFollower = async function(id){
    try {
        this.followers = this.followers.filter(item => item !== id);
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
    
}

followers.methods.getFollowList = async function(){
    try{
        return this.followers ;
    } catch(err){
        console.log(err);
    }
}


const Followers = mongoose.model('FOLLOWERS',followers);
module.exports = Followers