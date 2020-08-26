import "phaser";
import MissPacMan from "../entity/MissPacMan.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    console.log("MissPacMan: ", MissPacMan);
    MissPacMan.preload(this);
    this.load.image("tiles", "../../public/assets/maps/pacman/map.png");
    //this.load.image("tiles", "assets/maps/pacman/map.png");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test1.json");
    this.load.tilemapTiledJSON(
      "map",
      "../../public/assets/maps/pacman/map_nik_test7.json"
    );
    this.load.atlas(
      "resources",
      "../../public/assets/maps/pacman/res1.png",
      "../../public/assets/maps/pacman/res1_atlas.json"
    );
    this.load.audio("pickup", "../../public/assets/audio/pickup.mp3");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");//
  }

  create() {
    console.log("create MainScene");
    // Load scenes in parallel

    // this.scene.launch('BgScene');
    // this.scene.launch('FgScene');
    // this.scene.launch("TestMap");
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
    //this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // const layer2 = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
    // const layer3 = map.createStaticLayer("Image Layer 1", tileset, 0, 0);

    // here we are creating miss pac-man
    this.player = new MissPacMan({
      scene: this,
      x: 223,
      y: 374,
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

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.addResources();
  }

  addResources() {
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
      });
      resItem.setExistingBody(circleCollider);
      resItem.setFrictionAir(1);
      resItem.sound = this.sound.add("pickup");
      resItem.pickup = function () {
        this.destroy();
        this.sound.play();
        console.log(this);
        console.log("pickup");
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
