import "phaser";
var Client = require("../client");

export function baseLevelPreload(scene) {
  // loading tiles(images) for map
  scene.load.image("tiles", "/assets/maps/pacman/map.png");
  scene.load.image("fonts", "/assets/maps/pacman/font.png");
  scene.load.image("black", "/assets/maps/pacman/black_rect.png");
  // loading drawn map(data)
  scene.load.tilemapTiledJSON("map", "/assets/maps/pacman/map_nik_test7.json");
  // loading resources (dots) (images and data)
  scene.load.atlas(
    "resources",
    "/assets/maps/pacman/res1.png",
    "/assets/maps/pacman/res1_atlas.json"
  );
  // loading audio
  scene.load.audio("pickup", "/assets/audio/pickup.mp3");
}

export function baseLevelCreate(scene) {
  const map = scene.make.tilemap({ key: "map" });

  scene.map = map;

  const tileset1 = map.addTilesetImage("maze", "tiles", 16, 16, 0, 0);
  const layer1 = map.createStaticLayer("Tile Layer 1", tileset1, 0, 0);
  const tileset2 = map.addTilesetImage("layout2", "tiles", 16, 16, 0, 0);
  const layer2 = map.createStaticLayer("Tile Layer 2", tileset2, 0, 0);
  layer2.setCollisionByProperty({ collides: true });

  scene.matter.world.convertTilemapLayer(layer2);
}

export function addLevelResources(scene) {
  var defaultCategory = 0x0001;
  var redCategory = 0x0002;
  var greenCategory = 0x0004;
  var blueCategory = 0x0008;
  scene.resources = [];

  const resources = scene.map.getObjectLayer("Object Layer 1");
  resources.objects.forEach((resource, idx) => {
    let resItem = new Phaser.Physics.Matter.Sprite(
      scene.matter.world,
      resource.x,
      resource.y,
      "resources",
      resource.type
    );
    resItem.idx = idx;
    resItem.eaten = false;
    let yOrigin = resource.properties.find((p) => p.name == "yOrigin").value;
    resItem.x += resItem.width / 2;
    resItem.y -= resItem.height / 2;
    resItem.setStatic(true);

    scene.add.existing(resItem);
    const { Bodies } = Phaser.Physics.Matter.Matter;
    var circleCollider = Bodies.circle(resItem.x, resItem.y, 3, {
      isSensor: false,
      label: "collider",
    });
    circleCollider.collisionFilter = {
      category: greenCategory,
      mask: defaultCategory | redCategory,
    };
    resItem.setExistingBody(circleCollider);
    resItem.setFrictionAir(1);
    resItem.sound = scene.sound.add("pickup");

    resItem.eraseDot = function () {
      Client.Client.dotEaten(this.x, this.y, this.idx, this.eaten);
    };

    resItem.pickup = function () {
      this.eaten = true;
      this.eraseDot();
      this.destroy();
      this.sound.play();
      return true;
    };

    scene.resources.push(resItem);
  });
}
