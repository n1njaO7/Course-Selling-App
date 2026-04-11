const jwt = require("jsonwebtoken");
const JWT_SECRET = "jhdgwqyfyq23gdub"
function auth (){
    try{
        const token = req.headers.token;
        const user = jwt.verify(token, JWT_SECRET);
        req.userId = user.userId
        next();
    }catch(e){
        res.status(403).json({
            message : "invalid token",
            error: e
        })
    }

}

module.exports={
    jwt,
    JWT_SECRET,
    auth
}