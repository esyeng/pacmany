export default {
  type: Phaser.AUTO,
  parent: "Canvas",
  width: 1000, // Game width in pixels
  height: 800, // Game height in pixels
  physics: {
    // Optional: specify physics engine and configuration
    default: "arcade", // A simple and performant physics engine
    arcade: {
      gravity: { y: 1500 }, // Game objects will by default be affected by gravity
      debug: true,
    },
  },
  render: {
    pixelArt: true,
  },
};
