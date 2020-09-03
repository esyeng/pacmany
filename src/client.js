import io from "socket.io-client";
import game from "./startGame";

console.log("window main scene: ", window.MainScene);
var Client = {};
Client.socket = io.connect();

var temp = game.scene.keys.MainScene;

Client.sendTest = function () {
  console.log("test sent");
  Client.socket.emit("test");
};

Client.askNewPlayer = function () {
  Client.socket.emit("newplayer");
};

Client.playerMoved = function (x, y, id) {
  Client.socket.emit("playerMoved", { x: x, y: y, id: id });
};

Client.dotEaten = function (x, y, id) {
  console.log("IN client dot eaten");
  Client.socket.emit("dotEaten", { x: x, y: y, id: id });
};

Client.socket.on("newplayer", function (data) {
  window.MainScene.addNewPlayer(data.id, data.x, data.y, data.sId);
});

Client.socket.on("allplayers", function (data) {
  for (var i = 0; i < data.length; i++) {
    window.MainScene.addNewPlayer(
      data[i].id,
      data[i].x,
      data[i].y,
      data[i].sId
    );
  }

  Client.socket.on("movePlayer", function (data) {
    window.MainScene.movePlayer(data.id, data.x, data.y);
  });

  Client.socket.on("dotEaten", function (data) {
    console.log("client dot eaten");
    window.MainScene.eraseDot(data.x, data.y, data.id);
  });
});

export { Client };
