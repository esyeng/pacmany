const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
let players = [];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

io.on("connection", (socket) => {
  console.log("User joined: " + socket.id);
  players.push(socket.id);
  if (players.length === 1) {
    io.emit("isPlayerA");
  }

  socket.on("createPlayer", () => {
    io.emit("createPlayer");
  });

  socket.on("disconnect", () => {
    console.log("User left: " + socket.id);
    players = players.filter((player) => player !== socket.id);
  });
});

server.listen(8080, () => {
  console.log("bloc party on port 8080");
});
