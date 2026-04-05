const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")

const JWT_SECRET = "HkdnwlofewakjgfawlgBhsmfrwaaIzṁwajbyaJi"

const users =[]

app.use(express.json());

app.post("/signup", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u=> u.username=== username && u.password === password)
    
    if(user){
        res.send({
            message : "User already exits"
        })
    }else {
        users.push({
            username,
            password
        })
    }

})

app.post("/signin", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u=> u.username=== username && u.password === password)
    
    if(user){
        const token = jwt.sign({username},JWT_SECRET)
        res.json({
            token: token
        })
    }else {
        res.json({
            message : "Credentials is incorrect"
        })
        return
    }
      
    
})

app.get("/me",(req,res)=>{

    const token = req.headers.token;

    const decodedData = jwt.verify(token,JWT_SECRET)
    console.log(decodedData)

    const foundUser = users.find(u => u.username=== decodedData.username)

    if(foundUser){
        res.json({
            username : foundUser.username,
            password : foundUser.password
        })
    }
})

app.listen(3000);