const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
require("dotenv").config()

const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { taskRouter } = require('./routes/task.routes');
app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Welcome");
})
app.use("/user",userRouter)
app.use("/tasks", taskRouter)
//https://task-management-backend-3gib.onrender.com
app.listen(process.env.port||4000,async()=>{
    try{
        await connection
    console.log('Connected to DB!');

    }
    catch(err){
console.log("Unable to connect to DB",err.message);
    }
})