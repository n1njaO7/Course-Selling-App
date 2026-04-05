const express = require("express");
const app = express();

//get = request method
// res = response send to server & req = request which contains body
app.get('/',(req,res)=>{
    res.send("<b>Hi there</b>")
})

//app.listen(3000); // port - 3000
// the method listen will run infinite and will hit 3000 port by someone until it got terminated by ctrl + c
// the server is basically created on localhost-domain name or ip - 127.0.0.1
// Can visit the https sever by - 127.0.0.1:3000 or localhost:3000


// for closing server use ctrl + c or 

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

server.close((err) => {
    if (err) {
        console.error("Error while closing server:", err);
        process.exit(1); // Exit with an error code
    } else {
        console.log("Server closed gracefully.");
        process.exit(0); // Exit successfully
    }
});