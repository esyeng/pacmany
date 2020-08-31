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
      x: randomInt(100, 400),
      y: randomInt(100, 400),
    };

    console.log("sending new player info: ", socket.player);

    socket.broadcast.emit("newplayer", socket.player);
    socket.emit("allplayers", getAllPlayers());
  });

  socket.on("test", function () {
    console.log("test received");
  });
});

function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  console.log("in get all players: ", players);

  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
