
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {
    this.load.image('block', 'assets/block.png');
    this.load.image('police', 'assets/light.png');
    this.load.image('player', 'assets/player.png');
  },

  create: function () {
  },

  update: function () {
    this.state.start('Game', true, false, {level: 1});
    if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
      this.ready = true;
      //this.state.start('MainMenu');
    }

  }

};
