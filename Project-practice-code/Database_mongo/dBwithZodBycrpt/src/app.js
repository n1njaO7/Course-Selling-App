const express = require ("express");
const app = express();
const {z} = require("zod");

app.use(express.json())

app.post("./signup",(req,res)=>{

    const inputVal = z.object({
        name : z.string().min(3).max(20),
        email : z.string().min(3).max(50).email(),
        password : z.string().min(6).max(30),
    })

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;


})

app.post("./signup",(req,res)=>{
    
})

app.get("./todo",(req,res)=>{
    
})

app.get("./todos",(req,res)=>{
    
})

module.exports= app;