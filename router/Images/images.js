const express = require('express')


const router = express.Router();

const {Img, BgImg} = require('../../model/Images/images')


router.get('/getImg/:id', async (req,res)=>{
    try {
        const data = await Img.findOne({id : req.params['id']})
        res.status(200).send({
            img : data.img
        })
    } catch (error) {
        res.status(400).send({
            message : 'img not found'
        })
    }
})

router.get('/getBgImg/:id', async (req,res)=>{
    try {
        const data = await BgImg.findOne({id : req.params['id']})
        res.status(200).send({
            bgImg : data.bgImg
        })
    } catch (error) {
        res.status(400).send({
            message : 'img not found'
        })
    }
})


module.exports  = router