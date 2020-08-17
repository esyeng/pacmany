import Player from "../entity/Player";
import Floor from "../entity/Floor";
import Plat from "../entity/Plat";
import io, { connect } from "socket.io-client";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
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
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", () => {
      console.log("connected");
    });
    // Add static images
    // this.createGroups();
    this.add.image(500, 600, "floor");
    this.add.image(700, 400, "plat");
    this.add.image(300, 400, "plat");
    this.add.image(500, 200, "plat");
    // this.add.spritesheet("red", {});

    // * attempt to floor *

    // let floorX = this.sys.game.config.width / 2;
    // let floorY = this.sys.game.config.height * 0.95;
    // let floor = this.physics.add.sprite(floorX, floorY, "floor");
    // floor.setImmovable();
    // floor.displayWidth = this.sys.game.config.width;
    // this.floor = new Floor(500, 600, "floor");

    // init player
    this.player = new Player(this, 500, 500, "red").setScale(0.2);
    // this.player = new Player(this, 500, 500, "pink").setScale(1);

    // MORE FLOOR EFFORTS
    this.floorGroup = this.physics.add.staticGroup({
      classType: Floor,
      active: true,
    });
    // this.floorGroup.setCollisionByExclusion([-1]);
    // this.floor = this.createFloor(500, 600);
    // this.add.physics.collider("floor");

    // Create player's animations
    this.createAnimations();

    // Create sounds
    // this.jumpSound = this.sound.add("jump");

    // Assign the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    console.log(this.input.keyboard.createCursorKeys());

    // FLOOR PROBLEMS
    // this.physics.add.collider(this.player, floor);
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors);
  }

  // Make the ground
  createFloor(x, y) {
    this.floorGroup.create(x, y, "floor");
  }

  // Make all the groups
  createGroups() {
    // platforms, maybe someday
    // this.plats = this.physics.add.group({
    //   classType: Plat,
    //   maxSize: 200,
    //   runChildUpdate: true,
    //   allowGravity: false,
    // });
  }

  // Make collisions
  createCollisions() {
    // physical collisions to add once floor * is *
  }

  // Player animations
  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("red", { start: 1, end: 2 }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "red", frame: 2 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleUnarmed",
      frames: [{ key: "red", frame: 1 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "red", frame: 5 }],
      frameRate: 10,
    });
  }
}
