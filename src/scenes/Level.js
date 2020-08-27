import "phaser";

export function baseLevelPreload(scene) {
  // loading tiles(images) for map
  scene.load.image("tiles", "/assets/maps/pacman/map.png");
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

// import "phaser";

// export default class Level extends Phaser.Scene {
//   constructor() {
//     super("Level");
//   }

//   preload(scene) {
//     scene.load.image("tiles", "/assets/maps/pacman/map.png");
//     //scene.load.image("tiles", "assets/maps/pacman/map.png");
//     //scene.load.tilemapTiledJSON("map", "assets/maps/pacman/map_nik_test1.json");

//     //scene.load.tilemapTiledJSON("map", "/assets/maps/pacman/map_nik_test5.json");
//     //scene.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");

//     scene.load.tilemapTiledJSON(
//       "map",
//       "/assets/maps/pacman/map_nik_test7.json"
//     );
//     scene.load.atlas(
//       "resources",
//       "/assets/maps/pacman/res1.png",
//       "/assets/maps/pacman/res1_atlas.json"
//     );
//     scene.load.audio("pickup", "/assets/audio/pickup.mp3");
//     //this.load.tilemapTiledJSON("map", "assets/maps/pacman/map.json");//
//   }
// }
