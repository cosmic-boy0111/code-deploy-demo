const mongoose = require('mongoose')

const userFollowFollowersCount = new mongoose.Schema({
    id : {
        type : String,
        default : '',
    },
    followers : {
        type : Number,
        default : 0
    },
    followings : {
        type : Number,
        default : 0
    }
})

userFollowFollowersCount.methods.addFollower = async function(){
    try {
        this.followers = this.followers + 1;
        this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}

userFollowFollowersCount.methods.subFollower = async function(){
    try {
        this.followers = this.followers - 1;
        this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}


userFollowFollowersCount.methods.addFollowing = async function(){
    try {
        this.followings = this.followings + 1;
        this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}

userFollowFollowersCount.methods.subFollowing = async function(){
    try {
        this.followings = this.followings - 1;
        this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}


userFollowFollowersCount.methods.getCount = async function(){
    try {
        var data = {
            followers : this.followers,
            followings : this.followings
        }

        console.log(this.followers,this.followings);

        return data;
    } catch (error) {
        console.log(error);
    }
}






const UserFollowFollowersCount = mongoose.model('FOLLOW FOLLOWERS COUNT',userFollowFollowersCount);
module.exports = UserFollowFollowersCount;