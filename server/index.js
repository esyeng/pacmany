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
const rooms = {};
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
 *
 * socket.join(room.id, () => {
        room.players[socket.id] = {
          rotation: 0,
          x: 0,
          y: 0,
          name: name,
          playerId: socket.id,
          playerNumber: room.numberOfPlayers,
          score: 0
        };
        x125, y233
x320,  y233
x223, y89
 */

const joinRoom = (socket, room, name) => {
  console.log(`room is active: ${room.started}`);
  if (!room.started) {
    if (!room.playerCount > 4) {
      room.sockets.push(socket);
      room.playerCount++;
      socket.join(room.key, function() {
        room.playerCount === 0 ? room.
        room.players[socket.id] = {
          x: 125,
          y: 233,
          rotation: 0
        }
      })
    }
  }
};

class Room {
  constructor(roomKey) {
    this.key = roomKey;
    this.playerCount = 0;
    this.sockets = [];
    this.players = {};
    this.started = false;
  }
}

server.listen(PORT, async () => {
  try {
    // await client.connect();
    // collection = client.db("pacmany").collection("players");
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
let players = [];

io.on("connection", function (socket) {
  console.log("a new client has connected", socket.id);

  socket.on("createRoom", function (roomKey, name) {
    let room = new Room(roomKey);
    rooms[room] = room;
    joinRoom(socket, room, name);
  });

  socket.on("joinRoom", function (room) {
    console.log(`User number ${socket.id} entered the room ${room}`);
    console.log(players);
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
  });
});
