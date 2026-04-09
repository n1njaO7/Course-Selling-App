const express = require("express")
const app = express();
const {UserModel,TodoModel} = require("./db");
const {jwt , JWT_SECRET} = require("./auth")
app.use(express.json())

app.post("/signup",async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    await UserModel.create({
        email:email,
        name : name,
        password:password
    })
    res.json({
        message: "You are signed up"
    })

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

app.post("/todo",(req,res)=>{
    
})

app.get("/todos",(req,res)=>{
    
})

module.exports=app