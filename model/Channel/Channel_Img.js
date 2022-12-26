const mongoose = require('mongoose')

const channelImg = new mongoose.Schema({
    id : {
        type : String,
    },
    img : {
        type : String,
        default : ''
    }
})

channelImg.methods.addImg = async function(img) {
    try {
        this.img = img;
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
}

const ChannelImg = mongoose.model('CHANNEL IMG',channelImg);

module.exports = ChannelImg