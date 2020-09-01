/**********************
 *
 * SERVER GLOBAL VARS
 */
const path = require("path");
const PORT = 8080;
const express = require("express");
const app = express();

// const morgan = require("morgan");
// const bodyParser = require("body-parser");

const server = require("http").Server(app);
const io = require("socket.io").listen(server);

module.exports = app;
var players = [];

/**********************************************
 * EXPRESS ROUTER
 */
// Logging middleware
// app.use(morgan("dev"));

// Serving static files
app.use(express.static("public"));
app.use(express.static("dist"));

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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
  socket.on("newplayer", function () {
    socket.player = {
      id: server.lastPlayerID++,
      x: server.startCoordinates[server.lastPlayerID - 1][0],
      y: server.startCoordinates[server.lastPlayerID - 1][1],
      sId: "",
    };

    console.log("sending new player info: ", socket.player);

    socket.emit("allplayers", getAllPlayers());

    // socket.on("playerMovement", function (movementData) {
    //   players[id].x = movementData.x;
    //   players[id].y = movementData.y;

    //   // emit a message to all players about the player that moved
    //   socket.broadcast.emit("playerMoved", players[id]);
    // });

    socket.on("playerMoved", function (data) {
      console.log("player moved data: ", data);
      // console.log("moved to " + data.x + ", " + data.y + "player id: ", data.id);
      // socket.player.x = data.x;
      // socket.player.y = data.y;
      // io.emit("move", socket.player);
    });
  });

  socket.on("test", function () {
    console.log("test received");
  });
});

function getAllPlayers() {
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    console.log(
      "socket: ",
      io.sockets.connected[socketID].id,
      ": ",
      io.sockets.connected[socketID].player
    );

    var player = io.sockets.connected[socketID].player;
    if (player) {
      player.sId = io.sockets.connected[socketID].id;
      players.push(player);
    }
  });
  console.log("in get all players: ", players);

  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
