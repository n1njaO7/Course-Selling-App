const express = require ("express");
const app = express ();

app.use((req,res,next)=>{
    req.a = parseInt(req.query.a);
    req.b = parseInt(req.query.b);
    next();
//req.a and req.b is used to store value in req so that other routes can use it.
//initially query prameter are in string so to convert into float we used "parseFloat"
})

app.get("/add",(req,res)=>{
    res.json({
        ans:req.a + req.b})
})

app.get("/subtract",(req,res)=>{
    res.json({
        ans:req.a - req.b
    })
})

app.get("/divide",(req,res)=>{
    res.json({
        ans:req.a / req.b
    })
})

app.get("/multiply",(req,res)=>{
    res.json({
        ans:req.a * req.b
    })
})

app.listen(3000)