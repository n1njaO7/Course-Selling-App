const express = require ("express");
const app = express();
function sum(num){
    let ans= 0
    for(let i=0;i<=num;i++){
        ans += i 
    }
    return ans;
}

app.get("/",(req,res)=>{
    const n = req.query.n;
    const ans =sum(n)
    res.send("Hi your Ans is : "+ ans.toString())
})

app.listen(3000);
   