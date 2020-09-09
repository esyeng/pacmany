import MainScene from "../scenes/MainScene";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin/src";

export const config = {
  width: 448, // Game width in pixels
  height: 500, // Game height in pixels
  type: Phaser.AUTO,
  parent: "phaser-container",
  scene: MainScene,
  scale: {
    zoom: 1.5,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};
