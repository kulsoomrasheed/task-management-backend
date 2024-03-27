const express = require('express');
require("dotenv").config()
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { taskRouter } = require('./routes/task.routes');
const app = express();
app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Welcome");
})
app.use("/user",userRouter)
app.use("/tasks", taskRouter)

app.listen(process.env.port||4000,async()=>{
    try{
        await connection
    console.log('Connected to DB!');

    }
    catch(err){
console.log("Unable to connect to DB",err.message);
    }
})