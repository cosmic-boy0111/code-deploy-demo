const mongoose = require('mongoose')

const problemSolution = new mongoose.Schema({
    id : {
        type : String,
        default : ''
    },
    problems : [
        {
            _id : {
                type : String,
            },
            problem : {
                type : Object
            },
            solution : {
                C : {
                    type : String,
                    default : '',
                },
                Cpp : {
                    type : String,
                    default : '',
                },
                Java : {
                    type : String,
                    default : '',
                },
                Python : {
                    type : String,
                    default : ''
                }
            }
        }
    ]
})


problemSolution.methods.setProblem = async function(problem,solution,lang) {
    try {

         
        console.log(problem,solution,lang);
        var found =  this.problems.findIndex((element) => 
            element._id === problem._id
        );

        console.log(found);

        if(found !== -1){
            this.problems[found] = {
                _id : problem._id,
                problem : problem,
                solution : {
                    ...this.problems[found].solution,
                    [lang] : solution
                }
            }
            this.save();

            return this.problems[found];
        }else{
            this.problems = this.problems.concat({
                _id : problem._id,
                problem : problem,
                solution : {
                    [lang] : solution
                }
            })
            await this.save();

            return this.problems[this.problems.length-1]
        }
    } catch (err) {
        console.log(err);
    }
}

problemSolution.methods.getProblem = async function(problem_id,lang){
    var found =  this.problems.findIndex((element) => 
        element._id === problem_id
    );

    if(found !== -1){
        return { solution : this.problems[found].solution[lang]};
    }else{
        return {solution : ''}
    }
}

problemSolution.methods.getUserProblem = async function(){
    try {
        return this.problems;
    } catch (error) {
        console.log(error);
    }
}

const ProblemSolution = mongoose.model('PROBLEM SOLUTION',problemSolution)

module.exports = ProblemSolution