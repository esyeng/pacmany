import "phaser";
import MissPacMan from "../entity/MissPacMan.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    MissPacMan.preload(this);
    this.load.image("tiles", "assets/maps/pacman/map.png");
    //this.load.image("tiles", "assets/maps/pacman/map.png");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test1.json");
    this.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test5.json");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");
  }

  create() {
    console.log("create MainScene");
    // Load scenes in parallel

    // this.scene.launch('BgScene');
    // this.scene.launch('FgScene');
    // this.scene.launch("TestMap");
    // Background
    const map = this.make.tilemap({ key: "map" });
    //const tileset = map.addTilesetImage("layout", "tiles", 32, 32, 0, 0);
    const tileset1 = map.addTilesetImage("maze", "tiles", 16, 16, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset1, 0, 0);
    const tileset2 = map.addTilesetImage("layout2", "tiles", 16, 16, 0, 0);
    const layer2 = map.createStaticLayer("Tile Layer 2", tileset2, 0, 0);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);
    //this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // const layer2 = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
    // const layer3 = map.createStaticLayer("Image Layer 1", tileset, 0, 0);

    // here we are creating miss pac-man
    this.player = new MissPacMan({
      scene: this,
      x: 25,
      y: 25,
      texture: "pacman_c",
      frame: "p_right_1",
    });

    // this.player2 = new Phaser.Physics.Matter.Sprite(
    //   this.matter.world,
    //   50,
    //   50,
    //   "pacman_c",
    //   "p_right_1"
    // );

    this.add.existing(this.player);
    // this.add.existing(this.player2);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.player.x, this.player.y, 6, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.player.x, this.player.y, 10, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.player.setExistingBody(compoundBody);
    this.player.setFixedRotation();

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();

    // this.scene.launch("SocketHub");
    //this.scene.launch("TestMap");

  }
}
