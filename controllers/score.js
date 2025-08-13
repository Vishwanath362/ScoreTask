const User = require("../models/user.js");

const postScore = async(req,res)=>{

    try{
        const {email,password,profit,loss,time} = req.body;

    const alreadyUser =await  User.findOne({email});
    if(!email || !password || !profit || !loss || !time){
        return res.status(409).json({
                "success":false,
                message:"Insufficient arguments"
        })
    }
    if(alreadyUser){
        if(alreadyUser.password==password){
            if(alreadyUser.totalSubmissions<2){
                const score = (profit * 100) / (loss * time);
                await User.findByIdAndUpdate(alreadyUser._id,{$inc:{totalSubmissions:1,totalScore: score}});
                return res.status(200).json({
                    "success":true,
                    message:"Score Saved Successfully"
                })
            }
            else{
                return res.status(409).json({
                    "success":false,
                    message:"You have reached the score post limit"
                })
            }
        }
        else{
            return res.status(200).json({
                "success":false,
                message:"Invalid User Credentials"
            })
        }
    }
    return res.status(409).json({
        "success":false,
        message:"You must register before posting score"
    })
    }
    catch(e){
        console.error("error: ",e);
    }

}
const getLeaderboardData = async(req,res)=>{
    try{
        const scoreData = await User.find().sort({totalScore:1}).select('email totalScore totalSubmissions prize -_id ');
        return res.status(200).json(scoreData);
    }
    catch(e){
        console.error(e);
        return res.status(404).json("not found");
    }

}

const getTopUsers = async(req,res)=>{
    try{
        const scoreData = await User.find().sort({ totalScore: -1 }).limit(3);

        const updates = scoreData.map((user, index) => 
            User.findByIdAndUpdate(user._id, { prize: index + 1 })
        );
         
        await Promise.all(updates);

        const topUsers = await User.find().sort({ totalScore: -1 }).limit(3).select('email totalScore totalSubmissions prize -_id ');

        return res.status(200).json(topUsers);

    }
    catch(e){
        console.error(e);
        return res.status(404).json("not found");
    }

}
module.exports = {postScore,getLeaderboardData,getTopUsers};