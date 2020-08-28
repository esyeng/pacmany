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

// function joinUser(socketId, userName, roomName) {
//   const user = {
//     socketId,
//     userName,
//     roomName,
//   };
//   users.push(user);
//   return user;
// }

// function removeUser(id) {
//   const getID = users.socketID === id;
//   const index = user.findIndex(getID);
//   if (index !== -1) {
//     return user.splice(index, 1)[0];
//   }
// }
// ;

const joinRoom = (socket, room, name) => {
  console.log(`room is active: ${room.started}`);
  if (!room.started) {
    if (!room.playerCount > 4) {
      room.sockets.push(socket);
      room.playerCount++;
      socket.join(room.key, function () {
        room.players[socket.id] = {
          x: 125,
          y: 233,
          rotation: 0,
          name: name,
          score: 0,
          playerId: socket.id,
          playerNumber: room.playerCount,
        };
        console.log(
          socket.id,
          `Player ${room.players[socket.id].playerNumber} entered the room`,
          room.id
        );
      });
      socket.emit("newPlayers", room.players);
    } else {
      alert("room full");
    }
  } else {
    alert("game in progress");
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
    socket.emit("readyToStart");
  });

  // socket.on("joinRoom", function (roomKey, name) {
  //   const room = rooms[roomKey];
  //   if (room) {
  //     // socket.emit("playerJoin")
  //     joinRoom(socket, room, name);
  //   } else {
  //     console.log(`Room ${roomKey} not found`);
  //     socket.emit("wrongRoom", roomKey);
  //   }
  // });
  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
    io.emit("disconnect", socket.id);
  });
});
