
BasicGame.Game = function (game) {
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    this.data = new BasicGame.Data(game);

    this.ACCELERATION = 1200;
    this.MAX_SPEED = 350;
    this.FRICTION = 1200;

    this.police;
    this.player;
    this.lightBitmap;
    this.cursors;
    this.testText;
    this.levelName;
    this.level;
};

BasicGame.Game.prototype = {

    init: function(params) {
      this.levelName = params.level;
      this.level = this.data.levels[this.levelName];
    },

    create: function () {
      this.game.stage.backgroundColor = 0x4488cc;

      // Bitmap used for drawing light from the ray caster.
      this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
      this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
      this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
      this.lightBitmap = this.game.add.image(0, 0, this.bitmap);
      this.lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

      // Player
      this.player = this.game.add.sprite(20, 20, 'player');
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
      this.player.body.drag.setTo(this.FRICTION, this.FRICTION);

      // Police
      var police;
      this.police = this.game.add.group();
      this.level.police.forEach(function (policeData) {
        police = this.police.create(policeData.x, policeData.y, 'police');
        police.anchor.setTo(0.5, 0.5);
        this.game.add.tween(police).to(policeData.tweenProps, policeData.tweenDuration, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        police.radius = policeData.radius;
      }, this);

      // Walls
      var wall;
      this.walls = this.game.add.group();
      this.level.walls.forEach(function (wallData) {
        wall = this.walls.create(wallData.x, wallData.y, 'block');
        this.game.physics.enable(wall, Phaser.Physics.ARCADE);
        wall.body.immovable = true;
        wall.scale.setTo(wallData.w, wallData.h);
      }, this);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.testText = this.game.add.text(5, 5, 'N', { fontSize: '12px', fill: '#fff'});
    },

    update: function () {
      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.player, this.light);
      // Create a shadow over the bottom layers
      this.bitmap.context.fillStyle = 'rgb(100, 100, 100)';
      this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);

      this.movePlayer();
      this.testText.text = 'N';
      this.police.forEach(function (police) {
        this.castRays(police);
      }, this);

    },

    movePlayer: function() {
      if (this.cursors.left.isDown) {
        this.player.body.acceleration.y = 0;
        this.player.body.acceleration.x = -this.ACCELERATION;
      } else if (this.cursors.right.isDown) {
        this.player.body.acceleration.y = 0;
        this.player.body.acceleration.x = this.ACCELERATION;
      } else if (this.cursors.down.isDown) {
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = this.ACCELERATION;
      } else if (this.cursors.up.isDown) {
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = -this.ACCELERATION;
      } else {
        this.player.body.acceleration.x = 0;
        this.player.body.acceleration.y = 0;
      }
    },

    castRays: function(police) {
      var points = [];
      var ray;
      var intersect;
      var playerHit;
      for (var a = 0; a < Math.PI * 2; a += Math.PI/360) {
        ray = new Phaser.Line(
          police.x, police.y,
          police.x + Math.cos(a)*police.radius, police.y + Math.sin(a)*police.radius
        );

        intersect = this.collideWallsWithRay(ray);
        if (intersect) {
          points.push(intersect);
          ray = new Phaser.Line(
            police.x, police.y,
            police.x, intersect.y
          )
        } else {
          points.push(ray.end);
        }

        playerHit = this.collidePlayerWithRay(ray);
        if (playerHit) {
          this.testText.text = 'Y';
          this.time.events.add(300, this.loseGame, this);
        }

      }

      this.bitmap.context.beginPath();
      this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
      // Starting at the first point that was generated, connect
      // the dots between the points to draw a solid path.
      this.bitmap.context.moveTo(points[0].x, points[0].y);
      for (var i=0; i < points.length; i++) {
        this.bitmap.context.lineTo(points[i].x, points[i].y);
      }
      this.bitmap.context.closePath();
      // Fill in the shape with light
      this.bitmap.context.fill();

      this.bitmap.dirty = true;
    },

    collidePlayerWithRay: function(ray) {
      // Create a box outline around the player for the ray to collide with.
      var leftEdge = this.player.x;
      var rightEdge = this.player.x + this.player.width;
      var bottomEdge = this.player.y;
      var topEdge = this.player.y + this.player.height;

      var outline = [
        new Phaser.Line(leftEdge, topEdge, rightEdge, topEdge),
        new Phaser.Line(leftEdge, topEdge, leftEdge, bottomEdge),
        new Phaser.Line(rightEdge, topEdge, rightEdge, bottomEdge),
        new Phaser.Line(leftEdge, bottomEdge, rightEdge, bottomEdge),
      ]

      for (var i=0; i < outline.length; i++) {
        var intersect = Phaser.Line.intersects(ray, outline[i]);
        if (intersect) {
          return true;
        }
      }
      return false;
    },

    collideWallsWithRay: function(ray) {
      var distanceToWall = Number.POSITIVE_INFINITY;
      var closestIntersect = null;

      this.walls.forEach(function(wall) {
        // Create a box outline around the wall for the ray to collide with.
        var leftEdge = wall.x;
        var rightEdge = wall.x + wall.width;
        var bottomEdge = wall.y;
        var topEdge = wall.y + wall.height;

        var outline = [
          new Phaser.Line(leftEdge, topEdge, rightEdge, topEdge),
          new Phaser.Line(leftEdge, topEdge, leftEdge, bottomEdge),
          new Phaser.Line(rightEdge, topEdge, rightEdge, bottomEdge),
          new Phaser.Line(leftEdge, bottomEdge, rightEdge, bottomEdge),
        ]

        for (var i=0; i < outline.length; i++) {
          var intersect = Phaser.Line.intersects(ray, outline[i]);
          if (intersect) {
            distance = this.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
            if (distance < distanceToWall) {
              distanceToWall = distance;
              closestIntersect = intersect;
            }
          }
        }
      }, this);

      return closestIntersect;
    },

    loseGame: function() {
      this.state.restart(true, false, {level: this.levelName});
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
