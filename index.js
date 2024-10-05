const express = require("express");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
    const dbURI = process.env.DATABASE_URL;
    await mongoose.connect(dbURI);
    app.listen(3000);
    console.log("Listening on port 3000");
}

main()