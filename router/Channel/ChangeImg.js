const express = require('express')

const router = express.Router();


const ChannelImg = require('../../model/Channel/Channel_Img')


router.post('/add_channel_img', async (req,res)=>{
    const {id,img} = req.body;
    try {
        const channel = await ChannelImg.findOne({id : id});
        const rs = await channel.addImg(img);
        res.status(200).send({
            message : 'img added'
        })
    } catch (error) {
        res.status(400).send({
            message : 'img not added'
        })
    }
})

router.get('/getChannelImg/:id', async(req,res)=>{
    try {
        const data = await ChannelImg.findOne({id : req.params['id']});
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({
            message : 'img not found'
        })
    }
})

module.exports = router