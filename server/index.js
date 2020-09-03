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
let players = [];
// let rooms = [
//   12221: [
//     player0: {
//       player info
//     },
//     player1: {
//       player info
//     },
//   ]
//   }

// ];

let roomCount = 0;
let userName = "";
let thisRoom = "";

function joinUser(socketId, userName, roomName) {
  const user = {
    socketId,
    userName,
    roomName,
  };
  player.push(user);
  return user;
}

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
  socket.on("createRoom", function (data) {
    // rooms[room] = room;
    // socket.room = roomname;
    // socket.join(roomname);
    // subscribe.subscribe(socket.room);
    console.log("in server create room: ", data.userName, data.roomCode);
  });

  socket.on("newplayer", function () {
    //   console.log("in room server");
    //   let newUser = joinUser(socket.id, data.userName, data.roomName);
    //   socket.emit("send data", {
    //     id: socket.id,
    //     userName: newUser.userName,
    //     roomName: newUser.roomName,
    //   });
    //   socket.on("getData", function () {
    //     const data = {
    //       id: socket.id,
    //       userName: newUser.userName,
    //       roomName: newUser.roomName,
    //     };
    //     socket.emit("dataSent", data);
    //   });
    //   thisRoom = newUser.roomName;
    //   console.log(newUser);
    //   console.log("Total users :", users);
    //   socket.join(newUser.roomName);
    // });

    //   console.log(`userName : ${userName} left Room Name : ${roomName}`);
    //   socket.broadcast.to(`${roomName}`).emit("userLeftGameRoom", userName);
    //   socket.leave(`${roomName}`);

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

function updatePlayer(data) {
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.x = data.x;
      player.y = data.y;
    }
  });
}

function getAllPlayers() {
  players = [];

  Object.keys(io.sockets.connected).forEach(function (socketID) {
    console.log("rooms: ", io.sockets.connected[socketID].rooms);
    let player = io.sockets.connected[socketID].player;
    if (player) {
      player.sId = io.sockets.connected[socketID].id;
      players.push(player);
    }
  });

  const rooms = Object.keys(io.sockets.rooms);
  console.log("rooms from obj: ", rooms);

  return players;
}

function getName(id) {
  const arr = users.filter((obj) => obj.socketID === id);
  if (arr) {
    return arr[0].userName;
  }
}
