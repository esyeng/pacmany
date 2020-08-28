import "phaser";
import {
  baseLevelPreload,
  baseLevelCreate,
  addLevelResources,
} from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";
import socket, { createGameKey } from "./SocketHub";
export let gameKey;
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
    /**
     * sockets --> room initialization
     */

    socket.on("connect", function () {
      gameKey = createGameKey();
      console.log("Connected!");
      console.log(`MAINSCENE ---> ${gameKey}`);
      socket.emit("joinRoom", gameKey);
    });

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

    // here we are creating miss pac-man
    this.player = new MissPacMan({
      scene: this,
      x: 223,
      y: 374,
      texture: "pacman_c",
      frame: "p_right_1",
    });
    this.add.existing(this.player);
  } // end of create

  update() {
    this.player.update();
    this.blinky.update();
    // this.pinky.update();
    // this.clyde.update();
    // this.inky.update();
  }
}
