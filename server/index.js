/**********************
 *
 * SERVER GLOBAL VARS
 */
const path = require("path");
const PORT = process.env.PORT || 8080;
const express = require("express");
const e = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io").listen(server);

module.exports = app;

let rooms = [];

//rooms class
class Room {
  constructor(roomCode) {
    this.id = roomCode;
    this.numberOfPlayers = 0;
    this.sockets = [];
    this.players = {};
    this.started = false;
    this.gameOver = false;
  }
}

//joinRoom Helper function
const joinRoom = (socket, room, name) => {
  //if the room has not started yet
  console.log("has the room started when joining room?", room.started);
  if (!room.started) {
    //if it's not at capacity (Max 4)
    if (room.numberOfPlayers < 4) {
      //store the socket in a socket array

      room.sockets.push(socket);
      //increase # of players in room by 1
      room.numberOfPlayers += 1;
      socket.join(room.id, () => {
        room.players[socket.id] = {
          id: room.numberOfPlayers - 1,
          x: server.startCoordinates[room.numberOfPlayers - 1][0],
          y: server.startCoordinates[room.numberOfPlayers - 1][1],
          sId: socket.id,
          name: name,
          score: 0,
          roomId: room.id,
          isAlive: true,
        };

        console.log(
          socket.id,
          `Player${room.players[socket.id].id}`,
          "Joined",
          room.id
        );
        socket.to(room.id).emit("newPlayer", room.players, socket.id);
        socket.emit("allPlayers", room.players);
      });
    } else {
      console.log(
        "This room is at capacity. No. of players right now:",
        room.numberOfPlayers
      );
      socket.emit("roomAtCapacity");
    }
  } else {
    console.log("Room", room.id, "is invalid or has already started");
    socket.emit("gameAlreadyStarted", room.id);
  }
};
/**********************************************
 * EXPRESS ROUTER
 */

// Serving static files
app.use(express.static("public"));
app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

server.startCoordinates = [
  [225, 377],
  [125, 233],
  [320, 233],
  [233, 89],
];

server.listen(PORT, async () => {
  try {
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

io.on("connection", function (socket) {
  //room creation
  socket.on("createRoom", (data) => {
    room = new Room(data.roomCode);
    rooms[data.roomCode] = room;
  });

  //adds player to room
  socket.on("joinRoom", (data) => {
    const room = rooms[data.roomCode];
    if (room) {
      joinRoom(socket, room, data.userName);
    } else {
      console.log("Sorry, game room:", data.roomCode, "not found");
      socket.emit("invalidRoom");
    }
  });

  // moves player
  socket.on("playerMoved", function (data) {
    const room = rooms[data.roomId];
    updatePlayer(data);
    socket.to(room.id).emit("movePlayer", data);
  });

  //player scores
  socket.on("updatePlayerScore", function (data) {
    const room = rooms[data.roomId];
    updateScore(data);
    socket.to(room.id).emit("updatePlayerScore", data);
    socket.emit("updateYourScore", data);
  });

  // updates dots
  socket.on("dotEaten", function (data) {
    socket.broadcast.emit("dotEaten", data);
  });

  // updates ghost
  socket.on("ghostMoved", function (data) {
    socket.broadcast.emit("moveGhost", data);
  });

  //emits player died to other players
  socket.on("playerDied", function (data) {
    const room = rooms[data.roomId];
    playerDied();
    socket.to(room.id).emit("playerDied", data);
    socket.emit("youDied", data);
  });

  //handles start game functionality
  socket.on("startGame", (data) => {
    if (data.singlePlayer) {
      rooms[data.room].started = true;
      socket.to(data.room).emit("gameStarted");
    } else {
      if (rooms[data.room].numberOfPlayers === 4) {
        rooms[data.room].started = true;
        socket.to(data.room).emit("gameStarted");
      } else {
        socket.emit("notEnoughPlayers");
      }
    }
  });

  socket.on("gameOver", (roomId) => {
    rooms[roomId].gameOver = true;
    socket.to(roomId).emit("gameOver");
  });
});

// updates player location
function updatePlayer(data) {
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.x = data.x;
      player.y = data.y;
      player.score = data.score;
    }
  });
}

//updates player score
function updateScore(data) {
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.score = data.score;
    }
  });
}

//updates player isAlive status
function playerDied() {
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.isAlive = false;
    }
  });
}
