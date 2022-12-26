const express = require('express')

const router = express.Router();

const Search = require('../../model/Search/Search')


router.get('/getSearch', async(req,res)=>{
    try {
        const search = await Search.find();
        res.status(200).send(search)
    } catch (error) {
        res.status(400).send([])
    }
})

module.exports = router