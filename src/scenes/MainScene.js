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
    if (window) {
      window.MainScene = this;
    }
  }

  preload() {
    baseLevelPreload(this);
    MissPacMan.preload(this);
    Ghost.preload(this);
  }

  create() {
    console.log("this IN MAIN SCENE: ", this);
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

    Client.Client.askNewPlayer();
  }

  update() {
    let id = Client.Client.socket.id;
    if (this.player0 && this.player0.sId === id) {
      this.player0.update(this);
    }

    if (this.player1 && this.player1.sId === id) {
      this.player1.update(this);
    }

    if (this.player2 && this.player2.sId === id) {
      this.player2.update(this);
    }

    if (this.player3 && this.player3.sId === id) {
      this.player3.update(this);
    }

    //ghost update
    this.blinky.update();
  }

  getCoordinates = function (layer, pointer) {
    Client.Client.sendClick(pointer.worldX, pointer.worldY);
  };

  addNewPlayer(id, x, y, sId) {
    console.log("main scene add new player: ", this);
    this[`player${id}`] = new MissPacMan({
      scene: this,
      x: x,
      y: y,
      id: id,
      sId: sId,
      texture: "pacman_c",
      frame: "p_right_1",
    });

    console.log("this is new player; ", this[`player${id}`]);
    this.add.existing(this[`player${id}`]);
    console.log(this);
  }

  movePlayer(id, x, y) {
    console.log("in move player main scene");
    // var player = window.MainScene[`player${id}`];
    // var distance = Phaser.Math.Distance.Between(player.x, player.y, x, y);

    // console.log("distance: ", distance);
    // console.log("player: ", player);

    // console.log("this.add: ", this.add.tween(player));

    // var tween = window.MainScene.add.tween(player);
    // console.log("tween: ", tween);
    // var duration = distance * 10;
    // tween.to({ x: x, y: y }, duration);
    // tween.start();

    if (this.player0 && this.player0.id === id) {
      console.log("player 0 update being called");
      this.player0.update(this);
    }

    if (this.player1 && this.player1.id === id) {
      console.log("player 1 update being called");

      this.player1.update(this);
    }

    if (this.player2 && this.player2.id === id) {
      console.log("player 2 update being called");

      this.player2.update(this);
    }

    if (this.player3 && this.player3.id === id) {
      console.log("player 3 update being called");

      this.player3.update(this);
    }
  }
}
