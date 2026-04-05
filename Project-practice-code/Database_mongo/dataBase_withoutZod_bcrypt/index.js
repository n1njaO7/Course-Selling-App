const express = require("express");
const app = express();
const jwt =require("jsonwebtoken");
const mongoose=require("mongoose")
const {UserModel,TodoModel} = require( "./db")
const {auth,JWT_SECRET} = require("./auth");

mongoose.connect("mongodb+srv://n1nja:n1njaQwertyuiop7@cluster0.wez9r.mongodb.net/todo-n1nja")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    await UserModel.create({
        name:name,
        email:email,
        password:password
    })

    res.json({
        message: "signed up successfully"
    })
    

    
})

app.post("/signin",async(req,res)=>{
    const email=req.body.email;  
    const password=req.body.password;  

    const response = await UserModel.findOne ({
        email:email,
        password:password
    })
    if(response){
        const token = jwt.sign({
            userId: response._id.toString()
        },JWT_SECRET);
     
        res.json({
            token
        })
    }else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }

})

app.post("/todo",auth,async(req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;
   await TodoModel.create({
    userId,
    title,
    done
    });

    res.json({
        message:"Todo created"
    })

})

app.get("/todos",auth,async(req,res)=>{
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });
    res.json({
        todos
    });
    
});

app.listen(3000);