const arrowArray = [];

const arrowSprite = new Image();
arrowSprite.src = "https://drive.google.com/uc?export=download&id=1qcMrazJMsVlAdzrySEJOY6Iz6MpPHy_C";

// Arrow class.
class Arrow{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height / 2 + (Math.random() * (200 - 10) + 10);
        this.originalWidth = 100;
        this.originalHeight = 100;
        this.width = 100;
        this.height = 100;
        this.frameX = 0;


        // Hitbox.
        this.hasCollided = false;
        this.hitBoxX = this.x+10;
        this.hitBoxY = this.y+43;
        this.hitBoxW = this.width-20;
        this.hitBoxH = this.height-85;
    }
    // Draw Arrow.
    draw(){
        ctx.drawImage(arrowSprite,  0 , 0, this.originalWidth, this.originalHeight, this.x, this.y, this.width, this.height); // Arrow item.
    } 
    // Function to update Arrow.
    update(){
        // Move arrows from the right edge of canvas towards left edge.
        this.x -= gamespeed+1;
        this.hitBoxX -=gamespeed+1;

        // Draw new Arrow on update -> generates arrows
        this.draw();
    }
}

// Function to handle arrow generation.
function handleArrows(){

    let rand = Math.random();
    
    // New Arrow.
    if(rand > 0.5 && frames%60 === 0){
        let newArrow = new Arrow;
        arrowArray.unshift(newArrow);
    }

    // Update arrow.
    for(let i = 0; i < arrowArray.length; i++){
        arrowArray[i].update();

        // Remove Arrow if going off screen.
        if(arrowArray[i].x + arrowArray[i].width < canvas.getBoundingClientRect().left){
            arrowArray.pop(arrowArray[i]);
        }
    }
}