const express = require ("express");
const app = express();

function callMethodMW(req,res,next){
    const currentDate = new Date().toISOString()
    console.log(`[${currentDate}] ${req.method} request to ${req.url}`)
    res.send(`[${currentDate}] ${req.method} `)
    next();
}
app.use(callMethodMW)

app.get('/',(req,res)=>{
    res.json({
        msg:"hello everyone"
    })
})
app.listen(3000);