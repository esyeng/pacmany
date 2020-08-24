const path = require("path");
const PORT = 8080;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { MongoClient } = require("mongodb");
const { uri } = require("../secrets");

const client = new MongoClient(uri, { useNewUrlParser: true });
const socketio = require("socket.io");
const io = socketio(server);
require("./socket/index")(io);

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/", require("./socket/index"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

server.listen(PORT, async () => {
  try {
    await client.connect();
    collection = client.db("pacmany").collection("players");
    console.log(`Insert coin to play on port: ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
