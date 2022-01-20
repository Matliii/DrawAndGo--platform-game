const collectiblesArray = [];

const collectibleSprite = new Image();
collectibleSprite.src = "https://drive.google.com/uc?export=download&id=1stbIFQUU5uZQ2eOVM8h2pbKqkb9zko1O";

// Collectible class.
class Collectible{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height / 2 + (Math.random() * (200 - 10) + 10);
        this.originalWidth = 512;
        this.originalHeight = 128;
        this.width = this.originalWidth / 4;
        this.height = this.originalHeight;
        this.frameX = 0;
        this.hasCollided = false;
        this.hitBoxX = this.x + 15;
        this.hitBoxY = this.y + 15;
        this.hitBoxW = this.width - 34;
        this.hitBoxH = this.height - 34;
    }
    // Draw collectible.
    draw(){
        ctx.drawImage(collectibleSprite,  this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x, this.y, this.width, this.height); // Collectible item.
    } 
    // Function to update collectible.
    update(){
        // Move collectibe from the right edge of canvas towards left edge.
        this.x -= gamespeed;
        this.hitBoxX -= gamespeed;

        // Draw new collectible on update -> generates collectibles.
        this.draw();

        // Handle character animation.
        if(this.frameX >= 4){
            this.frameX = 0;
        }
        else if(frames%30 === 0){
            this.frameX++;
        }
    }
}

// Function to handle collectibles generation.
function handleCollectibles(){
    let rand = Math.random();
    
    // New collectible.
    if(rand > 0.6 && frames%70 === 0){
        collectiblesArray.unshift(new Collectible);
    }

    // Update collectibles.
    for(let i = 0; i < collectiblesArray.length; i++){
        collectiblesArray[i].update();

        // Remove collectible if going off screen.
        if(collectiblesArray[i].x + collectiblesArray[i].width < canvas.getBoundingClientRect().left){
            collectiblesArray.pop(collectiblesArray[i]);
        }
    }
}