//game creature
var Creature = function(x, y, width, height, sprite) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};
Creature.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};

//game Enemy
// Creating Class Enemy with all needed Functionalities.
var Enemy = function(x, y, width, height) {
  "use strict";
Creature.call(this, x, y, width, height, 'images/enemy-bug.png');
this.speed = Math.floor(Math.random() * 300 + 100);
};

// it increments the x position of the enemy until it reach the end of the canvas the it back again to the zero point.
Enemy.prototype.update = function(dt) {
  "use strict";
if (this.x <= 500)
  this.x += this.speed * dt;
else
  this.x = 0;
};
Enemy.prototype.render = function() {
  "use strict";
ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width  ,this.height);
};
// it resets everything after winning or losing the player the game. it turns back everything to the default state.
var reseting =()=> {
  player.win = false;
  if (player.heart < 0)
    player.heart = 10;
  else
    player.heart += 10;

  if (playerLifes.length <= 0) {
    playerLifes = createLifes();
  }

  allowedKeys = {
    13: 'enter',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
}

let createEnemies=()=> {
  var enemies = [];
  var enemyXPosition = 60;

  for (var i = 0; i < 3; i++) {
    enemies.push(new Enemy(0, enemyXPosition, 100, 180));
    enemyXPosition += 80;
  }
//60 
//60+80=140
//140+80 = 200
  return enemies;
}

let createLifes=()=> {
  var xPosition = 190;
  var playerLifes = [];

  for (var i = 0; i < player.lifeChances; i++) {
    playerLifes.push(new Player(xPosition, -35, 50, 100));
    xPosition += 50;
  }
  player.lastLifeChance = xPosition;
  return playerLifes;
}

let createStar=()=> {

  var star = [];
  star.push(new Star(50, 100));

  return star;
}

let handleKeyUpListener=e=> {
  allowedKeys = {
    13: 'enter',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
}

var player = new Player(200, 440, 99, 170);
var enemies = createEnemies();
var playerLifes = createLifes();
var star = createStar();
var heart = new Heart(460, 5, 40, 40);

document.addEventListener('keyup', handleKeyUpListener);
