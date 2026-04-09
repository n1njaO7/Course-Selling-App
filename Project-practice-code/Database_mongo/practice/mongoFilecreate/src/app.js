const express = require("express")
const app = express();
const {UserModel,TodoModel} = require("./db");
const {jwt , JWT_SECRET, auth} = require("./auth")
app.use(express.json())

app.post("/signup",async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try{
        await UserModel.create({
            email:email,
            name : name,
            password:password
        })
        res.json({
            message: "You are signed up"
        })
    }catch(e){
        res.json({
            message: "User already exist"
        })
    }
})

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email:email,
        password:password
    })
    
    if(user){
        const token = jwt.sign({
            userId : user._id.toString()
        },JWT_SECRET);

        res.status(200).json({
            message : "You are signed in",
            token : token 
        })
    }
    else{
        res.status(403).json({
            message : "wrong credentials"
        })
    }
})

app.post("/todo",auth,async(req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
    await TodoModel.create({
        userId : userId,
        title : title,
        done : done,
    })
    res.status(203).json({
        message: "todomodel created" 
    })
})

app.get("/todos",auth,async(req,res)=>{
    const userId = req.userId;
    try{
        todos = await UserModel.findOne({
            userId
        })
        res.status(200).json({
            todos
        })
    }
    catch(e){
        res.json({
            message: "userId not found"
        })
    }
})

module.exports=app