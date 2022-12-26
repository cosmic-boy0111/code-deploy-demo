const express = require('express')

const router = express.Router();

const LikeBlogs = require('../../model/Blog/LikeBlogs')
const Blog = require('../../model/Blog/Blog')

router.post('/addLikeBlog',async(req,res)=>{
    const {userId,blogId} = req.body;
    try {
        const liker = await LikeBlogs.findOne({id : userId});
        const add = await liker.addBlog(blogId);
        res.status(200).send({'message' : 'like blog added'})
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.post('/subLikeBlog',async(req,res)=>{
    const {userId,blogId} = req.body;
    try {
        const liker = await LikeBlogs.findOne({id : userId});
        const add = await liker.subBlog(blogId);
        res.status(200).send({'message' : 'like blog added'})
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/getLikeArray/:id', async(req,res)=>{
    try {
        const liker = await LikeBlogs.findOne({id : req.params['id']});
        const list = await liker.getList();
        res.status(200).send(list);
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/userLikeBlogs/:id', async(req,res)=>{
    try {
        const liker = await LikeBlogs.findOne({id : req.params['id']});
        const list = await liker.getList();

        const data = await Blog.find({
            '_id': { $in: list}
        })

        res.status(200).send(data);

    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})


module.exports = router