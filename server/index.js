// /**********************
//  *
//  * SERVER GLOBAL VARS
//  */
const path = require("path");
const PORT = 8080;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const morgan = require("morgan");
module.exports = app;

let players = [];

// /**********************************************
//  * EXPRESS ROUTER
//  */
// Logging middleware
app.use(morgan("dev"));

// // Serving static files
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
 */

require("./socket/index")(io);

server.listen(PORT, async () => {
  try {
    // await client.connect();
    // collection = client.db("pacmany").collection("players");
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

// io.on("connection", function (socket) {
//   console.log("A user connected: " + socket.id);

//   players.push(socket.id);

//   if (players.length) {
//     console.log("players Array", players);
//   }
//   if (players.length === 1) {
//     console.log("players Array", players);
//     io.emit("isPlayerA");
//   }

//   socket.on("disconnect", function () {
//     console.log("A user disconnected: " + socket.id);
//     players = players.filter((player) => player !== socket.id);
//   });
// });

// server.listen(8080, function () {
//   console.log("Server started, EMRE!");
// });
