const express = require("express");
const path = require("path");
const app = express();
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let canvas = {};
let connectedUsers = {};

io.on("connection", (socket) => {
  // on connection load existing users
  socket.on("load-InitialUsers", () => {
    socket.emit("receive-InitialUsers", connectedUsers);
  });

  // on connection load existing canvas
  socket.on("load-InitialCanvas", () => {
    socket.emit("receive-InitialCanvas", canvas);
  });

  // register when a user Joins the session
  socket.on("user-Connected", (user) => {
    connectedUsers[`${socket.id}`] = user;
  });

  // delete the user when disconnecting
  socket.on("disconnect", () => {
    delete connectedUsers[`${socket.id}`];
    io.emit("user-disconnected", connectedUsers);
  });

  // when a user fills a pixel, broadcast action
  socket.on("send-fillPixel", (arg) => {
    const { x, y, color } = arg;
    canvas[`${x}-${y}`] = { x, y, color };
    socket.broadcast.emit("receive-fillPixel", x, y, color);
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {});
