const express = require('express')

const router = express.Router();
const UserList = require('../../model/Users/userList')

router.get('/usersList',async(req,res)=>{
    try {
        const data = await UserList.find();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({
            message : 'error'
        })
    }
})

router.get('/getListUser/:id', async(req,res)=>{
    try {
        const data = await UserList.findOne({id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'error'
        })
    }
})

module.exports = router