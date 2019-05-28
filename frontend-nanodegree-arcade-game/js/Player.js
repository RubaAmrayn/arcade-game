// Creating Class Player with all needed Functionalities.
// i needed alive and win pointers to check if the player really win or die. it's needed to print the message.
var Player = function(x, y, width, height) {
  "use strict";
  Creature.call(this, x, y, width, height, 'images/char-princess-girl.png');
  this.alive = true;
  this.win = false;
  this.lifeChances = 3;
  this.lastLifeChance='';
  this.heart = 10;
};



Player.prototype.update = function() {
  "use strict";
  var keyPressed = this.pressedKey;
//عند ضغط احد الازرار التاليه يتم تغيير احداثي اكس او واي حسب الزر الذي تم ضغطه
  switch (keyPressed) {
    case 'up':
      if (this.y > 0) {
        this.y -= 50;
      }
      break;

    case 'down':
      if (this.y < 400) {
        this.y += 50;
      }
      break;

    case 'left':
      if (this.x > 0) {
        this.x -= 50;
      }
      break;

    case 'right':
      if (this.x < 400) {
        this.x += 50;
      }
      break;

    case 'enter':
      reseting();
      break;
    default:

  }

  // to stop looping through the same movement. we need it to move once.
  this.pressedKey = null;
  "use strict";
  // player reaches the water!
  if (this.y < 0) {
    this.win = true;
    this.heart += 10;
    allowedKeys = {
      13: 'enter'
    };
    this.reset();
  }


  if (this.checkCollisions(star[0])) {
    this.heart += 10;
    star[0].randomize();
  }


  // I need a refrence to the player inside the clouser of the forEach. that's why i declare a global var to that function.
  var player = this;

  enemies.forEach(enemy=> {
    if (player.checkCollisions(enemy)) {
      player.heart -= 10;
      player.reset();
    }
  });

};

Player.prototype.checkCollisions = function(collidedObject) {
  "use strict";
  
  var playerBox = {x: this.x, y: this.y, width: 50, height: 40};
  var objectBox = {x: collidedObject.x, y: collidedObject.y, width: collidedObject.width/3 , height: collidedObject.height/3};
  if (playerBox.x < objectBox.x + objectBox.width &&
        playerBox.x + playerBox.width > objectBox.x &&
        playerBox.y < objectBox.y + objectBox.height &&
        playerBox.height + playerBox.y > objectBox.y) {
      return true;
    }

}


Player.prototype.checkCollisionss = function(collidedObject) {
  "use strict";
  if (this.x > collidedObject.x && this.x < collidedObject.x + this.width && this.y > collidedObject.y && this.y < collidedObject.y + this.height)
    return true;
}

Player.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

Player.prototype.handleInput = function(e) {
  "use strict";
  this.pressedKey = e;
};


Player.prototype.reset = function() {
  "use strict";
  this.x = 200;
  this.y = 440;
};
