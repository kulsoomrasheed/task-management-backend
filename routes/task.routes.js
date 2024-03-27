const express= require('express')
const { auth } = require('../middlewares/auth.middleware')
const { TaskModel } = require('../model/task.model')
const taskRouter = express.Router()
taskRouter.use(auth)

taskRouter.get("/",async(req,res)=>{

    try {
        const tasks = await TaskModel.find({userID:req.body.userID});
        res.status(200).json({msg:"Success",tasks});
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'An error occurred while fetching tasks' });
      }
})

taskRouter.post("/",async(req,res)=>{
   const userID = req.body.userID;
    const { title ,status,desc} = req.body;
    try{
    const tasks= new TaskModel({  title ,status,desc,userID:userID})
    await tasks.save()
    res.status(200).json({msg:"A new todo has been added",tasks})
    }catch{
        res.status(500).json({msg:"Error saving todo"})

    }
})



    taskRouter.delete("/delete/:id",async(req,res)=>{
        let ID=req.params.id
        let data =await TaskModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
            
                 if((userID_post==userID_req)){
                    await TaskModel.findByIdAndDelete({
                     _id:ID
                })
                res.status(200).send(`task with ${ID} is deleted`)
            }else{
                res.status(404).send("Not authorized")
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    })

    


   
module.exports={
    taskRouter
}