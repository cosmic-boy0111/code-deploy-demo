const mongoose = require('mongoose')

const channelList = new mongoose.Schema({
    id : {
        type : String
    },
    channels : {
        type : Array,
        default : []
    }
})

channelList.methods.addChannel = async function(id) { 
    try {
        this.channels = this.channels.concat(id)
        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
}

channelList.methods.getList = async function() { 
    try {
        return this.channels;   
    } catch (error) {
        console.log(error);
    }
}

channelList.methods.deleteChannel = async function(id) { 
    try {
        this.channels = this.channels.filter((e)=>{
            return e !== id;
        }) 

        this.save();
        return ''
    } catch (error) {
        console.log(error);
    }
}

const ChannelList = mongoose.model('CHANNEL LIST',channelList)

module.exports = ChannelList