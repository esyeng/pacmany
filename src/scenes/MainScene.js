import "phaser";
import {
  baseLevelPreload,
  baseLevelCreate,
  addLevelResources,
} from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";
import socket from "./SocketHub";
const players = [{ id: 1 }, { id: 2 }]; // test
// let players = [];
// let userName = prompt("Your Name, please");
// let roomName = prompt("room name");
// let chat = prompt("your message to other players, please");
// let ID = "";

const message = "hANDWRITTED HARDCODED STRING MESSAGE from MainScene.js";
let counter = 0;

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
    // socket.emit("join room", { userName, roomName });
    socket.on("send data", (data) => {
      ID = data.id;
      console.log("my ID: " + ID);
    });
    // socket.emit("chat message", chat);
    // socket.on("startGame", function () {
    //   socket.emit("get players");
    //   socket.on("send players", function (users) {
    //     players = [...users];
    //   });
    // });

    // if (players.length > 1) {
    //   let num = players.length;
    //   players.forEach(player, (num) => {
    //     if (num === 2) {
    //       this.two = new MissPacMan({
    //         scene: this,
    //         x: 245,
    //         y: 374,
    //         texture: "pacman_c",
    //         frame: "p_right_1",
    //       });
    //       this.add.existing(this.two);
    //     }
    //     if (num === 3) {
    //       this.three = new MissPacMan({
    //         scene: this,
    //         x: 210,
    //         y: 374,
    //         texture: "pacman_c",
    //         frame: "p_right_1",
    //       });
    //       this.add.existing(this.three);
    //     }
    //     if (num === 4) {
    //       this.four = new MissPacMan({
    //         scene: this,
    //         x: 230,
    //         y: 374,
    //         texture: "pacman_c",
    //         frame: "p_right_1",
    //       });
    //       this.add.existing(this.four);
    //     }
    //   });
    // }
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
    // this.two.update();
    // this.pinky.update();
    // this.clyde.update();
    // this.inky.update();
  }
}
