import "phaser";

export default class MissPacMan extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 6, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 10, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.CreatePickupCollisions(playerCollider);
  }

  static preload(scene) {
    scene.load.atlas(
      "pacman_c",
      "/assets/maps/pacman/pacman_c.png",
      "/assets/maps/pacman/pacman_c_atlas.json"
    );

    scene.load.animation(
      "pacman_c_anim",
      "/assets/maps/pacman/pacman_c_anim.json"
    );
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {
    // console.log("update MissPacMan");
    //console.log("MissPacMan Location>>>", "x:", this.x, " y:", this.y);
    if (this.x < 2) this.x = 470;
    if (this.x > 486) this.x = 10;

    //this.anims.play("pacman_right", true);

    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    //console.log("vx:", this.velocity.x, " vy:", this.velocity.y);
    if (this.velocity.x > 0) {
      //console.log("RIGHT>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play("pacman_right", true);
    } else if (this.velocity.x < 0) {
      //console.log("LEFT>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play("pacman_left", true);
    }
    if (this.velocity.y < 0) {
      //console.log("UP>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play("pacman_up", true);
    } else if (this.velocity.y > 0.1) {
      //console.log("DOWN>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play("pacman_down", true);
    }
  } // end of updates

  CreatePickupCollisions(playerCollider) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup)
          other.gameObjectB.pickup();
      },
      context: this.scene,
    });

    this.scene.matterCollision.addOnCollideActive({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup)
          other.gameObjectB.pickup();
      },
      context: this.scene,
    });
  }
}
