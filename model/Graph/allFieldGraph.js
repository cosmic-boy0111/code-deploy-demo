const mongoose = require('mongoose');

const allFieldGraph = new mongoose.Schema({
    title : {
        type : String,
        default : 'allFieldGraph'
    },
    data : {
        type : Array,
        default : [0,0,0,0,0]
    }
})

allFieldGraph.methods.incCount = async function(idx,ar){
    try {
        ar = ar[idx] + 1;
        this.data = ar;
        this.save();
        return this.data;
    } catch (error) {
        console.log(error);
    }
}

allFieldGraph.methods.decCount = async function(idx){
    try {
        this.data[parseInt(idx)] - 1;
        this.save();
        return this.data;
    } catch (error) {
        console.log(error);
    }
}

const AllFieldGraph  = mongoose.model('allfieldgraph',allFieldGraph);

module.exports = AllFieldGraph
