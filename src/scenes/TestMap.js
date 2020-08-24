import "phaser";

export default class TestMap extends Phaser.Scene {
  constructor() {
    super("TestMap");
  }

  preload() {
    this.load.image("tiles", "../../public/assets/maps/pacman/map.png");
    this.load.tilemapTiledJSON(
      "map",
      "../../public/assets/maps/pacman/map_nik_test1.json"
    );
    //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");
  }

  create() {
    // Background
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("layout", "tiles", 32, 32, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
  }
}
