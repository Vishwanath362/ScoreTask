const mongoose = require("mongoose");

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url || "mongodb://127.0.0.1:27017/scoretask");
        console.log("MongoDb connected successfully")
    }
    catch(e){
        console.error("MongoDb Connection Failed",e)
    }
}

module.exports = connectDb;