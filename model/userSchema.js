const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    profession : {
        type : String,
        default : ''
    },
    about : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    cPassword : {
        type : String,
        required : true
    },
    img : {
        type : Object ,
        default : ''
    },
    bgImg : {
        type : String,
        default : ''
    },
    key : {
        type : String,
        required : true
    },
    activeChannel : {
        type : String,
        default : ''
    },
    socialLinks : {
        linkedin : {
            type : String,
            default : ''
        },
        github : {
            type : String,
            default : ''
        },
        twitter : {
            type : String,
            default : ''
        },
        facebook : {
            type : String,
            default : ''
        },
        instagram : {
            type : String,
            default : ''
        },
    },
    
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],

})



userSchema.pre('save', async function (next){
    console.log('i am insider');
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
        this.key = await bcrypt.hash(this.key, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        // this.tokens = this.tokens.concat({token: token});
        this.tokens = [{token: token}];
        await this.save();
        console.log(token);
        return token;
    } catch (err) {
        console.log(err);
    }
}


userSchema.methods.addImg = async function(img){
    try{

        this.img = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

userSchema.methods.addActiveChannel = async function(id){
    try{

        this.activeChannel = id;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}

userSchema.methods.addBgImg = async function(img){
    try{

        this.bgImg = img;
        await this.save();
        return '';
    } catch(err){
        console.log(err);
    }
}




const User = mongoose.model('USER',userSchema);
    
module.exports = {
    User
};
