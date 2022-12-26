const mongoose = require('mongoose')

const img = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    img : {
        type : String,
        default : ''
    }
})

const bgImg = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    bgImg : {
        type : String,
        default : ''
    }
})


img.methods.addImg = async function(img){
    try{

        this.img = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

bgImg.methods.addBgImg = async function(img){
    try{

        this.bgImg = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}




const Img = mongoose.model('IMG',img)
const BgImg = mongoose.model('BGIMG',bgImg)

module.exports = {Img , BgImg}