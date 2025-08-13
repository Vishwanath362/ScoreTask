const User = require("../models/user.js");

const signin = async(req,res)=>{

    try{
        const {email,password} = req.body;

    const alreadyUser =await  User.findOne({email});

    if(alreadyUser){
        return res.status(409).json({"success":false,message:"User Already exists with this email!"});
    }
    if(password.length<6){
        return res.status(409).json({"success":false,message:"Password Minimum length is 6"});
    }
    const newUser = new User({
        email,password
    });
    await newUser.save(newUser);
    return res.status(200).json({
        "success":true,
        message:"user registered successfully"
    })
    }
    catch(e){
        console.error("error: ",e);
    }

}

const login = async(req,res)=>{

    try{
        const {email,password} = req.body;

    const alreadyUser =await  User.findOne({email});

    if(alreadyUser){
        
        if(alreadyUser.password===password){
            return res.status(200).json({
                "success":true,
                message:"login successfull"
            })
        }
        else{
            return res.status(404).json({
                "success":false,
                message:"Invalid User Credentials"
            })
        }
    }
    return res.status(409).json({
        "success":false,
        message:"You must register before login"
    })
    }
    catch(e){
        console.error("error: ",e);
    }

}

module.exports = {signin,login
};