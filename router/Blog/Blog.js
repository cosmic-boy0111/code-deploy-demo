const express = require('express')

const router = express.Router();

const Blog = require('../../model/Blog/Blog')
const Search = require('../../model/Search/Search')
const BlogFiles = require('../../model/Blog/BlogFiles')




const fs = require("fs");
var path = require("path");

let multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4')
const DIR = './blog/';
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



router.post('/createBlog',async(req,res)=>{
    const {
        headerTitle,
        // file ,
        description ,
        userId ,
        likeCount 
    } = req.body
    try {
        const data = new Blog({
            headerTitle,
            // file ,
            description ,
            userId ,
            likeCount 
        })
        await data.save();

        const search = new Search({
            id : data._id,
            title : headerTitle,
            tag : 'blog',
            user_id : userId
        })

        await search.save();
        
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'channel not created'
        })
    }
})



router.post('/addBlogFile/:id', upload.single('file') ,  async (req,res)=>{
    try {
        // const {id,img} = req.body;
        const url = req.protocol + '://' + req.get('host')
        let file = url + '/blog/' + req.file.filename

        const data = new BlogFiles({
            id : req.params['id'],
            file : file
        })

        await data.save();

        res.status(200).send(data);
       
    } catch (error) {
        console.log(error);
    }
})


router.get('/getBlogFile/:id',async(req,res)=>{
    try {
        const file = await BlogFiles.findOne({id : req.params['id']});
        if(!file) {
            res.status(200).send({
                file : ''
            })
        }else{
            res.status(200).send({
                file : file.file
            })
        }
    } catch (error) {
        res.status(400)
    }
})



router.get('/getBlogs',async(req,res)=>{
    try {
        const data = await Blog.find();
        if(data){
            res.status(200).send(data)
        }else{
            res.send([])
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/getBlog/:id',async(req,res)=>{
    try {
        const data = await Blog.findOne({_id:req.params['id']});
        if(data){
            res.status(200).send(data)
        }else{
            res.send({})
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/userBlogs/:id', async(req,res)=>{
    try {
        const data = await Blog.find({userId:req.params['id']});
        if(data){
            res.status(200).send(data)
        }else{
            res.send([])
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.get('/deleteBlog/:id', async(req,res)=>{
    try {
        const data = await Blog.deleteOne({_id:req.params['id']});
        const search = await Search.deleteOne({id : req.params['id']})
        const blog = await BlogFiles.findOne({id : req.params['id']})
        const temp = await BlogFiles.deleteOne({id : req.params['id']})

        if(blog.file !== ""){
            let p = "../server/blog/" + blog.file.split("/")[4];
            var absolutePath = path.resolve(p);
            console.log(absolutePath);
            fs.unlink(absolutePath, function (err) {
                if (err) {
                console.error(err);
                } else {
                console.log("File removed:", path);
                }
            });
        }

        res.status(200).send({
            message : 'delete'
        })
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.post('/updateBlog', async(req,res)=>{
    const {id,headerTitle, file, description } = req.body;
    try {
        const data = await Blog.updateOne({_id:id},{
            $set : {
                headerTitle : headerTitle,
                description : description
            }
        });

        const search = await Search.updateOne({id:id},{
            $set : {
                title : headerTitle
            }
        })

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
} )



router.post('/updateBlogFile/:id', upload.single('file') ,  async (req,res)=>{
    try {
        // const {id,img} = req.body;
        const url = req.protocol + '://' + req.get('host')
        let file = url + '/blog/' + req.file.filename

        const user = await BlogFiles.findOne({id : req.params['id']})

        if(user.file !== ""){
            let p = "../server/blog/" + user.file.split("/")[4];
            var absolutePath = path.resolve(p);
            console.log(absolutePath);
            fs.unlink(absolutePath, function (err) {
                if (err) {
                console.error(err);
                } else {
                console.log("File removed:", path);
                }
            });
        }

        const data = await BlogFiles.updateOne({id: req.params['id']},{
            $set : {
                file : file
            }
        });
        await data.save();

        res.status(200).send(data);
       
    } catch (error) {
        console.log(error);
    }
})

router.get('/addLike/:id',async(req,res)=>{
    try {
        const blog = await Blog.findOne({_id : req.params['id']})
        const like = await blog.addLike();
        res.status(200).send({
            message : 'like added'
        })
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
})

router.get('/subLike/:id',async(req,res)=>{
    try {
        const blog = await Blog.findOne({_id : req.params['id']})
        const like = await blog.subLike();
        res.status(200).send({
            message : 'like subtracted'
        })
    } catch (error) {
        res.status(400).send({'message' : 'not updated'})
    }
})


module.exports = router;