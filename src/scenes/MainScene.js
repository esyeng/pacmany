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
    window.MainScene = this;
  }

  preload() {
    console.log("in preload: ", window.MainScene);
    baseLevelPreload(this);
    MissPacMan.preload(this);
    Ghost.preload(this);
  }

  create() {
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
    // Client.Client.askNewPlayer();
    console.log("in create: ", window.MainScene);
    let el = document.getElementById("loading");
    el.innerHTML = "loaded";
  }

  update() {
    let id = Client.Client.socket.id;
    if (this.player0 && this.player0.sId === id) {
      this.player0.update(this, this.player0.id);
    }

    if (this.player1 && this.player1.sId === id) {
      this.player1.update(this, this.player1.id);
    }

    if (this.player2 && this.player2.sId === id) {
      this.player2.update(this, this.player2.id);
    }

    if (this.player3 && this.player3.sId === id) {
      this.player3.update(this, this.player3.id);
    }
    //ghost update
    this.blinky.update();
  }

  addNewPlayer(id, x, y, sId) {
    console.log("add new mainscene");
    let textureArr = ["pacman_c", "pacman_c_g", "pacman_c_o", "pacman_c_v"];
    let frameArr = ["p_right_1", "pg_right_1", "po_right_1", "pv_right_1"];
    this[`player${id}`] = new MissPacMan({
      scene: this,
      x: x,
      y: y,
      texture: textureArr[id],
      frame: frameArr[id],
      id: id,
      sId: sId,
    });

    this.add.existing(this[`player${id}`]);
  }

  movePlayer(id, x, y) {
    window.MainScene[`player${id}`].x = x;
    window.MainScene[`player${id}`].y = y;
  }

  eraseDot(x, y, id) {
    window.MainScene.resources[id].destroy();
  }
}
