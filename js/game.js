
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

    this.police;
    this.lightBitmap;
};

BasicGame.Game.prototype = {

    create: function () {
      this.game.stage.backgroundColor = 0x4488cc;

      this.police = this.game.add.sprite(80, this.game.height/2, 'police');
      this.police.anchor.setTo(0.5, 0.5);
      this.game.add.tween(this.police).to({x: this.game.width - 80 }, 10000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);

      this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
      this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
      this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
      this.lightBitmap = this.game.add.image(0, 0, this.bitmap);
      this.lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

      this.walls = this.game.add.group();
      var i, x, y;
      for (i = 0; i < 4; i++) {
        x = i * this.game.width/4 + 50;
        y = this.game.rnd.between(50, this.game.height - 200)
        this.game.add.image(x, y, 'block', 0, this.walls).scale.setTo(3, 3);
      }
    },

    update: function () {
      this.bitmap.context.fillStyle = 'rgb(100, 100, 100)';
      this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);

      var points = [];
      for (var a = 0; a < Math.PI * 2; a += Math.PI/360) {
        var ray = new Phaser.Line(
          this.police.x, this.police.y,
          this.police.x + Math.cos(a)*1000, this.police.y + Math.sin(a)*1000
        );
        var intersect = this.collideWallsWithRays(ray);
        if (intersect) {
          points.push(intersect);
        } else {
          points.push(ray.end);
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

    collideWallsWithRays: function(ray) {
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

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
