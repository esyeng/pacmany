import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = false;
    this.setCollideWorldBounds(true);
  }
  updateJump(cursors) {
    if (cursors.up.isDown) {
      this.setVelocityY(-400);
    }
  }
  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-600);
      if (this.body.touching.down) {
        this.play("run", true);
      }
    }
    // Move right
    else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(600);
      if (this.body.touching.down) {
        this.play("run", true);
      }
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      this.play("idleUnarmed");
    }
  }
  updateInAir() {
    if (!this.body.touching.down) {
      this.play("jump");
    }
  }
  // Check which controller button is being pushed and execute movement & animation
  update(cursors) {
    this.updateMovement(cursors);
    this.updateJump(cursors);
    this.updateInAir(cursors);
  }
}
