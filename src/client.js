import io from "socket.io-client";
import game from "./startGame";
import MainScene from "./scenes/MainScene";

var Client = {};
Client.socket = io.connect();

// var temp = game.scene.keys.MainScene;

// Client.sendTest = function () {
//   console.log("test sent");
//   Client.socket.emit("test");
// };

Client.askNewPlayer = function () {
  Client.socket.emit("newplayer");
};

Client.playerMoved = function (id, sId, roomId, x, y) {
  console.log("in client playerMoved", id, sId, roomId, x, y);
  Client.socket.emit("playerMoved", {
    id: id,
    sId: sId,
    roomId: roomId,
    x: x,
    y: y,
  });
};

Client.dotEaten = function (x, y, id) {
  //console.log("IN client dot eaten", x, y, id);
  Client.socket.emit("dotEaten", { x: x, y: y, id: id });
};

Client.socket.on("newPlayer", function (data, socketId) {
  // console.log("in new player request client", data);
  //for (let player in data) {
  window.MainScene.addNewPlayer(
    data[socketId].id,
    data[socketId].x,
    data[socketId].y,
    data[socketId].sId,
    data[socketId].name,
    data[socketId].score,
    data[socketId].roomId
  );
});

Client.socket.on("allPlayers", function (data) {
  // console.log("data in current players: ", currentPlayer);
  //console.log("in all player request client", data);

  for (let player in data) {
    window.MainScene.addNewPlayer(
      data[player].id,
      data[player].x,
      data[player].y,
      data[player].sId,
      data[player].name,
      data[player].score,
      data[player].roomId
    );
  }

  Client.socket.on("movePlayer", function (data) {
    console.log("client seding to MainScene movePlayer <<data>>", data);
    window.MainScene.movePlayer(data.id, data.x, data.y);
  });

  Client.socket.on("dotEaten", function (data) {
    //console.log("client dot eaten <<data>>", data);
    window.MainScene.eraseDot(data.x, data.y, data.id);
  });
});

export { Client };
