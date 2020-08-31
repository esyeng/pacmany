import "phaser";
import {
  baseLevelPreload,
  baseLevelCreate,
  addLevelResources,
} from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";

var Client = require("../client");

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    baseLevelPreload(this);
    MissPacMan.preload(this);
    Ghost.preload(this);
  }

  create() {
    console.log("THIS IN MAIN SCENE: ", this);
    var defaultCategory = 0x0001;
    var redCategory = 0x0002;
    var greenCategory = 0x0004;
    var blueCategory = 0x0008;

    baseLevelCreate(this);

    addLevelResources(this);

    this.inky = new Ghost({
      scene: this,
      x: 191,
      y: 232,
      texture: "ghosts",
      frame: "inky",
    });
    this.add.existing(this.inky);
    this.pinky = new Ghost({
      scene: this,
      x: 220,
      y: 232,
      texture: "ghosts",
      frame: "pinky",
    });
    this.add.existing(this.pinky);
    this.clyde = new Ghost({
      scene: this,
      x: 250,
      y: 232,
      texture: "ghosts",
      frame: "clyde",
    });
    this.add.existing(this.clyde);

    this.blinky = new Ghost({
      scene: this,
      x: 225,
      y: 185,
      texture: "ghosts",
      frame: "blinky",
    });
    this.add.existing(this.blinky);

    console.log("CLIENT: ", Client.Client.askNewPlayer);

    Client.Client.askNewPlayer();

    // here we are creating miss pac-man
    // this.player = new MissPacMan({
    //   scene: this,
    //   x: 223,
    //   y: 374,
    //   texture: "pacman_c",
    //   frame: "p_right_1",
    // });
    // this.add.existing(this.player);
  } // end of create

  update() {
    // this.player.update();
    this.blinky.update();
    // this.two.update();
    // this.pinky.update();
    // this.clyde.update();
    // this.inky.update();
  }

  addNewPlayer(id, x, y) {
    console.log("main scene add new player: ", this);
    this[`player${id}`] = new MissPacMan({
      scene: this,
      x: x,
      y: y,
      texture: "pacman_c",
      frame: "p_right_1",
    });

    console.log("this is new player; ", this[`player${id}`]);
    this.add.existing(this[`player${id}`]);
  }
}

// export function addPlayer(id, x, y) {
//   console.log("main scene add new player ");
//   console.log("add player this : ", this);
//   this[`player${id}`] = new MissPacMan({
//     scene: this,
//     x: x,
//     y: y,
//     texture: "pacman_c",
//     frame: "p_right_1",
//   });

//   console.log("this is new player; ", this[`player${id}`]);
//   this.add.existing(this[`player${id}`]);
// }
