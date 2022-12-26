const express = require('express')

const router = express.Router();

const Videos = require('../../model/Channel/Videos')
const PlayList = require('../../model/Channel/Play_list');
const VideoUrl = require('../../model/Channel/VideoUrl')
const Search = require('../../model/Search/Search')
const VideoWatch = require('../../model/Channel/VideoWatch')
const Thumbnails = require('../../model/Channel/Thumbnails')
const { route } = require('./Channel');



const fs = require("fs");
var path = require("path");

let multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4')
const DIR = './videos/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            cb(null, true);
        // } else {
        //     cb(null, false);
        //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        // }
    }
});



router.post('/createVideo', async(req,res)=>{
    const {
        channel_id,
        playlist_id,
        userId,
        headerTitle,
        description,
        langType,
    } = req.body;

    try {
        const video = new Videos({
            channel_id,
            playlist_id,
            userId,
            headerTitle,
            description,
            langType,
            createAt : new Date()
        })

        await video.save();

        const videoView = new VideoWatch({id : video._id});
        await videoView.save();
        
        const search = new Search({
            id : video._id,
            title : headerTitle,
            user_id : userId,
            tag : 'video'
        })
        await search.save();

        // const videoUrl = new VideoUrl({id : video._id,url : file})
        // await videoUrl.save();
        // if(playlist_id !== ''){
        //     const playlist = await PlayList.findOne({_id : playlist_id})
        //     const add = await playlist.addVideo(video._id)
        // }

        res.status(200).send(video)

    } catch (error) {
        res.status(400).send({
            message : 'video not added'
        })
    }
})



router.post('/addVideoFile/:id/:playlist_id', upload.single('file') ,  async (req,res)=>{
    try {
        // const {id,img} = req.body;
        const url = req.protocol + '://' + req.get('host')
        let file = url + '/videos/' + req.file.filename

        const data = new VideoUrl({
            id : req.params['id'],
            file : file
        })

        await data.save();

        if(req.params['playlist_id'] !== '-1'){
            const playlist = await PlayList.findOne({_id : req.params['playlist_id']})
            const add = await playlist.addVideo(req.params['id'])
        }

        res.status(200).send(data);
       
    } catch (error) {
        console.log(error);
    }
})

router.post('/addThumbnailsFile/:id', upload.single('file') ,  async (req,res)=>{
    try {
        // const {id,img} = req.body;
        const url = req.protocol + '://' + req.get('host')
        let file = url + '/videos/' + req.file.filename

        const data = new Thumbnails({
            id : req.params['id'],
            file : file
        })

        await data.save();


        res.status(200).send(data);
       
    } catch (error) {
        console.log(error);
    }
})



router.get('/getVideoById/:id', async(req,res)=>{
    try {
        const data = await Videos.findOne({_id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'video not found'
        })
    }
})

router.get('/getVideosByField/:field', async(req,res)=>{
    try {
        const data = await Videos.find({field : req.params['field']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        })
    }
})

router.get('/getVideosByLang/:lang', async(req,res)=>{
    try {
        const data = await Videos.find({langType : req.params['lang']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        })
    }
})

router.get('/getVideosByChannel/:id',async(req,res)=>{
    try {
        const data = await Videos.find({channel_id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        }) 
    }
})

module.exports = router
