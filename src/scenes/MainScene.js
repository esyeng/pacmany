import "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // Load scenes in parallel
    // this.scene.launch("SocketHub");
    this.scene.launch("TestMap");
  }
}
