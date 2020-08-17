import "phaser";

export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    this.load.image("bg-grey", "assets/backgrounds/bg-grey.png");
    this.load.image("bloc-party", "assets/backgrounds/bloc-party.png");
  }

  create() {
    // Background
    this.add.image(-160, 0, "bg-grey").setOrigin(0).setScale(1);
    this.add.image(380, 80, "bloc-party").setScale(1);
  }
}
