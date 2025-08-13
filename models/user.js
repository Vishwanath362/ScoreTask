const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:6,

    },
    totalSubmissions:{
        type:Number,
        default:0,
    },
    totalScore:{
        type:Number,
        default:0
    },
    prize:{
        type:Number,
        default:-1,
    }
});

const User = mongoose.model("User",userSchema);
module.exports =  User;