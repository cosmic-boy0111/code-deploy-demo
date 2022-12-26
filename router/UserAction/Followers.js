const express = require('express')

const router = express.Router();

const Followers = require('../../model/UserAction/Followers')
const UserList = require('../../model/Users/userList')
const UserFollowFollowersCount = require('../../model/UserAction/FollowCount')


router.post('/addFollower', async (req,res) =>{
    const { id, _id} = req.body;
    try {
        const user = await Followers.findOne({id:id});
        const add = await user.addFollower(_id)

        const followerUser = await UserFollowFollowersCount.findOne({id : id})
        const addFollower = await followerUser.addFollower();

        const followingUser = await UserFollowFollowersCount.findOne({id : _id});
        const addFollowing = await followingUser.addFollowing();

        res.status(200).send({
            message : 'follower added'
        })
    } catch (error) {
       res.status(400).send(error)
    }
})

router.post('/deleteFollower', async (req,res)=>{
    const {id,_id} = req.body;
    try {
        const user = await Followers.findOne({id:id});
        const getRes = await user.deleteFollower(_id);

        
        const followerUser = await UserFollowFollowersCount.findOne({id : id})
        const addFollower = await followerUser.subFollower();

        const followingUser = await UserFollowFollowersCount.findOne({id : _id});
        const addFollowing = await followingUser.subFollowing();


        res.status(200).send({
            message : 'deleted'
        })
    } catch (error) {
        res.status(400).send({
            message : 'deleted error'
        })
    }
})

router.get('/getFollowers/:id', async (req,res)=>{
    try {

        const user = await Followers.findOne({id:req.params['id']});
        if(user){
            const resList = await user.getFollowList();
            const data = await UserList.find({
                'id': { $in: resList}
            })

            res.status(200).send(data);
        }else{
            res.status(200).send([])
        }

    } catch (error) {
        res.status(400).send();
    }
})

router.get('/getFollowersId/:id', async (req,res)=>{
    try {

        const user = await Followers.findOne({id:req.params['id']});
        if(user){
            const resList = await user.getFollowList();
        
            res.status(200).send(resList);
        }else{
            res.status(200).send([])
        }

    } catch (error) {
        res.status(400).send();
    }
})

module.exports = router