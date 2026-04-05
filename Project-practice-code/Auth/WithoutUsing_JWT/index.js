const express = require("express");
const app = express();

app.use(express.json());

const users =[]

function generateToken (){
    const option = ['a', 'b','c','d','e','f','g','h','i','j','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9' ]
    let token = ""
    for(let i =0;i<32;i++){
        token += option[Math.floor(Math.random() *option.length)]
    }
    return token
}

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    users.push({
        username,
        password
    })
    res.send({
        message : "You have signed up"
    })
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=> (u.username===username && u.password=== password))

    if(user){
        res.send({
            token : generateToken()
        })
    }else{
        res.send({
         message: "Invalid username or password"
    })
    }
})

app.listen(3000);