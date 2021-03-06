import io from "socket.io-client";

var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function () {
  Client.socket.emit("newplayer");
};

Client.playerMoved = function (id, sId, roomId, x, y, score) {
  Client.socket.emit("playerMoved", {
    id: id,
    sId: sId,
    roomId: roomId,
    x: x,
    y: y,
    score: score,
  });
};

Client.gameOver = function (roomId) {
  Client.socket.emit("gameOver", roomId);
};

Client.ghostMoved = function (x, y, name) {
  Client.socket.emit("ghostMoved", {
    x: x,
    y: y,
    name: name,
  });
};

Client.dotEaten = function (x, y, id, eaten) {
  Client.socket.emit("dotEaten", { x: x, y: y, id: id, eaten: eaten });
};

Client.updatePlayerScore = function (id, sId, roomId, score) {
  Client.socket.emit("updatePlayerScore", {
    id: id,
    sId: sId,
    roomId: roomId,
    score: score,
  });
};

Client.playerDied = function (id, roomId) {
  Client.socket.emit("playerDied", { id: id, roomId: roomId });
};

Client.socket.on("newPlayer", function (data, socketId) {
  window.MainScene.addNewPlayer(
    data[socketId].id,
    data[socketId].x,
    data[socketId].y,
    data[socketId].sId,
    data[socketId].name,
    data[socketId].score,
    data[socketId].roomId,
    data[socketId].isAlive
  );
});

Client.socket.on("allPlayers", function (data) {
  for (let player in data) {
    window.MainScene.addNewPlayer(
      data[player].id,
      data[player].x,
      data[player].y,
      data[player].sId,
      data[player].name,
      data[player].score,
      data[player].roomId,
      data[player].isAlive
    );
  }

  Client.socket.on("movePlayer", function (data) {
    window.MainScene.movePlayer(data.id, data.x, data.y, data.score);
  });

  Client.socket.on("moveGhost", function (data) {
    window.MainScene.moveGhost(data.x, data.y, data.name);
  });

  Client.socket.on("dotEaten", function (data) {
    window.MainScene.eraseDot(data.x, data.y, data.id, data.eaten);
  });

  Client.socket.on("updatePlayerScore", function (data) {
    window.MainScene.updatePlayerScore(data.score, data.id);
  });
  Client.socket.on("playerDied", function (data) {
    window.MainScene.playerDied(data);
  });
  Client.socket.on("gameStarted", function (data) {
    window.MainScene.startGame();
  });
  Client.socket.on("gameOver", function () {
    window.MainScene.setGameOver();
  });
});

export { Client };
