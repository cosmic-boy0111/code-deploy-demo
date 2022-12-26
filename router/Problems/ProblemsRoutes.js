const express = require('express')

const router = express.Router()

const cppProblems = require('../../model/Problems/Problems')
var rimraf = require("rimraf");

const Search = require('../../model/Search/Search')

// var rimraf = require("rimraf");
// rimraf("./server/temp", function () { console.log("done"); });



var compiler = require('compilex');
compiler.flush(function(){
    console.log('All temporary files flushed !'); 
});
var options = {stats : true}; //prints stats on console 
compiler.init(options);



router.post('/addProblem', async (req,res)=>{
    const { title,description,mainTag,subTags,difficulty,testCases,owner } = req.body;

    try {
        const data = new cppProblems({ title,description,mainTag,subTags,difficulty,testCases,owner });
        await data.save();

        const search = new Search({
            id : data._id,
            title : title,
            tag : 'problem'
        })
        await search.save();

        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: 'problem not added' })
        console.log(error);
    }

})

router.get('/getProblems',async(req,res)=>{
    try {
        const data = await cppProblems.find();
        if(data){
            res.status(200).send(data)
        }else{
            res.send([])
        }
    } catch (error) {
        res.status(400).send({'message' : 'data not found'})
    }
})

router.post('/deleteProblem/:id',async(req,res)=>{
    try {
        console.log(req.params['id']);
        const problem = await cppProblems.deleteOne({'_id' : req.params['id'] })

        const search = await Search.deleteOne({id : req.params['id']});
        // res.save();
        res.status(200).send({'message' : problem})
    } catch (error) {
        res.status(400).send({'message' : 'not deleted'})
    }
})

router.get('/getProblemById/:id',async(req,res)=>{
    try {
        console.log(req.params['id']);
        const problem = await cppProblems.findOne({'_id' : req.params['id'] })
        // res.save();
        res.status(200).send(problem)
    } catch (error) {
        res.status(400).send({'message' : 'not find'})
    }
})


router.post('/updateProblem', async (req,res)=>{
    const {id,title,description,mainTag,subTags,difficulty,testCases } = req.body;

    try {
        
        var problem = await cppProblems.updateOne({_id:id},{
            $set : {
                title : title,
                description : description,
                mainTag : mainTag,
                subTags : subTags,
                difficulty : difficulty,
                testCases : testCases
            }
        });

        const search = await Search.updateOne({id : id},{
            $set : {
                title : title
            }
        })

        var problemGet = await cppProblems.findOne({_id:id})

        console.log(problem);

        res.status(200).json(problemGet)
    } catch (error) {
        res.status(400).json({ message: 'problem not added' })
        console.log(error);
    }

})


router.get('/deleteTemp',(req,res)=>{
    compiler.flush(function(){
        console.log('All temporary files flushed !'); 
    });

    res.send({message : 'temp deleted'})
})


router.post('/execute',(req,res)=>{
    const { lang , input , code } = req.body; 
    
    try {

        // compiler.flush(function(){
        //     console.log('All temporary files flushed !'); 
        // });
        
        if(lang === 'C' || lang === 'Cpp'){
            var envData = { OS : "windows" , cmd : "g++", options : {timeout : 10000}}; 
            if(input === ''){
                
                compiler.compileCPP(envData , code  , function (data) {
                    console.log(data);
                    res.send(data)
                });
                // compiler.flush(function(){
                //     console.log('All temporary files flushed !'); 
                // });
                
            }else{
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    
                    res.send(data)
                    
                });
                // compiler.flush(function(){
                //     console.log('All temporary files flushed !'); 
                // });
            }
            
            
        }
        else if(lang === 'Python'){
            var envData = { OS : "windows"}; 
            if(input === ''){
                compiler.compilePython( envData , code , function(data){
                    res.send(data);
                }); 
                // compiler.flush(function(){
                //     console.log('All temporary files flushed !'); 
                // });
            }else{
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    res.send(data);      
                });
                // compiler.flush(function(){
                //     console.log('All temporary files flushed !'); 
                // });  
            }
            
            
        }
        else if(lang === 'Java'){
            //  compiler.flush(function(){
            //         console.log('All temporary files flushed !'); 
            //     });
            var envData = { OS : "windows" , options : {timeout : 10000}}; 
            // compiler.init(options);
            if(input === ''){
                compiler.compileJava( envData , code , function(data){
                    res.send(data)
                });  
                // compiler.flush(function(){
                //     console.log('All temporary files flushed !'); 
                // });
            }else{
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    res.send(data)
                    
                    
                });
               
            }
        }
    } catch (error) {
        console.log(error);
        compiler.flush(function(){
            console.log('All temporary files flushed !'); 
        });
        res.send({
            error : error
        })
    } 



    

})


module.exports = router