const express = require ("express");
const app = express();

const jwt = require("jsonwebtoken");
const JWT_SECRET = "VYFTR5DVRYESCT45EE54c$%$%^GG";

app.use(express.json());

const users=[];

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=>u.username===username && u.password===password)
    if(user){
        res.status(403).json({
            message : "User already exists"
        })
    }
    else{
        users.push({
            username,
            password
        })
    }


})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=>u.username===username && u.password===password)
    if(user){
       const token = jwt.sign({username},JWT_SECRET)
       res.json({
           token
       })
    }
    else{
       res.json({
           message:"Credentials are incorrect"
       })
    }
    return
})

function auth (req,res,next){
   const token = req.headers.authorization;
   if(token){
   const decodedData = jwt.verify(token,JWT_SECRET)
        if(decodedData.username){
            req.user = decodedData.username
            next()
        }
        else{
            res.json({
                message:"unauthorised"
            })
        }
   
   } else{
    res.json({
        message:"unauthorised"
    })
}
}


app.get("/me",auth,(req,res)=>{
    const user = users.find(u => u.username===req.user)
    if(user){
        res.json({
            username : req.user
        })
    }
    else{
        res.json({
            message:"unauthorised"
        })
    }
})

