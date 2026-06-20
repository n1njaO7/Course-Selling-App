const jwt = require("jsonwebtoken");
require("dotenv").config();

function userMiddleware(req, res, next) {

    const token = req.cookies.userToken;

    if (!token) {
        return res.status(403).json({
            message: "Token missing"
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_USER_PASSWORD
        );

        req.userId = decoded.id;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "You are not signed in"
        });

    }
}

module.exports = {
    userMiddleware
};