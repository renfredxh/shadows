
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {
    this.load.image('block', 'assets/block.png');
    this.load.image('police', 'assets/badge.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('gem', 'assets/gem.png');
  },

  create: function () {
  },

  update: function () {
    this.state.start('Game', true, false, {level: 0});
    if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
      this.ready = true;
      //this.state.start('MainMenu');
    }

  }

};
