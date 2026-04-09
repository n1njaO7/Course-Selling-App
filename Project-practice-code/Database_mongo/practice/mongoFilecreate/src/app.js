const express = require("express")
const app = express();
const {UserModel,TodoModel} = require("./db");

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

app.post("/signin",(req,res)=>{
    
})

app.post("/todo",(req,res)=>{
    
})

app.get("/todos",(req,res)=>{
    
})

module.exports=app