const express = require('express')

const router = express.Router()

const ProblemSolution = require('../../model/Problems/ProblemSolution')
const {User} = require('../../model/userSchema')


router.post('/setProblemSolution', async (req,res)=>{
    const {userId,problem,solution,lang } = req.body

    console.log(userId,problem,solution,lang);
    try {
        console.log(userId);
        
        const user = await ProblemSolution.findOne({id : userId});
        if(user){
            console.log('inside if');
            const setRes = await user.setProblem(problem,solution,lang);
            res.send(setRes)
        }else{
            console.log('else');
            const inUser = await User.findOne({_id:userId});
            if(inUser){
                console.log('inside in user');
                const data = new ProblemSolution({id : userId});
                await data.save();
                const setRes = await data.setProblem(problem,solution,lang);
                res.send(setRes)
            }else{
                res.status(400).send({
                    message : 'error'
                })
            }
        }
    } catch (error) {
        res.status(400).send({
            message : 'error'
        })
    }
})

router.post('/getSolution', async (req,res)=>{
    const {id,problem_id,lang} = req.body
    try {
        
        const user = await ProblemSolution.findOne({id : id});
        if(user){
            const setRes = await user.getProblem(problem_id,lang);
            res.status(200).send(setRes)
        }else{
            res.status(400).send({error : "user not found"})
        }

    } catch (error) {
        res.status(400).send({error : "user not found"})
    }
})

router.get('/getUserProblems/:id', async (req,res)=>{
    try {
        const user = await ProblemSolution.findOne({id : req.params['id']});
        if(user){
            const data = await user.getUserProblem();
            res.status(200).send(data)
        }else{
            res.status(200).send([])
        }
    } catch (error) {
        res.status(400).send([])
    }
})


module.exports = router
