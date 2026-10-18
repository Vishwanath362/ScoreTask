const express = require("express")
const app = express();
const connectDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const scoreRoutes = require("./routes/scoreRoutes")

connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api",userRoutes);
app.use("/api",scoreRoutes);


    app.listen(8080,()=>{
        console.log("server running on port 8080");
    });
