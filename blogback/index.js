const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);

app.listen(5000, () => {
  console.log("Backend is running.http://localhost:5000");
});
