import TestMap from "../scenes/TestMap";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1000,
  height: 1000,
  physics: {
    // Optional: specify physics engine and configuration
    default: "arcade", // A simple and performant physics engine
    arcade: {
      gravity: { y: 1500 }, // Game objects will by default be affected by gravity
      debug: true,
    },
  },
  scene: TestMap,
};
