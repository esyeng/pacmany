import "phaser";
import { baseLevelPreload } from "./Level.js";
import MissPacMan from "../entity/MissPacMan.js";
import Ghost from "../entity/Ghost.js";
import { hash } from "../components/HomePage";
import socket from "./SocketHub";
let players = {};

const message = "hANDWRITTED HARDCODED STRING MESSAGE from MainScene.js";
let counter = 0;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // console.log("P-MainScene version >>> 5 <<<");
    baseLevelPreload(this);
    MissPacMan.preload(this);
    Ghost.preload(this);
  }

  create() {
    console.log("socket>>", socket);
    console.log("hash>>>>>>", hash);
    socket.emit("joinRoom", hash);

    // Load scenes in parallel

    // Background
    const map = this.make.tilemap({ key: "map" });

    this.map = map;
    //const tileset = map.addTilesetImage("layout", "tiles", 32, 32, 0, 0);
    const tileset1 = map.addTilesetImage("maze", "tiles", 16, 16, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset1, 0, 0);
    const tileset2 = map.addTilesetImage("layout2", "tiles", 16, 16, 0, 0);
    const layer2 = map.createStaticLayer("Tile Layer 2", tileset2, 0, 0);
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer2);

    console.log("map created>>>");

    this.addResources();

    console.log("resources created>>>");

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

    console.log("ghost created>>>");

    // here we are creating miss pac-man
    this.player = new MissPacMan({
      scene: this,
      x: 223,
      y: 374,
      texture: "pacman_c",
      frame: "p_right_1",
    });

    console.log("MissPacMan created>>>");

    // this.player2 = new Phaser.Physics.Matter.Sprite(
    //   this.matter.world,
    //   50,
    //   50,
    //   "pacman_c",
    //   "p_right_1"
    // );

    this.add.existing(this.player);
    // this.add.existing(this.player2);

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  addResources() {
    var defaultCategory = 0x0001;
    var redCategory = 0x0002;
    var greenCategory = 0x0004;
    var blueCategory = 0x0008;

    const resources = this.map.getObjectLayer("Object Layer 1");
    resources.objects.forEach((resource) => {
      //console.log("resource type>>", resource);
      let resItem = new Phaser.Physics.Matter.Sprite(
        this.matter.world,
        resource.x,
        resource.y,
        "resources",
        resource.type
      );

      let yOrigin = resource.properties.find((p) => p.name == "yOrigin").value;
      resItem.x += resItem.width / 2;
      resItem.y -= resItem.height / 2;
      //resItem.y = resItem.y + resItem.height * (yOrigin - 0.5);
      resItem.setStatic(true);
      //resItem.setOrigin(0.5, yOrigin);

      this.add.existing(resItem);
      const { Bodies } = Phaser.Physics.Matter.Matter;
      var circleCollider = Bodies.circle(resItem.x, resItem.y, 3, {
        isSensor: false,
        label: "collider",
        // collisionFilter = {
        //   'group': -1,
        //   'category': 3,
        //   'mask': 0,
        // },
      });
      // circleCollider.collisionFilter = {
      //   group: -1,
      //   category: 3,
      //   mask: 0,
      // };
      circleCollider.collisionFilter = {
        category: redCategory,
      };
      resItem.setExistingBody(circleCollider);
      resItem.setFrictionAir(1);
      resItem.sound = this.sound.add("pickup");
      resItem.pickup = function () {
        this.destroy();
        this.sound.play();
        // console.log(this);
        // console.log("pickup");
        return true;
      };
    });
  }

  update() {
    this.player.update();

    // this.scene.launch("SocketHub");
    //this.scene.launch("TestMap");
  }
}
