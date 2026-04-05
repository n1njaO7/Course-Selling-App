const express = require("express");
const app = express();
exports.app = app;
const jwt = require("jsonwebtoken");
const {auth , JWT_SECRET} = require("./auth")
const {UserModel, TodoModel} = require("./db");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const {z} = require("zod");

mongoose.connect("mongodb+srv://n1nja:n1njaQwertyuiop7@cluster0.wez9r.mongodb.net/todo-with-zod-dcrypt");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    
        const requireBody = z.object({
            email : z.string().min(3).max(50).email(),
            name : z.string().min(3).max(50),
            password : z.string().min(3).max(30)
        });

        const parsedData = requireBody.safeParse(req.body)
 
        if(!parsedData.success){
            res.json({
                message : "Incorrect format",
                error : parsedData.error.errors
            })
            return
        }
        try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // or we can also assign through
        // const { name, email, password } = parsedData.data;

        const hasedpass = await bcrypt.hash(password,5);

        await UserModel.create({
            name,
            email,
            password: hasedpass
        });
        
        res.json({
            message :"You are signed up"
        })
    }catch(e){
        res.json({
            message: "error while signing up"
        })
    }


})

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await  UserModel.findOne({
        email
    });

    const passwordMatch = await bcrypt.compare(password,user.password);


    if(user && passwordMatch){
        const token = jwt.sign({
            userId : user._id.toString()
        },JWT_SECRET);

        res.json({
            token
        });
    }
    else{
        res.status(403).json({
            message: " Wrong cradencials "
        })
    }
})

app.post("/todo",auth ,async(req,res)=>{
   const title = req.body.title;
   const done = req.body.done;
   const userId = req.userId;

    await TodoModel.create({
        userId,
        title,
        done
    });
    res.json({
        message:"Todo Created"
    })
    
})

app.get("/todos",auth ,async(req,res)=>{
    const userId = req.userId;
    const todos =await TodoModel.find({
        userId
    })
    
    if(todos){
        res.json({
            todos
        });
    }
    else{
        res.json({
            message : "No Todo is found"
        });
    }
})

app.listen(3000);