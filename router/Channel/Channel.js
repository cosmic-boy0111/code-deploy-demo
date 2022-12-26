const express = require('express')

const router = express.Router();

const Channels = require('../../model/Channel/Channel')
const ChannelList = require('../../model/Channel/ChannelList')
const PlayLists = require('../../model/Channel/PlayLists')
const ChannelImg = require('../../model/Channel/Channel_Img')
const Search = require('../../model/Search/Search')


const HistoryVideo = require('../../model/Channel/Library/HistoryVideo')
const LikedVideo = require('../../model/Channel/Library/LikedVideos')
const LibraryPlayLists = require('../../model/Channel/Library/PlayLists')
const WatchLater = require('../../model/Channel/Library/WatchLater')


const {
    User
} = require('../../model/userSchema')


router.post('/createChannel', async (req,res)=>{
    const {id,name}  = req.body;
    try {
        const channel = new Channels({name,joinDate : new Date()})
        await channel.save();

        const search = new Search({
            id : channel._id,
            title : name,
            user_id : id,
            tag : 'channel'
        })

        await search.save();

        const list = await ChannelList.findOne({id : id});
        const rs = await list.addChannel(channel._id);
        const playList = new PlayLists({id : channel._id})
        await playList.save();
        const channelImg  = new ChannelImg({id : channel._id})
        await channelImg.save();

        const historyVideo = new HistoryVideo({id : channel._id})
        await historyVideo.save();

        const likedVideo = new LikedVideo({id : channel._id})
        await likedVideo.save();

        const libraryPlayLists = new LibraryPlayLists({id : channel._id})
        await libraryPlayLists.save();

        const watchLater = new WatchLater({id : channel._id})
        await watchLater.save();

        res.status(200).send(channel)

    } catch (error) {
        res.status(400).send({
            message : 'channel not added'
        })
    }
})

router.get('/getChannel/:id', async(req,res)=>{
    try {
        const channel = await Channels.findOne({_id : req.params['id']});
        res.status(200).send(channel)
    } catch (error) {
        res.status(400).send({
            message : 'Channel not found'
        })
    }
})

router.get('/setActiveChannel/:user_id/:id', async(req,res)=>{
    try {
        // res.status(200).send({
        //     message : 'channel change'
        // })
        const user = await User.findOne({_id : req.params['user_id'] })
        const rs = await user.addActiveChannel(req.params['id']);
        
        res.status(200).send({
            message : 'channel changed'
        })


    } catch (error) {
        res.status(400).send({
            message : 'channel not change'
        })
    }
})


router.get('/channelLists/:id', async(req,res)=>{
    try {
        var id = req.params['id']
        const channelList = await ChannelList.findOne({id : id});
        var list = await channelList.getList();
        const data = await Channels.find({
            '_id': { $in: list}
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'not found'
        })
    }
})


router.get('/deleteChannel/:user_id/:channel_id', async(req,res)=>{
    try {
        var deleteChannel = await Channels.deleteOne({_id : req.params['channel_id']})
        var deleteChannel = await ChannelImg.deleteOne({id : req.params['channel_id']})
        var deleteChannel = await PlayLists.deleteOne({id : req.params['channel_id']})
        const search = await Search.deleteOne({id : req.params['channel_id']})

        const channel = await ChannelList.findOne({id : req.params['user_id']})
        const rs = await channel.deleteChannel(req.params['channel_id']);


        res.status(200).send({
            message : 'channel deleted'
        })

    } catch (error) {
        
        res.status(200).send({
            message : 'channel not deleted'
        })
    }
})

module.exports = router