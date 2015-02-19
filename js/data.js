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
          tweenProps: {x: game.height - 80 },
          tweenDuration: 10000
        }
      ]
    }
  }
}
