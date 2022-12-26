const mongoose = require('mongoose')

const userList = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    img : {
        type : String,
        default : ''
    },
    name : {
        type : String,
        default : ''
    },
    profession : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
})


userList.methods.addImg = async function(img){
    try{

        this.img = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}


const UserList = mongoose.model('USERLIST',userList)

module.exports = UserList