const express = require ("express");
const app = express();
const {z} = require("zod");
const bcrypt = require ("bcrypt")
const {UserModel,TodoModel} =  require("./db");
const { default: mongoose } = require("mongoose");
const { jwt,JWT_SECRET,auth } = require("./auth");

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
        const hassedpass = await bcrypt.hash(password,10)
        await UserModel.create({
        name,
        email,
        password : hassedpass
        })
        res.status(201).json({
            message: "You sre Signed up"
        })
    }catch(e){
        res.status(403).json({
            meaasge : e
        })
    }

})

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message : "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET) 

        res.status(200).json({
            message : "You are Signed in",
            token : token
        })
    }catch(e){
        res.status(500).json({
            message: "internal issue"
        })
    }

})

app.post("/todo",auth,async(req,res)=>{
    try{
        const userId = req.userId;
        const title = req.body.title;
        const done = req.body.done;
        await TodoModel.create({
            userId,
            title,
            done
        })
        res.status(201).json({
            message: "Todo is created"
        })
    }catch(e){
        res.status(404).json({
            message: "Internal server Issue"
        })
    }

})

app.get("/todos",(req,res)=>{
    
})

module.exports= app;