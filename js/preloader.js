
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {
    this.game.stage.backgroundColor = '#1b3550';
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingImage');
    this.preloadBar.anchor.set(0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('block', 'assets/block.png');
    this.load.image('police', 'assets/badge.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('gem', 'assets/gem.png');
    this.load.audio('gemSound', ['audio/gem.ogg', 'audio/gem.wav', 'audio/gem.mp3']);
    this.load.audio('hurtSound', ['audio/hurt.ogg', 'audio/hurt.wav', 'audio/hurt.mp3']);
  },

  create: function () {
  },

  update: function () {
    this.state.start('Game', true, false, {level: 1});
    if (this.cache.isSoundDecoded('titleMusic') && this.ready === false) {
      this.ready = true;
      //this.state.start('MainMenu');
    }

  }

};
