const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
JWT_SECRET = "wjhdgwFDUF276527657!###$@%";
app.use(express.json());

let users=[];

//-signup endpoint

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username,
        password
    })
    
    res.send({
        message : "you have successfuly signed up"
    })
})

//signin endpoint 

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user=> user.username===username && user.password===password);

    if(user){
        const token = jwt.sign({
            username : user.username
        },JWT_SECRET);
        res.header("token",token)
        user.token = token
        res.send({
            message:"you have successfully Loged in",
            token : token
        })
    }else{
        res.status(403).send({
            message: "Wrong credentials"
        })
    }
})

function auth(req,res,next){

    const token = req.headers.token;
    try{
    const  data = jwt.verify(token,JWT_SECRET)
    req.user= data
    next()
    }
    catch(e){
        console.log(e)
        res.status(403).json({
            message: "inavalid user"
        })
    }
}

//-me endpoint

app.get("/me",auth,(req,res)=>{
    const username = req.user.username;
    const user = users.find(user=> user.username===username)
    res.status(200).json({
        username : user.username,
        password : user.password
    })
})

module.exports = app