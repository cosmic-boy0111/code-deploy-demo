const express = require('express');
const router = express.Router();
const VideoWatch = require('../../model/Channel/VideoWatch')
const {User} = require('../../model/userSchema')

router.get('/addView/:video_id/:user_id',async(req,res)=>{
    try {
        const user = await User.findOne({_id : req.params['user_id']})
        if(user){
            const videoView = await VideoWatch.findOne({id : req.params['video_id']});
            const rs = await videoView.addVideoWatch(req.params['user_id']);
        }
        res.status(200).send({
            message : 'view added'
        })
    } catch (error) {
        res.status(400).send({
            message : 'view not added'
        })
    }
})

router.get('/getView/:video_id',async(req,res)=>{
    try {
        const data = await VideoWatch.findOne({id : req.params['video_id']})
        res.status(200).send({
            videosCount : data.videosCount
        })
    } catch (error) {
        res.status(400).send({
            message : 'no view'
        })
    }
})

module.exports = router