const express = require("express");
const path = require("path");
const app = express();
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const fs = require("fs");
const canvasFilePath = path.join(__dirname, "data", "canvas.json");

type Canvas = {
  [key: string]: {
    x: number;
    y: number;
    color: string;
  };
};
type User = {
  name: string;
  color: string;
};
type ConnectedUsers = Record<string, User>;

const dataDir = path.join(__dirname, "data");

// create the data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// load canvas data on server startup
const loadCanvasDataFromFile = () => {
  try {
    const canvasData = fs.readFileSync(canvasFilePath, "utf-8");
    return JSON.parse(canvasData);
  } catch (err) {
    console.error("Error loading canvas data:", err);
    return {};
  }
};

let canvas: Canvas = loadCanvasDataFromFile();
let connectedUsers: ConnectedUsers = {};

io.on("connection", (socket: any) => {
  // on connection load existing users
  socket.on("load-InitialUsers", () => {
    socket.emit("receive-InitialUsers", connectedUsers);
  });

  // on connection load existing canvas
  socket.on("load-InitialCanvas", () => {
    socket.emit("receive-InitialCanvas", canvas);
  });

  // register when a user Joins the session
  socket.on("user-Connected", (user: User) => {
    connectedUsers[`${socket.id}`] = user;
  });

  // delete the user when disconnecting
  socket.on("disconnect", () => {
    delete connectedUsers[`${socket.id}`];
    io.emit("user-disconnected", connectedUsers);
  });

  // update canvas for all when changes are made
  socket.on("send-updateCanvas", (currentStroke: Canvas) => {
    Object.values(currentStroke).forEach((pixel) => {
      canvas[`${pixel.x}-${pixel.y}`] = {
        x: pixel.x,
        y: pixel.y,
        color: pixel.color,
      };
    });

    // save the updated canvas data to a JSON file
    fs.writeFileSync(canvasFilePath, JSON.stringify(canvas));

    // send back updated canvas to all listeners
    socket.broadcast.emit("receive-updateCanvas", canvas);
  });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req: any, res: { send: (arg0: string) => any }) {
  return res.send("pong");
});

app.get("/", function (_req: any, res: { sendFile: (arg0: any) => void }) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {});
