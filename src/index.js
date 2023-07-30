const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {connectDB} = require("./db");
const app = express();
connectDB();

app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routers/auth.routes"));
app.use("/task", require("./routers/task.routes"));

app.listen(3000);
console.log("Server on port", 3000);
