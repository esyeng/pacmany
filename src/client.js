import io from "socket.io-client";
// import { game } from "../src/components/HomePage";
import game from "./startGame";

console.log("game: ", game);
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

Client.socket.on("newplayer", function (data) {
  console.log(
    "*************response from server after new playr is emmitted: ",
    data
  );
  game.scene.keys.MainScene.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on("allplayers", function (data) {
  console.log("temp: ", game.scene.keys.MainScene.addNewPlayer);
  for (var i = 0; i < data.length; i++) {
    game.scene.keys.MainScene.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }
});

export { Client };
