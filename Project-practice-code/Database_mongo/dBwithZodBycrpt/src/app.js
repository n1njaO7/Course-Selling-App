const express = require ("express");
const app = express();
const {z} = require("zod");
const {UserModel,TodoModel} =  require("./db");
const { default: mongoose } = require("mongoose");

app.use(express.json())

mongoose.connect("")

app.post("/signup",async (req,res)=>{

    const inputVal = z.object({
        name : z.string().min(3).max(20),
        email : z.string().min(3).max(50).email(),
        password : z.string().min(6).max(30),
    })
    
    const parsedData = inputVal.safeParse(req.body)
    if(!parsedData.success){
        return res.status(400).json({
            message : "wrong input",
            error : parsedData.error
        })
    }
    
    try{
        const {name , email, password} = parsedData.data
        await UserModel.create({
        name : name,
        email: email,
        password : password
        })
        res.status(203).json({
            message: "You sre Signed up"
        })
    }catch(e){
        res.status(403).json({
            meaasge : e
        })
    }

})

app.post("/signup",(req,res)=>{
    
})

app.get("/todo",(req,res)=>{
    
})

app.get("/todos",(req,res)=>{
    
})

module.exports= app;