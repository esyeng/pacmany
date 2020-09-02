import "phaser";
var Client = require("../client");

export default class MissPacMan extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame, id, sId } = data;

    super(scene.matter.world, x, y, texture, frame, id, sId);
    this.scene.add.existing(this);
    this.name = `player${id}`;
    this.health = 1;
    this.score = 0;
    this.id = id;
    this.sId = sId;
    // this.texture = texture;
    // this.frame = frame;

    this._position = new Phaser.Math.Vector2(this.x, this.y);
    this.inputKeys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    var defaultCategory = 0x0001;
    var redCategory = 0x0002;
    var greenCategory = 0x0004;
    var blueCategory = 0x0008;

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 6, {
      isSensor: false,
      label: "playerCollider",
    });
    playerCollider.collisionFilter = {
      category: redCategory,
      mask: defaultCategory | greenCategory,
    };
    // var playerSensor = Bodies.circle(this.x, this.y, 10, {
    //   isSensor: true,
    //   label: "playerSensor",
    // });
    const compoundBody = Body.create({
      parts: [playerCollider], //playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.CreatePickupCollisions(playerCollider);
  }

  static preload(scene) {
    //yellow
    scene.load.atlas(
      "pacman_c",
      "/assets/maps/pacman/pacman_c.png",
      "/assets/maps/pacman/pacman_c_atlas.json"
    );

    scene.load.animation(
      "pacman_c_anim",
      "/assets/maps/pacman/pacman_c_anim.json"
    );
    //green
    scene.load.atlas(
      "pacman_c_g",
      "/assets/maps/pacman/pacman_c_g.png",
      "/assets/maps/pacman/pacman_c_g_atlas.json"
    );

    scene.load.animation(
      "pacman_c_g_anim",
      "/assets/maps/pacman/pacman_c_g_anim.json"
    );
    //orange
    scene.load.atlas(
      "pacman_c_o",
      "/assets/maps/pacman/pacman_c_o.png",
      "/assets/maps/pacman/pacman_c_o_atlas.json"
    );

    scene.load.animation(
      "pacman_c_o_anim",
      "/assets/maps/pacman/pacman_c_o_anim.json"
    );
    //violet
    scene.load.atlas(
      "pacman_c_v",
      "/assets/maps/pacman/pacman_c_v.png",
      "/assets/maps/pacman/pacman_c_v_atlas.json"
    );

    scene.load.animation(
      "pacman_c_v_anim",
      "/assets/maps/pacman/pacman_c_v_anim.json"
    );
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
    // console.log("PC hit");
  };

  update(scene, idx) {
    //console.log("MissPacMan update>>>", idx);

    if (this.x < 2) this.x = 470;
    if (this.x > 486) this.x = 10;

    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      this.movePlayer();
    } else if (this.inputKeys.right.isDown) {
      this.movePlayer();
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      this.movePlayer();
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      this.movePlayer();
      playerVelocity.y = 1;
    }

    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);

    let animsArrRight = ["pacman_right", "pg_right", "po_right", "pv_right"];
    let animsArrLeft = ["pacman_left", "pg_left", "po_left", "pv_left"];
    let animsArrUp = ["pacman_up", "pg_up", "po_up", "pv_up"];
    let animsArrDown = ["pacman_down", "pg_down", "po_down", "pv_down"];
    //console.log("vx:", this.velocity.x, " vy:", this.velocity.y);
    if (this.velocity.x > 0) {
      //console.log("RIGHT>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play(animsArrRight[idx], true);
    } else if (this.velocity.x < 0) {
      //console.log("LEFT>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play(animsArrLeft[idx], true);
    }
    if (this.velocity.y < 0) {
      //console.log("UP>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play(animsArrUp[idx], true);
    } else if (this.velocity.y > 0.1) {
      //console.log("DOWN>>", "vx:", this.velocity.x, " vy:", this.velocity.y);
      this.anims.play(animsArrDown[idx], true);
    }
  } // end of updates

  movePlayer() {
    //console.log("in move player");
    Client.Client.playerMoved(this.x, this.y, this.id);
  }

  CreatePickupCollisions(playerCollider) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup)
          other.gameObjectB.pickup();
        this.score++;
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
