const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./Routes/userRoutes")
const courseRouter = require("./Routes/allCoursesRoutes")
const quizRouter = require("./Routes/quizRoutes")
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3000;

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected 🎉🎉"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded()); // Optional: parse JSON request bodies
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/quiz",quizRouter);
//static file
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
