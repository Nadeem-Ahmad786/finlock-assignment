const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error")

const cors = require("cors");

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(cookieParser());

//Route Imports

const user = require("./routes/userRoute")

app.use("/api/v1/",user);


// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;