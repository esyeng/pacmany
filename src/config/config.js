export default {
  type: Phaser.AUTO,
  parent: "Canvas",
  width: 1000, // Game width in pixels
  height: 1000, // Game height in pixels // it was 800 from Emre
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
