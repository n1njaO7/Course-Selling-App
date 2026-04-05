const express = require("express");

const app = express();
const cors = require("cors")

function middleWare(req, res, next){
    const ans = {
        method : req.method,
        url : req.url,
        timeStamp : new Date()
    }
    console.log(ans);
    next();
}

app.use(cors());
app.use(express.json());
app.use(middleWare);

app.post("/sum",(req,res,)=>{
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    res.json({
     ans : a + b
    })    
})

app.get("/subtract",  (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a-b
    })
})

app.get("/multiply",(req,res)=>{
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans : a * b
    })
})

app.get("/divide", (req,res)=>{
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans : a / b
    })
})

app.listen(3000);