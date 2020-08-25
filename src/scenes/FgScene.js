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

    // load sounds
    // this.load.audio("jump", "assets/audio/jump.wav");
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

    // init player
    this.player = new Player(this, 500, 300, "blue").setScale(0.5);

    // Add floor group

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

    // Floor
    this.floorGroup.setOrigin(800, 800);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors);
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
    this.floorGroup = this.physics.add.staticGroup({
      classType: Floor,
      frameHeight: 90,
    });

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
  }
}
