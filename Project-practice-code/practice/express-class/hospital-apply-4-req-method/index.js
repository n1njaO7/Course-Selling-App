const express = require("express")
const app = express()

const user =[{
        name : "john",
        kidneys:[{
            healthy : false
        }]
    }]

app.get("/",(req,res)=>{
    
    const johnKidneys = user[0].kidneys
    const numberOfKidneys= johnKidneys.length
    let numberOfHealthyKidneys = johnKidneys.filter(kidney=>kidney.healthy).length
    const numberOfUnhealthyKidneys = numberOfKidneys-numberOfHealthyKidneys
     
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})


// app.post("/",(req,res)=>{
    
// })


// app.put("/",(req,res)=>{
    
// })


// app.delete("/",(req,res)=>{
    
// })

app.listen(3000)