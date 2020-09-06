import "phaser";
import {
  baseLevelPreload,
  baseLevelCreate,
  addLevelResources,
} from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";

var Client = require("../client");

var playersToCreate = [];

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    window.MainScene = this;
  }

  preload() {
    //console.log("in preload: ", window.MainScene);
    baseLevelPreload(this);
    MissPacMan.preload(this);
    Ghost.preload(this);
  }

  create() {
    // console.log("in create ", window.MainScene);
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

    // for (let id = 0; id < playersToCreate.length; id++) {
    //   window.MainScene.createNewPlayer(playersToCreate[id]);
    // }

    // this.player99 = new MissPacMan({
    //   scene: this,
    //   x: 100,
    //   y: 100,
    //   texture: "pacman_c",
    //   frame: "p_right_1",
    //   id: 99,
    //   sId: "xxx",
    //   userName: "xxx",
    //   score: "0",
    //   roomId: "xxx",
    // });
    // this.add.existing(this.player99);

    // Client.Client.askNewPlayer();

    // console.log("in create: ", window.MainScene);
    // let el = document.getElementById("loading");
    // el.innerHTML = "loaded";
  }

  update() {
    for (let id = 0; id < playersToCreate.length; id++) {
      if (!this[`player${id}`]) {
        window.MainScene.createNewPlayer(playersToCreate[id]);
      }
    }

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

  addNewPlayer(id, x, y, sId, name, score, roomId) {
    //console.log("in add new player");
    playersToCreate.push({
      id,
      x,
      y,
      sId,
      name,
      score,
      roomId,
    });
  }

  createNewPlayer({ id, x, y, sId, name, score, roomId }) {
    // console.log(
    //   "add new mainscene",
    //   "id",
    //   id,
    //   "x",
    //   x,
    //   "y",
    //   y,
    //   "sId",
    //   sId,
    //   "name",
    //   name,
    //   "score",
    //   score,
    //   "roomId"
    // );
    //console.log("creating new player <<<this>>>", this);

    let textureArr = ["pacman_c", "pacman_c_g", "pacman_c_o", "pacman_c_v"];
    let frameArr = ["p_right_1", "pg_right_1", "po_right_1", "pv_right_1"];
    this[`player${id}`] = new MissPacMan({
      scene: window.MainScene,
      x: x,
      y: y,
      texture: textureArr[id],
      frame: frameArr[id],
      id: id,
      sId: sId,
      userName: name,
      score: score,
      roomId: roomId,
    });

    // this[`player${id}`].
    // texture = textureArr[id];
    // this[`player${id}`].frame = frameArr[id];
    // console.log(
    //   "add new player func mainscene <<<ADDING to scene>>>",
    //   window.MainScene
    // );
    this.add.existing(this[`player${id}`]);

    //console.log("add new player func mainscene", window.MainScene);
  }

  movePlayer(id, x, y) {
    console.log("main scene movePlayer", "id:", id, "x:", x, "y:", y);
    console.log("window.MainScene", window.MainScene, this);
    console.log("player0", window.MainScene.player0);
    console.log("player1", window.MainScene.player1);
    window.MainScene[`player${id}`].x = x;
    window.MainScene[`player${id}`].y = y;
  }

  eraseDot(x, y, id) {
    //console.log("main scene eraseDot", x, y, id);
    window.MainScene.resources[id].destroy();
  }
}
