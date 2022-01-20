const logObstacleArray = [];

const logObstacleSprite = new Image();
logObstacleSprite.src = "https://drive.google.com/uc?export=download&id=1RYtMpQzE2NSQsuGuh05rMwaRoyIg0n9r";

const logObstacleSprite2 = new Image();
logObstacleSprite2.src = "https://drive.google.com/uc?export=download&id=1qkRoTDLsZMTX24Z9qRwk2RAWbXRU7hs9";


let random = Math.floor(Math.random() * 3);

// Tree obstacle class.
class logObstacle{
    constructor(){
        this.x = canvas.width;
        this.y = document.getElementById("gameCanvas").getBoundingClientRect().height * 0.75;
        this.originalWidth = 512;
        this.originalHeight = 128;
        this.width = this.originalWidth / 4;
        this.height = this.originalHeight;
        this.frameX = 0;

        //Hitbox.
        this.hasCollided = false;
        this.hitBoxX = this.x+23;
        this.hitBoxY = this.y+47;
        this.hitBoxW = this.width-55;
        this.hitBoxH = this.height-95;

        //hit box 2
        this.hitBoxX2 = this.x+23;
        this.hitBoxY2 = this.y+37;
        this.hitBoxW2 = this.width-45;
        this.hitBoxH2 = this.height-125;
    }
    // Draw log obstacle.
    draw(){
        // Randomly generate log obstacles.
        if(random == 0){
            this.hitBoxW =+220;
            this.hitBoxW2 =+225;
            ctx.drawImage(logObstacleSprite, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+50, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+100, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+150, this.y, this.width, this.height);
        }
        else if(random == 1){
            this.hitBoxW =+320;
            this.hitBoxW2 =+325;
            ctx.drawImage(logObstacleSprite, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+50, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+100, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+150, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+200, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+250, this.y, this.width, this.height);
            
        }
        else if (random == 2) {
            this.hitBoxW =+420;
            this.hitBoxW2 =+425;
            ctx.drawImage(logObstacleSprite, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+50, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+100, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+150, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+200, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+250, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+300, this.y, this.width, this.height);
            ctx.drawImage(logObstacleSprite2, this.frameX * this.originalWidth / 4, 0, this.originalWidth / 4, this.originalHeight, this.x+350, this.y, this.width, this.height);
        }
    } 
    // Function to update Log.
    update(){
        // Move Logs from the right edge of canvas towards left edge.
        this.x -= gamespeed+1;
        this.hitBoxX -=gamespeed+1;
        this.hitBoxX2 -=gamespeed+1;

        // Draw new Logs on update -> generates logs
        this.draw();

        // Handle character animation.
        if(this.frameX >= 4){
            this.frameX = 0;
        }
        else if(frames%20 === 0){
            this.frameX++;
        }
    }
}

// Function to handle tree obstacle generation.
function handleLogObstacles(){
    let rand = Math.random();
    
    // New Logs.
    if(rand > 0.8 && frames%80 === 0){
        if(logObstacleArray.length == 0){
            logObstacleArray.unshift(new logObstacle);
        }
    }

    // Update log.
    for(let i = 0; i < logObstacleArray.length; i++){
        logObstacleArray[i].update();

        // Remove Log if going off screen.
        if(logObstacleArray[i].x + logObstacleArray[i].width < canvas.getBoundingClientRect().left){
            logObstacleArray.pop(logObstacleArray[i]);
            
            //Generates new lenght of he platform
            generate();
        }
    }
}


//Generates random number between 1-3
function generate() {
    random = Math.floor(Math.random() * 3);
}