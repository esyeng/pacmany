/**********************
 *
 * SERVER GLOBAL VARS
 */
const path = require("path");
const PORT = 8080;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rooms = {};
let userName = "";
let users = [];

module.exports = app;

/**********************************************
 * EXPRESS ROUTER
 */
// Logging middleware
app.use(morgan("dev"));

// Serving static files
app.use(express.static("public"));
app.use(express.static("dist"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/", require("./socket/index"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

/****************************
 *
 * SOCKET HUB
 * testingtestingggg
 *
 */
class Room {
  constructor(roomKey) {
    this.key = roomKey;
    this.playerCount = 0;
    this.sockets = [];
    this.players = {};
    this.started = false;
  }
}

function joinUser(socketId, roomKey, userName) {
  const room = rooms[roomKey];
  const user = {
    socketId,
    userName,
    roomName,
  };
  users.push(user);
  console.log(room.players);
  room.players.push(user);
  console.log(`Look at this fuckin user ==> ${user}`);
  return user;
}

// function removeUser(id) {
//   const getID = users.socketID === id;
//   const index = user.findIndex(getID);
//   if (index !== -1) {
//     return user.splice(index, 1)[0];
//   }
// }
// ;

const joinRoom = (socket, key, playerName) => {
  console.log(`room is: ${key}`);
  // if (!room.playerCount > 4) {
  joinUser(socket.id, key, playerName);
  socket.emit("newPlayers", room.players);
  // } else {
  //   alert("room full");
  // }
};

server.listen(PORT, async () => {
  try {
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

io.on("connection", function (socket) {
  console.log("a new client has connected", socket.id);

  socket.on("createRoom", function (roomKey, name) {
    console.log("I heard you're trying to make a room");
    room = new Room(roomKey);
    rooms[room] = room;
    joinRoom(socket, room.key, name);
  });

  socket.on("joinRoom", function (roomKey, name) {
    const room = rooms[roomKey];
    if (room) {
      console.log(`player ${name} joining room ${roomKey}`);
      joinRoom(socket, room.key, name);
    } else {
      console.log(`Room ${roomKey} not found`);
      socket.emit("wrongRoom", roomKey);
    }
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
    io.emit("disconnect", socket.id);
  });
});
