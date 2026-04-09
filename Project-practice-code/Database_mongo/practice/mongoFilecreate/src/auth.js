const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdfwuyfgiwgjk35dfa2";

function auth(req,res,next){
    const token = req.headers.token;
    try{
        const user = jwt.verify(token,JWT_SECRET)
        req.userId = user.userId;
        next();
    }catch(e){
        res.json({
            message : "invalid Token"
        })
    }

}

module.exports={
    jwt,
    JWT_SECRET,
    auth
}