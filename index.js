const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const studentHandler = require("./routes/studentHandler");
const userHandler = require("./routes/usersHandler");
const port = process.env.PORT || 4000;
const app = express();

// middle ware
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// for the testing purpose get home directory
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log("Server is listening", port);
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("show database error", err);
    } else {
      console.log("data base connected");
    }
  }
);
app.use("/student", studentHandler);
app.use("/student", userHandler);