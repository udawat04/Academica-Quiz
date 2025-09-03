const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/index");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config(); // Load .env

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(morgan("dev"));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // safer parsing
app.use(router);

// static files
app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => res.send("welcome to Express"));

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
