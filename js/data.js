BasicGame.Data = function(game) {
  this.game;
  this.levels = {
    1: {
      walls: [
        {x: 0, y: 64, w: 3, h: 3}
      ],
      police: [
        {
          x: 20,
          y: game.height/2,
          radius: 300,
          tweenProps: {x: game.width - 80 },
          speed: 10000
        }
      ],
      gem: {
        x: game.width - 20,
        y: game.height - 20
      }
    }
  }
}
