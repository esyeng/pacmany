import "phaser";
import {
  baseLevelPreload,
  baseLevelCreate,
  addLevelResources,
} from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";

var Client = require("../client");

// export default class MainScene extends Phaser.Scene {
//   constructor() {
//     super("MainScene");
//   }

//   preload() {
//     baseLevelPreload(game);
//     MissPacMan.preload(game);
//     Ghost.preload(game);
//   }

//   create() {
//     console.log("game IN MAIN SCENE: ", game);
//     var defaultCategory = 0x0001;
//     var redCategory = 0x0002;
//     var greenCategory = 0x0004;
//     var blueCategory = 0x0008;

//     baseLevelCreate(game);

//     addLevelResources(game);

//     game.inky = new Ghost({
//       scene: game,
//       x: 191,
//       y: 232,
//       texture: "ghosts",
//       frame: "inky",
//     });
//     game.add.existing(game.inky);
//     game.pinky = new Ghost({
//       scene: game,
//       x: 220,
//       y: 232,
//       texture: "ghosts",
//       frame: "pinky",
//     });
//     game.add.existing(game.pinky);
//     game.clyde = new Ghost({
//       scene: game,
//       x: 250,
//       y: 232,
//       texture: "ghosts",
//       frame: "clyde",
//     });
//     game.add.existing(game.clyde);

//     game.blinky = new Ghost({
//       scene: game,
//       x: 225,
//       y: 185,
//       texture: "ghosts",
//       frame: "blinky",
//     });
//     game.add.existing(game.blinky);

//     console.log("CLIENT: ", Client.Client.askNewPlayer);

//     Client.Client.askNewPlayer();

//     // here we are creating miss pac-man
//     // game.player = new MissPacMan({
//     //   scene: game,
//     //   x: 223,
//     //   y: 374,
//     //   texture: "pacman_c",
//     //   frame: "p_right_1",
//     // });
//     // game.add.existing(game.player);
//   } // end of create

//   update() {
//     // game.player.update();
//     game.blinky.update();
//     // game.two.update();
//     // game.pinky.update();
//     // game.clyde.update();
//     // game.inky.update();
//   }

//   addNewPlayer(id, x, y) {
//   console.log("main scene add new player: ", game);
//   game[`player${id}`] = new MissPacMan({
//     scene: game,
//     x: x,
//     y: y,
//     texture: "pacman_c",
//     frame: "p_right_1",
//   });

//   console.log("game is new player; ", game[`player${id}`]);
//   game.add.existing(game[`player${id}`]);
// }
// }

import game from "../startGame";

var MainScene = {};

// MainScene.init = function () {
//   game.stage.disableVisibilityChange = true;
// };

MainScene.preload = function () {
  baseLevelPreload(game);
  MissPacMan.preload(game);
  Ghost.preload(game);
};

MainScene.create = function () {
  console.log("game IN MAIN SCENE: ", game);

  baseLevelCreate(game);

  addLevelResources(game);

  game.blinky = new Ghost({
    scene: game,
    x: 225,
    y: 185,
    texture: "ghosts",
    frame: "blinky",
  });

  game.add.existing(game.blinky);

  console.log("CLIENT: ", Client.Client.askNewPlayer);

  Client.Client.askNewPlayer();
};

MainScene.update = function () {
  game.blinky.update();
};

MainScene.addNewPlayer = function (id, x, y) {
  console.log("main scene add new player: ", game);
  game[`player${id}`] = new MissPacMan({
    scene: game,
    x: x,
    y: y,
    texture: "pacman_c",
    frame: "p_right_1",
  });

  console.log("game is new player; ", game[`player${id}`]);
  game.add.existing(game[`player${id}`]);
};

export default MainScene;
