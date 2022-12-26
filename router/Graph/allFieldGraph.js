const express = require('express')

const router = express.Router();

const AllFieldGraph = require('../../model/Graph/allFieldGraph')

router.get('/incAllFieldGraph/:idx/:ar',async(req,res)=>{
    try {
        const grp = await AllFieldGraph.findOne({title : 'allFieldGraph'});
        const rs = await grp.incCount(req.params['idx'],req.params['ar']);
        res.status(200).send({
            message : 'count inc'
        })
    } catch (error) {
        res.status(400).send({
            message : 'count not inc'
        })
    }
})

router.get('/decAllFieldGraph/:idx',async(req,res)=>{
    try {
        const grp = await AllFieldGraph.findOne({title : 'allFieldGraph'});
        const rs = await grp.decCount(req.params['idx']);
        res.status(200).send({
            message : 'count dec'
        })
    } catch (error) {
        res.status(400).send({
            message : 'count not dec'
        })
    }
})

router.get('/getAllFieldGraph',async(req,res)=>{
    try {
        const grp = await AllFieldGraph.findOne({title : 'allFieldGraph'});
        res.status(200).send(grp);
    } catch (error) {
        res.status(400).send({
            message : 'data not found'
        })
    }
})

module.exports = router