require("dotenv").config();
require('./config/prisma')
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", require("./routes/index"));
app.use("/auth", require("./routes/user"));

app.listen(process.env.PORT, (err) => {
  err
    ? console.log("Server Error")
    : console.log(`Server Started  On ${process.env.PORT}`);
});
