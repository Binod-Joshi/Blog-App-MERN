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
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/posts", postRoute);

const server = app.listen(5000, () => {
  console.log("Backend is running.");
});

const io = require("socket.io")(server,{
  pingTimeout:60000,
  cors:{
    // used to prevent cors origin error
    origin:`${process.env.FRONTEND_URL}`
  },
});

io.on("connection", (socket) => {
  console.log("connected to the socket io");

  //connected to user personal socket.
  socket.on("setup",(userData) => {
    socket.join(userData);
    socket.emit("connected")
  });

  // for sending like
  socket.on("new like",(newLike) => {
    if(!newLike.likes) return console.log("newLike.likes is not defined");

    // socket.broadcast.to(userId).emit("like received", newLike,userId);
    io.emit("like received", newLike);
  });

  socket.on("new unlike",(newLike) => {
    if(!newLike.likes) return console.log("newLike.likes is not defined");
    io.emit("unlike received",newLike);
  });

  socket.on("new comment",(comments) => {
    if(!comments) return console.log("no new comments");
    io.emit("comment received",comments);
  });

  socket.on("new deleteComment",(comments) => {
    if(!comments) return console.log("no new comments");
    io.emit("comment delete",comments);
  });

  // to clean off the socket to save bandwidth.
  socket.off("setup",() => {
    console.log("user disconnect");
    socket.leave(userData._id);
  });

});

// Handle Socket.IO errors
io.on("error", (error) => {
  console.error("Socket.IO Error:", error);
});

