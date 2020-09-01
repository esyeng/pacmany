import io from "socket.io-client";
// import { game } from "../src/components/HomePage";
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
  console.log("emitting new player");
  Client.socket.emit("newplayer");
};

Client.sendClick = function (x, y) {
  Client.socket.emit("click", { x: x, y: y });
};

Client.socket.on("newplayer", function (data) {
  console.log("GOT NEW PLAYER");
  console.log(
    "*************response from server after new playr is emmitted: ",
    data
  );
  window.MainScene.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on("allplayers", function (data) {
  console.log("socket emitted all players");
  for (var i = 0; i < data.length; i++) {
    window.MainScene.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }

  Client.socket.on("move", function (data) {
    window.MainScene.movePlayer(data.id, data.x, data.y);
  });
});

export { Client };
