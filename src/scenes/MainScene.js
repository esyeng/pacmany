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

var gameOver = false;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    window.MainScene = this;
  }

  preload() {
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

    this.input.keyboard.enabled = false;

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
    this.gameOver = false;
  }

  update() {
    if (gameOver) return;

    for (let id = 0; id < playersToCreate.length; id++) {
      if (!this[`player${id}`]) {
        window.MainScene.createNewPlayer(playersToCreate[id]);
      }
    }
    //ghost update
    this.blinky.update();

    let id = Client.Client.socket.id;
    if (this.player0 && this.player0.sId === id) {
      window.MainScene.checkDead(0);
      window.MainScene.checkWin(0);
      this.player0.update(this, this.player0.id);
    }

    if (this.player1 && this.player1.sId === id) {
      window.MainScene.checkDead(1);
      window.MainScene.checkWin(1);
      this.player1.update(this, this.player1.id);
    }

    if (this.player2 && this.player2.sId === id) {
      window.MainScene.checkDead(2);
      window.MainScene.checkWin(2);
      this.player2.update(this, this.player2.id);
    }

    if (this.player3 && this.player3.sId === id) {
      window.MainScene.checkDead(3);
      window.MainScene.checkWin(3);
      this.player3.update(this, this.player3.id);
    }
  } // end of update

  checkDead(id) {
    if (
      this.gameOver ||
      (!gameOver && this[`player${id}`] && this[`player${id}`].dead)
    ) {
      if (this[`player${id}`].dead) {
        this[`player${id}`].beDead();
      }

      gameOver = true;

      window.MainScene[`player${id}`].x = 20;
      window.MainScene[`player${id}`].y = 2000;

      const tileset3 = this.map.addTilesetImage(
        "black_rect",
        "black",
        16,
        16,
        0,
        0
      );
      const layer3 = this.map.createStaticLayer("Tile Layer 3", tileset3, 0, 0);
      const tileset4 = this.map.addTilesetImage("font", "fonts", 16, 16, 0, 0);
      const layer5 = this.map.createStaticLayer("Tile Layer 5", tileset4, 0, 0);

      this.input.keyboard.enabled = false;

      window.MainScene[`player${id}`].x = 20;
      window.MainScene[`player${id}`].y = 2000;
    }
  }

  getMaxScore() {
    let player0Score = 0;
    let player1Score = 0;
    let player2Score = 0;
    let player3Score = 0;
    if (this.player0) player0Score = this.player0.score;
    if (this.player1) player1Score = this.player1.score;
    if (this.player2) player2Score = this.player2.score;
    if (this.player3) player3Score = this.player3.score;

    let max = Math.max(player0Score, player1Score, player2Score, player3Score);
    return max;
  }

  checkIfOtherPlayersDead(id) {
    let playerIds = [1, 2, 3, 4];
    let allDead = 0;
    playerIds.filter((player) => {
      if (player !== id) return player;
    });
    playerIds.forEach((id) => {
      if (this[`player${id}`] && this[`player${id}`].dead) {
        allDead++;
      }
    });
    return allDead;
  }

  // getTotalScore() {
  //   let player0Score = 0;
  //   let player1Score = 0;
  //   let player2Score = 0;
  //   let player3Score = 0;
  //   if (this.player0) player0Score = this.player0.score;
  //   if (this.player1) player1Score = this.player1.score;
  //   if (this.player2) player2Score = this.player2.score;
  //   if (this.player3) player3Score = this.player3.score;

  //   return player0Score + player1Score + player2Score + player3Score;
  // }

  allEatenCheck() {
    //console.log(window.MainScene.resources);
    if (window.MainScene.resources) {
      const resArr = window.MainScene.resources;
      for (let i = 0; i < resArr.length; i++) {
        if (!resArr[i].eaten) return false;
      }
      return true;
    }
  }

  checkWin(id) {
    let maxScore = this.getMaxScore();
    let otherPlayersDead = this.checkIfOtherPlayersDead(id);
    let allEaten = this.allEatenCheck();
    // to remove for prod
    let help = window.MainScene.resources.filter((res) => !res.eaten).length; // to remove for prod
    console.log("help", help); // to remove for prod

    if (
      !gameOver &&
      this[`player${id}`] &&
      !this[`player${id}`].dead &&
      (otherPlayersDead === 3 ||
        (allEaten && this[`player${id}`].score === maxScore))
    ) {
      gameOver = true;

      window.MainScene[`player${id}`].x = 2000;
      window.MainScene[`player${id}`].y = 2000;

      const tileset3 = this.map.addTilesetImage(
        "black_rect",
        "black",
        16,
        16,
        0,
        0
      );
      const layer3 = this.map.createStaticLayer("Tile Layer 3", tileset3, 0, 0);
      const tileset4 = this.map.addTilesetImage("font", "fonts", 16, 16, 0, 0);
      const layer4 = this.map.createStaticLayer("Tile Layer 4", tileset4, 0, 0);

      Client.Client.gameOver(this[`player${id}`].roomId);

      this.input.keyboard.enabled = false;
    }
  }

  startGame() {
    this.input.keyboard.enabled = true;
  }

  addNewPlayer(id, x, y, sId, name, score, roomId, isAlive) {
    playersToCreate.push({
      id,
      x,
      y,
      sId,
      name,
      score,
      roomId,
      isAlive,
    });
  }

  createNewPlayer({ id, x, y, sId, name, score, roomId, isAlive }) {
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
      isAlive: isAlive,
    });
    this.add.existing(this[`player${id}`]);
  }

  movePlayer(id, x, y, score) {
    window.MainScene[`player${id}`].x = x;
    window.MainScene[`player${id}`].y = y;
    window.MainScene[`player${id}`].score = score;
  }

  moveGhost(x, y, name) {
    window.MainScene[name].x = x;
    window.MainScene[name].y = y;
  }

  eraseDot(x, y, id, eaten) {
    window.MainScene.resources[id].eaten = true;
    window.MainScene.resources[id].destroy();
  }

  updatePlayerScore(score, id) {
    window.MainScene[`player${id}`].score = score;
  }

  playerDied(data) {
    window.MainScene[`player${data.id}`].isAlive = false;
  }

  setGameOver() {
    this.gameOver = true;
  }
}
