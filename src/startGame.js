import config from "./config/config";
import MainScene from "./scenes/MainScene";

var game = new Phaser.Game(config);
// game.state.add("Game", Game);
// game.state.start("Game");

// game.stage.disableVisibilityChange = true;

game.scene.add("Main", MainScene);
game.scene.start("Main");
// console.log("game scene: ", game.scene);

module.exports = game;
