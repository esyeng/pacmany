/**********************
 *
 * SERVER GLOBAL VARS
 */
const path = require("path");
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io").listen(server);

module.exports = app;

let rooms = [];
let players = [];

//rooms class
class Room {
  constructor(roomCode) {
    this.id = roomCode;
    this.numberOfPlayers = 0;
    this.sockets = [];
    this.players = {};
    this.started = false;
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
        };

        console.log("new player in server file: ", room.players[socket.id]);
        console.log("socket rooms>>>", socket.rooms);

        console.log(
          socket.id,
          `Player${room.players[socket.id].id}`,
          "Joined",
          room.id
        );
        // socket.emit("newPlayer", room.players, socket.id);
        // socket.broadcast.emit("allplayers", room.players);
        socket.to(room.id).emit("newPlayer", room.players, socket.id);
        socket.emit("allPlayers", room.players);
      });
    } else {
      console.log(
        "This room is at capacity. No. of players right now:",
        room.numberOfPlayers
      );
    }
  } else {
    console.log("Room", room.id, "is invalid or has already started");
    socket.emit("gameAlreadyStarted", room.id);
  }

  console.log("Rooms: ", room);
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

server.lastPlayerID = 0;
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

    // have the socket join the room they've just created.
    // joinRoom(socket, room, data.userName);
  });

  //adds player to room
  socket.on("joinRoom", (data) => {
    const room = rooms[data.roomCode];
    if (room) {
      joinRoom(socket, room, data.userName);
    } else {
      console.log("Sorry, game room:", data.roomCode, "not found");
      socket.emit("invalidRoom", data.roomCode);
    }
  });

  // moves player
  socket.on("playerMoved", function (data) {
    console.log("in server playerMoved <<data>>", data);
    const room = rooms[data.roomId];
    updatePlayer(data);
    //players.filter((player) => player.id === data.id);
    console.log("in server playerMoved <<room>>", room);
    // for (let player in room) {
    //   console.log("inside for loop", player);
    //   if (player.id === data.id) {
    //     console.log("in server movePlayer emmited");
    //     socket.broadcast.emit("movePlayer", data);
    //   }
    // }
    socket.to(room.id).emit("movePlayer", data);
    // room.players.filter((player) => player.id === data.id);
    // socket.broadcast.emit("movePlayer", socket.player);
  });
  // updates dots - this works
  socket.on("dotEaten", function (data) {
    //console.log("in server dotEaten", data);
    socket.broadcast.emit("dotEaten", data);
  });
  // // socket.emit("newPlayer", room.players, socket.id);
  // // socket.broadcast.emit("allplayers", room.players);
  //     socket.to(room.id).emit("newPlayer", room.players, socket.id);
  //     socket.emit("allPlayers", room.players);

  // not being used
  socket.on("startGame", (room) => {
    console.log(room.roomCode);
    if (rooms[room.roomCode].numberOfPlayers > 1) {
      rooms[room.roomCode].started = true;
      // io.in(roomCode).emit("startCountdown");
      // io.in(room.roomCode).emit("currentPlayers", rooms[room.roomCode].players);
      socket.emit("currentPlayers", rooms[room.roomCode].players);

      socket.emit("sound");
      io.in(room.roomCode).emit("gameStarted");
    } else {
      socket.emit("notEnoughPlayers");
    }
  });

  // not being used
  socket.on("newplayer", function () {
    if (players.length === 4) return;

    socket.player = {
      id: server.lastPlayerID++,
      x: server.startCoordinates[server.lastPlayerID - 1][0],
      y: server.startCoordinates[server.lastPlayerID - 1][1],
      sId: "",
    };

    socket.broadcast.emit("newplayer", socket.player);
    socket.emit("allplayers", getAllPlayers());

    socket.on("playerMoved", function (data) {
      updatePlayer(data);
      players.filter((player) => player.id === data.id);

      socket.broadcast.emit("movePlayer", socket.player);
    });

    socket.on("dotEaten", function (data) {
      socket.broadcast.emit("dotEaten", data);
    });
  });
});

// being used
function updatePlayer(data) {
  console.log("in server updatePlayer");
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.x = data.x;
      player.y = data.y;
    }
  });
}

// not being used
function getAllPlayers(roomId) {
  players = [];

  Object.keys(io.sockets.connected).forEach(function (socketID) {
    console.log("rooms: ", io.sockets.connected[socketID].rooms);
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.sId = io.sockets.connected[socketID].id;
      players.push(player);
    }
  });

  rooms[roomId].players = players;

  return rooms[roomId].players;
}

function getName(id) {
  const arr = users.filter((obj) => obj.socketID === id);
  if (arr) {
    return arr[0].userName;
  }
}
