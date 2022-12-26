const express = require('express')


const router = express.Router();

const UserFollowFollowersCount = require('../../model/UserAction/FollowCount')

router.get('/usersFollowCount/:id', async (req,res)=>{
    try {
        const data = await UserFollowFollowersCount.findOne({id : req.params['id']})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'error'
        })
    }
})

module.exports = router