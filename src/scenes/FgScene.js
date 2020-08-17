import Player from "../entity/Player";
import Floor from "../entity/Floor";
import Plat from "../entity/Plat";
import io, { connect } from "socket.io-client";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    this.players = [];
  }

  preload() {
    // Sprites
    this.load.image("floor", "assets/sprites/floor.png");
    this.load.image("plat", "assets/sprites/earth-platform.png");

    this.load.spritesheet("red", "assets/spriteSheets/red.png", {
      frameWidth: 400,
      frameHeight: 400,
    });

    this.load.atlas(
      "Red",
      "assets/spriteSheets/Red.png",
      "assets/backgrounds/Red.json"
    );

    this.load.spritesheet("blue", "assets/spriteSheets/Blue.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("black", "assets/spriteSheets/Black.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("pink", "assets/spriteSheets/Pink.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    // sounds
    // this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("laser", "assets/audio/laser.wav");
  }

  create() {
    // initialize socket connection
    // this.socket = io("http://localhost:8080");
    // this.socket.on("connect", (socket) => {
    //   console.log("connected");
    //   if (this.players.length < 4) {
    //     this.players.push(socket.id);
    //   } else {
    //     console.log("room full");
    //   }
    // });
    // Add static images
    this.createGroups();
    // this.add.image(500, 600, "floor");
    // this.add.image(700, 400, "plat");
    // this.add.image(300, 400, "plat");
    // this.add.image(500, 200, "plat");
    // this.add.spritesheet("red", {});

    // init player
    this.player = new Player(this, 500, 300, "blue").setScale(0.5);

    // MORE FLOOR EFFORTS

    this.playerGroup = this.physics.add.staticGroup({
      classType: Player,
      active: true,
    });

    this.createCollisions();

    // Create player's animations
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("blue", { start: 1, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "blue", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleUnarmed",
      frames: [{ key: "blue", frame: 1 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "blue", frame: 5 }],
      frameRate: 10,
    });

    // Create sounds
    // this.jumpSound = this.sound.add("jump");

    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.input.keyboard.createCursorKeys());

    // FLOOR PROBLEMS
    this.floorGroup.setOrigin(800, 800);
    // this.physics.add.collider(this.player, floor);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors);
    // console.log(this.floorGroup.update);
    // this.socket = io("http://localhost:8080");
    // this.socket.on("connect", (socket) => {
    //   console.log("connected");
    //   if (this.players.length < 4) {
    //     if (this.players.length === 1) {
    //       this.player2 = new Player(500, 500, "blue");
    //       this.player2.port = 2;
    //       this.player2.id = socket.id;
    //       this.players.push(this.player2);
    //     }
    //   } else if (this.players.length === 2) {
    //     this.player3 = new Player(500, 500, "black");
    //     this.player3.port = 3;
    //     this.player3.id = socket.id;
    //     this.players.push(this.player3);
    //   } else if (this.players.length === 3) {
    //     this.player4 = new Player(500, 500, "pink");
    //     this.player4.port = 4;
    //     this.player4.id = socket.id;
    //     this.players.push(this.player4);
    //   } else {
    //     console.log("room full");
    //   }
    // });
    // this.socket.on("disconnect", (socket) => {
    //   console.log(`Player ${this.playerA.port} has left the game`);
    //   this.players = this.players.filter((player) => player.id !== socket.id);
    // });
  }

  // Make the ground
  createFloor(x, y) {
    this.floorGroup.create(x, y, "floor", 1);
  }

  createPlatforms(x, y) {
    this.platGroup.create(x, y, "plat");
  }

  // Make all the groups
  createGroups() {
    // console.log(this.floorGroup, this.floor, Floor);
    this.floorGroup = this.physics.add.staticGroup({
      classType: Floor,
      frameHeight: 90,
    });
    // console.log(this.floorGroup);

    this.platGroup = this.physics.add.staticGroup({
      classType: Floor,
    });
    this.createFloor(500, 600);
    this.createPlatforms(200, 400);
    this.createPlatforms(600, 400);
    this.createPlatforms(500, 200);
  }

  // Make collisions
  createCollisions() {
    this.physics.add.collider(this.player, this.floorGroup);
    this.physics.add.collider(this.player, this.platGroup);

    // console.log(this.physics.add.collider());
  }

  // Player animations
}
