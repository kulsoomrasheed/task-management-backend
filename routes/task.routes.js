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
   const username=req.body.username
    const { title ,status,desc} = req.body;
    try{
    const tasks= new TaskModel({  title ,desc,userID:userID, username})
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

    

    taskRouter.patch("/edit/:id",async(req,res)=>{
      let ID=req.params.id
      let payload=req.body
      let data =await TaskModel.findOne({_id:ID})
      let userID_post=data.userID
      let userID_req=req.body.userID
      try {
               if((userID_post==userID_req)){
                  await TaskModel.findByIdAndUpdate({
                   _id:ID
              },payload)
              res.send(`data with ${ID} is updated`)
          }else{
              res.send("Not authorized")
          }
          
      } catch (error) {
          res.send(error)
      }
  })

  
    taskRouter.get('/', async (req, res) => {
        const { title } = req.query;
      
        try {
          const posts = await TaskModel.find({ title: { $regex: title, $options: 'i' } });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

      taskRouter.get('/', async (req, res) => {
        const { category } = req.query;
      
        try {
          const posts = await TaskModel.find({
            category: { $regex: category, $options: 'i' },
          });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

      taskRouter.get('/api/blogs', async (req, res) => {
        const { sort, order } = req.query;
      
        try {
          const sortOrder = order === 'asc' ? 1 : -1;
          const posts = await TaskModel.find().sort({ [sort]: sortOrder });
          res.json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred');
        }
      });

module.exports={
    taskRouter
}