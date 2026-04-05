const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "bdwevwueaFUY@25615R3@#&*7"

function auth(req , res , next) {
    const token = req.headers.token;

    const response = jwt.verify(token,JWT_SECRET)

    if(response){
        req.userId = response.userId;
        next();
    }
    else{
        res.json({
            message : "Wrong Credential"
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}