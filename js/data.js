BasicGame.Data = function(game) {
  // Base size of a 
  var b = 32;
  var world = game.world;
  var bottomRight = {
    x: game.width - 40,
    y: game.height - 30
  };
  var topRight = {
    x: game.width - 80,
    y: 40
  };
  this.maxLevel = 10;
  this.levels = {
    1: {
      walls: [
      ],
      police: [
        {
          x: world.centerX,
          y: 200,
          radius: 200,
          tweenProps: {y: game.height - 200},
          speed: 1500
        }
      ],
      gem: {
        x: game.width - 200,
        y: 40
      },
      player: {
        x: 200,
        y: 20
      }
    },
    2: {
      walls: [
        {x: 86, y: 0, w: 3, h: 3},
        {x: 86, y: world.centerY, w: 3, h: 10},
      ],
      police: [
        {
          x: 200,
          y: 220,
          radius: 200,
          tweenProps: {x: 300},
          speed: 2000
        }
      ],
      gem: {
        x: 32,
        y: game.height - 40
      },
      player: {
        x: 32,
        y: 20
      }
    },
    3: {
      walls: [
        {x: world.centerX, y: 100, w: 4, h: 1, centered: true},
        {x: world.centerX, y: game.height, w: 4, h: 4, centered: true},
      ],
      police: [
        {
          x: world.centerX,
          y: 200,
          radius: 300,
          tweenProps: {y: 400},
          speed: 1200
        }
      ],
      gem: topRight,
      player: {
        x: 20,
        y: 20
      }
    },
    4: {
      walls: [
        {x: world.centerX, y: 0, w: 1, h: 16},
        {x: 0, y: 64, w: 3, h: 3},
        {x: b*3*2, y: 64*2+b*3, w: 3, h: 3},
        {x: b*3*4, y: 64*5+b*3, w: 3, h: 3},
      ],
      police: [
        {
          x: 20,
          y: game.height/2 + 30,
          radius: 300,
          tweenProps: {x: game.width - 80 },
          speed: 7000
        }
      ],
      gem: bottomRight,
      player: {
        x: 20,
        y: 20
      }
    },
    5: {
      walls: [
        {x: 0, y: 64, w: 3, h: 3},
        {x: 150, y: 64*6, w: 3, h: 3},
        {x: world.centerX, y: 64*2, w: 9, h: 1},
        {x: world.centerX+b*9, y: 64*2, w: 1, h: 5},
        {x: world.centerX+b*9, y: 64*7, w: 1, h: 6},
      ],
      police: [
        {
          x: game.width - 300,
          y: 500,
          radius: 580,
          tweenProps: {x: 200},
          speed: 5000
        }
      ],
      gem: bottomRight,
      player: {
        x: 20,
        y: 20
      }
    },
    6: {
      walls: [
        {x: world.centerX - 200, y: 64*2-b, w: 1, h: 1, centered: true},
        {x: world.centerX + 200, y: game.height - 64*2+b, w: 1, h: 1, centered: true},
        {x: 0, y: world.centerY, w: 4, h: 1},
        {x: game.width - b*4, y: world.centerY, w: 4, h: 1},
      ],
      police: [
        {
          x: world.centerX + 200,
          y: 350,
          radius: 150,
          tweenProps: {y: game.height - 150},
          speed: 600
        },
        {
          x: world.centerX - 200,
          y: game.height - 350,
          radius: 150,
          tweenProps: {y: 150},
          speed: 600
        }
      ],
      gem: bottomRight,
      player: {
        x: 32,
        y: 32
      }
    },
    7: {
      walls: [
        {x: 32, y: 64, w: 7, h: 1},
        {x: 0, y: 128+b*3, w: 4, h: 13},
        {x: 332, y: 128, w: 1, h: 3},
        {x: 300, y: 128+b*3, w: 6, h: 1},
        {x: 550, y: 390, w: 4, h: 1},
        {x: 550+b*3, y: 390-128+b, w: 1, h: 3},
        {x: 550+b*3, y: game.height - b*4, w: 1, h: 4},
      ],
      police: [
        {
          x: 400,
          y: 200,
          radius: 450,
          tweenProps: {x: game.width - 210},
          speed: 3000
        }
      ],
      gem: bottomRight,
      player: {
        x: 40,
        y: 40
      }
    },
    8: {
      walls: [
        {x: 92, y: 64*5, w: 15, h: 1},
        {x: 92, y: 0, w: 1, h: 8},
        {x: game.width - 64*5, y: 64*5, w: 10, h: 1},
        {x: world.centerX - b*3, y: 64*8+b, w: 8, h: 1},
        {x: game.width - 64*5, y: 64*5, w: 1, h: 8},
      ],
      police: [
        {
          x: game.width - 400,
          y: world.centerY + 200,
          radius: 200,
          tweenProps: {x: 200, y: 400},
          easing: Phaser.Easing.Linear.None,
          speed: 2800
        }
      ],
      gem: bottomRight,
      player: {
        x: 20,
        y: 20
      }
    },
    9: {
      walls: [
        {x: 0, y: 64, w: 4, h: 1},
        {x: b*6, y: 64, w: 4, h: 1},
        {x: b*3, y: b*5, w: 2, h: 1},
        {x: b*3, y: b*9, w: 2, h: 1},
        {x: b*7, y: b*7, w: 2, h: 1},
        {x: 0, y: b*12, w: 10, h: 1},
      ],
      police: [
        {
          x: world.centerX + 16,
          y: world.centerY - 200,
          radius: 250,
          tweenProps: {x: 200, y: world.centerY - 150},
          easing: Phaser.Easing.Linear.None,
          speed: 2800
        }
      ],
      gem: bottomRight,
      player: {
        x: 20,
        y: 20
      }
    },
    10: {
      walls: [
        {x: world.centerX-b*2-16, y: b*8, w: 8.5, h: 1},
        {x: world.centerX-b*2-16, y: b*11, w: 5, h: 1},
        {x: b*12+16, y: b*9, w: 1, h: 2},
        {x: b*11, y: b*4, w: 1, h: 1},
        {x: b*15, y: b*2, w: 1, h: 1},
        {x: b*17, y: b*3, w: 1, h: 1},
        {x: b*21, y: b*6, w: 1, h: 1},
        {x: b*20, y: b*9, w: 1, h: 2},
        {x: b*18-16, y: b*12, w: 1, h: 1},
        {x: b*20, y: b*12, w: 1, h: 1},
        {x: b*23, y: 0, w: 1, h: 10},
        {x: b*23, y: b*11, w: 1, h: 5},
        {x: b*11, y: b*18, w: 1, h: 1},
        {x: b*15-1, y: b*18, w: 1, h: 1},
        {x: b*17, y: b*19, w: 1, h: 1},
        {x: b*19, y: b*16, w: 5, h: 1},
      ],
      police: [
        {
          x: 330,
          y: 200,
          radius: 250,
          tweenProps: {x: world.centerX + 100},
          speed: 3500
        },
        {
          x: 330,
          y: game.height - 100,
          radius: 250,
          tweenProps: {x: world.centerX + 100},
          speed: 3500
        },
      ],
      gem: {
        x: world.centerX,
        y: world.centerY
      },
      player: {
        x: 16,
        y: world.centerY
      }
    },
  };
};
