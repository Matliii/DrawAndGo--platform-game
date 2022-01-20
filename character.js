const catSprite = new Image();
catSprite.src = "https://drive.google.com/uc?export=download&id=1hymPr5mBcvexoHjN0qtGlvGZ4Qa2RcJV";

// Character class.
class Character{
    constructor(){
        this.x = document.getElementById("gameCanvas").getBoundingClientRect().width * 0.15;
        this.y = document.getElementById("gameCanvas").getBoundingClientRect().height * 0.75;
        this.yConst = document.getElementById("gameCanvas").getBoundingClientRect().height * 0.75;
        this.originalWidth = 1152;
        this.originalHeight = 128;
        this.width = this.originalWidth / 9;
        this.height = this.originalHeight;
        this.radius = Math.sqrt((this.width * this.height / 2) / Math.PI);
        this.frameX = 0;

        // Hitbox.
        this.isColliding = false;
        this.hitBoxX = this.x+33;
        this.hitBoxY = this.y+33;
        this.hitBoxW = this.width-80;
        this.hitBoxH = this.height-73;
    }
    // Draw character.
    draw(){
        ctx.drawImage(catSprite,  this.frameX * this.originalWidth / 9, 0, this.originalWidth / 9, this.originalHeight, this.x, this.y, this.width, this.height); // Character item.
    }
    // Function to update character.
    update(){
        // Update frame.
        if(this.frameX >= 9){
            this.frameX = 5;
        }
        else if(frames%10 == 0){
            this.frameX++;
        }
    }
}

// Create constant of character.
const character = new Character();
