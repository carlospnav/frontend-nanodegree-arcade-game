/*Entities is Player and Enemy's base class. It takes a  sprite url,
an object with x and y values and a hitbox object with sizeX and sizeY dimensions*/
var Entity = function(sprite, position, hitbox){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = position.x;
    this.y = position.y;
    this.hitbox = hitbox;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
}
Entity.prototype = {
    // Draw the enemy on the screen, required method for game
    "render" : function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
};


// Enemies our player must avoid
var Enemy = function(position, hitbox) {
    this.speed = this.speedChange();
    Entity.call(this, 'images/enemy-bug.png', position, hitbox);
};

Enemy.prototype = Object.create(Entity.prototype, {
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update : { value: function(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        // Ps: I decided to move collision handling to Player. 
        this.x += 500 * dt * this.speed;
    }},
    speedChange : { value: function(){
        var speed = Math.random() + 0.1;
        this.speed = speed;
        return speed;
    }}
});
Enemy.prototype.constructor = Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(hitbox) {
    Entity.call(this, 'images/char-boy.png', {x: 205, y: 380}, hitbox);
};

Player.prototype = Object.create(Entity.prototype, {
    // In the future, this would be the place to add more functionalities to the player.
    update : { value: function(){

    }},
    // Checks for collisions with enemies passed as parameter to the function. If it detects
    // a collision, returns true. Otherwise, false.
    checkCollision: { value: function(enemy){
        var collision;
        ((player.x + this.hitbox.sizeX) > enemy.x && player.x < (enemy.x + enemy.hitbox.sizeX) 
        &&
        ((player.y + this.hitbox.sizeY) > enemy.y && player.y < (enemy.y + enemy.hitbox.sizeY)))
        ?
        collision = true : collision = false;
        return collision;
    }},
    // Handles the way the player object responds to input such as key presses
    // and sends the axis in which the player is attempting to move to the function
    // that checks for moves out of the boundaries of the board. 
    handleInput: { value: function(keyCode){
        var axis,
            xIncrement = 100,
            yIncrement = 85;
        switch(keyCode){
            case 'left':
                this.x -= xIncrement;
                axis = 'x';
                break;
            case 'up':
                this.y -= yIncrement;
                axis = 'y';
                break;
            case 'right':
                this.x += xIncrement;
                axis = 'x';
                break;
            case 'down':
                this.y += yIncrement;
                axis = 'y';
                break;
        }
        this.checkBoundaries(axis);
    }},
    //Checks whether the player is attempting to leave the field
    //and prevents that move.
    checkBoundaries: { value: function(axis){
        switch(axis){
            case 'x':
                if (this[axis] < 5)
                    this[axis] = 5;
                else if (this[axis] > 405)
                    this[axis] = 405;
                break;
            case 'y':
                if (this[axis] < -45)
                    this[axis] = -45;
                else if(this[axis] > 380)
                    this[axis] = 380;
                break;
        }
    }}
});
Player.prototype.constructor = Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// The entities are being instantiated inside Engine to 
// facilitate board resets.

var allEnemies, player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

