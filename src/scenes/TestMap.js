import "phaser";

export default class TestMap extends Phaser.Scene {
  constructor() {
    super("TestMap");
  }

  preload() {
    this.load.image("tiles", "assets/maps/pacman/map.png");
    //this.load.image("tiles", "assets/maps/pacman/map.png");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test1.json");
    this.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test5.json");
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");
  }

  create() {
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
  }
}
