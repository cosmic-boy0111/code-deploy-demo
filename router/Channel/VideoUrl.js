const express = require('express')

const router = express.Router();

const VideoUrl = require('../../model/Channel/VideoUrl')
const Thumbnails = require('../../model/Channel/Thumbnails')

router.get('/getVideoFile/:id',async(req,res)=>{
    try {
        const videoFile = await VideoUrl.findOne({id : req.params['id']});
        if(videoFile){
            res.status(200).send({
                file : videoFile.file
            })
        }else{
            res.status(201).send({})
        }
    } catch (error) {
        res.status(400).send({
            message : 'video not found'
        })
    }
})

router.get('/getThumbnailsFile/:id',async(req,res)=>{
    try {
        const videoFile = await Thumbnails.findOne({id : req.params['id']});
        if(videoFile){
            res.status(200).send({
                file : videoFile.file
            })
        }else{
            res.status(201).send({})
        }
    } catch (error) {
        res.status(400).send({
            message : 'video not found'
        })
    }
})

module.exports = router