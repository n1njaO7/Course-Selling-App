const express = require ("express");
const app = express();

app.use(express.json());

const users=[]

function generateToken(){
    const val = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9,];
    let token = ""
    for(let i = 0;i< 32;i++){
         token += val[Math.floor(Math.random()* val.length)] ;
    }
    return token;
}

//- /signup end point

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username,
        password
    })
    res.statusCode(201).send({
        message : "You have Signed in"
    })
})

// - /signin endpoint

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=>{
        return (u.username===username && u.password===password)
    })
    if(user){
        const token = generateToken();
        users.token= token;
        res.status(202).send({
            token
        })
    }else{
        res.send({
            message:"Invalid Pass"
        })
    }
})


module.exports= app;