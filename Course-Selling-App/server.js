require("dotenv").config();

const app = require("./src/app");
const { connectDB } = require("./src/db");

connectDB();
app.listen(process.env.PORT, () => {
    console.log("Server Running on Port 3000");
});