const express = require('express');

const router = express.Router();


const HistoryVideo = require('../../model/Channel/Library/HistoryVideo')
const LikedVideo = require('../../model/Channel/Library/LikedVideos')
const LibraryPlayLists = require('../../model/Channel/Library/PlayLists')
const WatchLater = require('../../model/Channel/Library/WatchLater')

const Videos = require('../../model/Channel/Videos')
const PlayList = require('../../model/Channel/Play_list')


router.get('/addHistoryVideo/:channel_id/:video_id',async(req,res)=>{
    try {
        const channel = await HistoryVideo.findOne({id : req.params['channel_id']})
        const rs = await channel.addHistoryVideo(req.params['video_id'])
        res.status(200).send({
            message : 'video added'
        })
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})

router.get('/getHistoryVideos/:channel_id',async(req,res)=>{
    try {
        const channel = await HistoryVideo.findOne({id : req.params['channel_id']})
        // console.log(channel.videos);
        const data = await Videos.find({
            '_id': { $in: channel.videos}
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})

router.get('/addLikedVideo/:channel_id/:video_id', async(req,res)=>{
    try {
        const channel = await LikedVideo.findOne({id : req.params['channel_id']}) 
        const rs = await channel.addLikedVideo(req.params['video_id'])
        res.status(200).send({
            message : 'video added'
        })
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})

router.get('/removeLikedVideo/:channel_id/:video_id', async(req,res)=>{
    try {
        const channel = await LikedVideo.findOne({id : req.params['channel_id']}) 
        const rs = await channel.removeLikedVideo(req.params['video_id'])
        res.status(200).send({
            message : 'video remove'
        })
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})

router.get('/getVideoLikeList/:channel_id',async(req,res)=>{
    try {
        const channel = await LikedVideo.findOne({id : req.params['channel_id']}) 
        res.status(200).send(channel);
    
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})


router.get('/getLibraryLikedVideos/:channel_id',async(req,res)=>{
    try {
        const channel = await LikedVideo.findOne({id : req.params['channel_id']})
        // console.log(channel.videos);
        const data = await Videos.find({
            '_id': { $in: channel.videos}
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})


router.get('/addLibraryPlaylist/:channel_id/:playlist_id', async(req,res)=>{
    try {
        const channel = await LibraryPlayLists.findOne({id : req.params['channel_id']}) 
        const rs = await channel.addPlaylists(req.params['playlist_id'])
        res.status(200).send({
            message : 'playlist added'
        })
    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})


router.get('/getLibraryPlaylist/:id',async(req,res)=>{
    try {
        const playlists = await LibraryPlayLists.findOne({id : req.params['id']});
        const list = playlists.playlists;
        var Data = []
        
           
        for (let index = 0; index < list.length; index++) {
            var playListImg = ''
            var playlist = await PlayList.findOne({_id : list[index]})
            if(playlist.videos.length >= 1){
                const data = await Videos.findOne({_id : playlist.videos[0]});
                playListImg = data.thumbnail;
            }
            Data.push({
                _id : list[index],
                firstVideoId : playlist.videos[0],
                name : playlist.name,
                description : playlist.description,
                videoCount : playlist.videoCount,
                playListImg : playListImg
            })
        }


        res.status(200).send(Data);


    } catch (error) {
        console.log(error);
    }
})




module.exports = router