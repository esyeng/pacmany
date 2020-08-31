import "phaser";

export default class Ghost extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
    this.health = 1;
    this._position = new Phaser.Math.Vector2(this.x, this.y);

    var defaultCategory = 0x0001;
    var redCategory = 0x0002;
    var greenCategory = 0x0004;
    var blueCategory = 0x0008;

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var ghostCollider = Bodies.circle(this.x, this.y, 6, {
      isSensor: false,
      label: "ghostCollider",
    });
    var ghostSensor = Bodies.circle(this.x, this.y, 80, {
      isSensor: true,
      label: "ghostSensor",
    });

    const compoundBody = Body.create({
      parts: [ghostCollider, ghostSensor],
      frictionAir: 0.35,
    });
    compoundBody.collisionFilter = {
      category: blueCategory,
      mask: defaultCategory | redCategory,
    };
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [ghostSensor],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.name == "player") {
          this.attacking = other.gameObjectB;
          //console.log("callback attack");
        }
      },
      context: this.scene,
    });
  }

  static preload(scene) {
    scene.load.atlas(
      "ghosts",
      "/assets/maps/pacman/ghosts.png",
      "/assets/maps/pacman/ghosts_atlas.json"
    );

    // scene.load.animation(
    //   "ghosts_anim",
    //   "/assets/maps/pacman/ghosts_anim.json"
    // );
  }

  get velocity() {
    return this.body.velocity;
  }

  get dead() {
    return this.health <= 0;
  }

  get position() {
    this._position.set(this.x, this.y);
    return this._position;
  }

  hit = () => {
    this.health--;
    // console.log("G hit");
  };

  attack = (target) => {
    if (target.dead || this.dead) {
      clearInterval(this.attacktimer);
      return;
    }
    target.hit();
  };

  update() {
    //console.log("update Ghost", this.attacking);

    if (this.x < 2) this.x = 470;
    if (this.x > 486) this.x = 10;

    if (this.attacking) {
      let direction = this.attacking.position.subtract(this.position);
      if (direction.length() > 24) {
        let v = direction.normalize();
        this.setVelocityX(direction.x);
        this.setVelocityY(direction.y);
        if (this.attacktimer) {
          clearInterval(this.attackTimer);
          this.attacktimer = null;
        }
      } else {
        if (this.attacktimer == null) {
          this.attacktimer = setInterval(this.attack, 500, this.attacking);
        }
      }
    }
    this.setFlipX(this.velocity.x < 0);
  } // end of updates
} // end of class
