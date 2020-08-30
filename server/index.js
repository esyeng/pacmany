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

// app.use("/demo", require("./socket/index"));
server.listen(PORT, async () => {
  try {
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

let players = [];
let roomCount = 0;
let userName = "";
let users = [];
let thisRoom = "";
function joinUser(socketId, userName, roomName) {
  const user = {
    socketId,
    userName,
    roomName,
  };
  users.push(user);
  return user;
}

// function removeUser(id) {
//   const getID = users.socketID === id;
//   const index = users.indexOf(getID);
//   if (index !== -1) {
//     return user.splice(index, 1)[0];
//   }
// }
function getName(id) {
  const arr = users.filter((obj) => obj.socketID === id);
  if (arr) {
    return arr[0].userName;
  }
}

io.on("connection", function (socket) {
  console.log("A user connected: " + socket.id);

  // FRONT END ROOM LOGIC

  socket.on("join room", function (data) {
    console.log("in room server");
    let newUser = joinUser(socket.id, data.userName, data.roomName);
    const playerInfo = {
      id: socket.id,
      userName: newUser.userName,
      roomName: newUser.roomName,
    };
    socket.emit("send data", playerInfo);
    socket.broadcast.to("demo").emit("show players", users);
    // socket.on("getData", function () {
    //   const data = {
    //     id: socket.id,
    //     userName: newUser.userName,
    //     roomName: newUser.roomName,
    //   };
    //   socket.emit("dataSent", data);
    // });
    thisRoom = newUser.roomName;
    console.log(newUser);
    console.log("Total users :", users);
    socket.join(newUser.roomName);
  });

  socket.on("chat message", function (data) {
    const name = getName(data.id);
    io.to(thisRoom).emit("chat message", { data: data, name: name });
    // io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
    io.to(thisRoom).emit("chat message", { data: data, id: socket.id });
  });

  socket.on("subscribe", function (data) {
    console.log("subscription in index.js-sockets-server-side");
    const room_data = JSON.parse(data);
    userName = room_data.userName;
    const roomName = room_data.roomName;

    socket.join(`${roomName}`);
    console.log(`userName : ${userName} joined Room Name : ${roomName}`);
    io.to(`${roomName}`).emit("newUserToGameRoom", userName);
  });

  socket.on("unsubscribe", function (data) {
    console.log("un-subscribe sockets-server-side");
    const room_data = JSON.parse(data);
    userName = room_data.userName;
    const roomName = room_data.roomName;

    console.log(`userName : ${userName} left Room Name : ${roomName}`);
    socket.broadcast.to(`${roomName}`).emit("userLeftGameRoom", userName);
    socket.leave(`${roomName}`);
  });

  socket.on("disconnect", () => {
    console.log("one of the sockets disconnected");
  });

  // GAME LOGIC

  socket.on("get players", function () {
    socket.broadcast.emit("send players", users);
  });
});
