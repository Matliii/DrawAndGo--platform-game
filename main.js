// Hue.
let hue = 0;

// Game based variables.
let frames = 0;
let score = 0;
let lives = 3;
let gamespeed = 4;
let isGameOver = false;

let isInTitleScreen = false;

// Character falling speed.
let fallingSpeed = 0;

//Starting screen mode.
const mode = 0;
const startgame = "Start a game";

//Start screen image
const backgroundImg = new Image();
backgroundImg.src = "https://drive.google.com/uc?export=download&id=12_3oI-tvKTP6nklTSMQZ_jyv8ocxoaLI";

// Ending title
const gameover = "Game Over";

// Frame rate limitter.
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;



// Get the Canvas element and the 2D context for rendering.
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

// Background for game.
// Background image from: https://depositphotos.com/vector-images/game-seamless-background.html
const background = new Image();
background.src = "https://drive.google.com/uc?export=download&id=1HIFyv1rceqVJiqBpjI6Yzhrqh1YBKJ-5";
const BackGround = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

// Number of particles drawn at a time.
let numberOfparticles = (canvas.width * canvas.height) / 500;

// Add event listener for resize event to canvas.
window.addEventListener("resize", function(e){
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
});


// Frame rate limiter base on https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe/58560177#58560177
// Initialize Frame rate limited animation.
function startAnimating(fps){

    // Check if game over.
    if(isGameOver) return;
    
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    //Mode = 0: startgame screen
    if(mode == 0) {
        
        startGame();
    }
    //Mode = 1: Skips startgame screen
    else if(mode == 1){
        animate();
    }
}

// Animate with limited frame rate.
function animate() {

    // Check if game over.
    if(isGameOver) return;
    
    // Request another frame.
    requestAnimationFrame(animate);

    // Calc elapsed time since last animation loop.
    now = Date.now();
    elapsed = now - then;

    // If enough time has elapsed, draw the next frame.
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        
        // Actual animation to play.
        animateMain();
    }
}

// Function to start game in title screen.
function startGame(){
     // Disable title screen draw.
     isInTitleScreen = true;
    
      
     // Add event listener for resize event to canvas.
     window.addEventListener("resize", function(e){
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        drawTitleScreen();
    });

    // Draw title screen.
    drawTitleScreen();

    // Add event listener for resize event to canvas.
    document.addEventListener("keypress", function(e){
        if(e.key == "Enter"){
            isInTitleScreen = false;
            animate();
        }
    });
}

// Function to draw title screen.
function drawTitleScreen(){
    // Draw title screen.
    ctx.drawImage(backgroundImg, 0 , 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
    ctx.font = "52px Sans";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeText(startgame, canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.5);
    ctx.fillText(startgame, canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.5);
    ctx.font = "36px Sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeText("Press Enter to begin new game.", canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.6)
    ctx.fillText("Press Enter to begin new game.", canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.6)
}

// Based on code from Frank's Laboratory.
// Function to handle background draw.
function handleBackGround(){

    // Update backgroud and handle resize.
    let numImages = Math.ceil(canvas.width / background.width) + 1;

    if(BackGround.x1 <= -BackGround.width + gamespeed){
        BackGround.x1 = BackGround.width;
    }
    else{
        BackGround.x1 -= gamespeed;
    }
    if(BackGround.x2 <= -BackGround.width + gamespeed){
        BackGround.x2 = BackGround.width;
    }
    else{
        BackGround.x2 -= gamespeed;
    }

    for (let i = 0; i < numImages; i++){
        ctx.drawImage(background, i * BackGround.width + BackGround.x1, BackGround.y, BackGround.width + gamespeed, BackGround.height);
        ctx.drawImage(background, i * BackGround.width + BackGround.x2, BackGround.y, BackGround.width + gamespeed, BackGround.height);
    }

    // Set general variables for text draw.
    ctx.font = "30px Sans";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    // Draw score.
    ctx.textAlign = "left";
    ctx.strokeText("Score: " + score, canvas.getBoundingClientRect().width * 0.75, canvas.getBoundingClientRect().height * 0.1);
    ctx.fillText("Score: " + score, canvas.getBoundingClientRect().width * 0.75, canvas.getBoundingClientRect().height * 0.1);
    
    
}

// Function to handle lives.
function handleLives(){

    // Draw Lives.
    if(lives == 3)
        ctx.fillStyle = "green";
    if(lives == 2)
        ctx.fillStyle = "yellow";
    if(lives == 1)
        ctx.fillStyle = "red";
    
    ctx.textAlign = "right";
    ctx.strokeText("Lives: " + lives, canvas.getBoundingClientRect().width * 0.25, canvas.getBoundingClientRect().height * 0.1);
    ctx.fillText("Lives: " + lives, canvas.getBoundingClientRect().width * 0.25, canvas.getBoundingClientRect().height * 0.1);

    // Game Over.
    if(lives == 0){
        gameOver();
    }
}

// Main function for animating game scene.
function animateMain(){

    // Clear canvases.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    platctx.clearRect(0, 0, platCanvas.width, platCanvas.height);

    // Draw background.
    handleBackGround();

    // Draw character model and update it.
    character.draw();
    character.update();

    // Call new particle initialization for character effect and drawing.
    handleParticlesCharacter();

    // Handle platform draw.
    handlePlatformDraw();

    // Handle collectibles generation.
    handleCollectibles();

    // Handle tree obstacles.
    handleLogObstacles();

    // Handle arraws draw.
    handleArrows();

    // Handle collisions.
    handleCollisions();

    // Handle lives.
    handleLives();

    // Handle character falling.
    handleFalling();
  
    // Loop music if game is not overs
    if(!isGameOver){
      music.play();
    }
    
    // Handle game over.
    if(isGameOver) return;

    // Add hue for nice rainbow color effect on draw.
    hue+=2;

    // Add frame.
    frames++;
}

// Function for collision detection.
function handleCollisions(){
    let platform;
    let collectible;
    let arrow;
    let log;
    let log2;

    let y1;
    let y2;
    let x1;
    let x2;

    //Checking for platform collisions.
    for (let i = 0; i < platforms.length; i++) {
        platform = platforms[i];
        let objectAngle = platform.angle;

        // Update platform coordinates based on draw direction.
        if(platform.startYCoord < platform.endYCoord){
            y1 = platform.endYCoord;
            y2 = platform.startYCoord;
            x1 = platform.endXCoord;
            x2 = platform.startXCoord;
        }
        else{
            y1 = platform.startYCoord;
            y2 = platform.endYCoord;
            x1 = platform.startXCoord;
            x2 = platform.endXCoord;
        }
        
        // See when character is colliding with platform.
        if (pointCloseToLine(platform.startXCoord, platform.startYCoord, platform.endXCoord, platform.endYCoord, (character.hitBoxX + character.hitBoxW), (character.hitBoxY + character.hitBoxH), 5) && 
        (character.hitBoxX + character.hitBoxW) >= x1 &&
        (character.hitBoxX + character.hitBoxW) <= x2 &&
        (character.hitBoxY + character.hitBoxH) <= y1 &&
        (character.hitBoxY + character.hitBoxH) >= y2){

            
            character.y = character.y - 0.3 * Math.abs(objectAngle);
            character.hitBoxY = character.hitBoxY - 0.3 * Math.abs(objectAngle);
            character.isColliding = true;
            fallingSpeed = 0;
        }
        // No longer colliding.
        else{
            character.isColliding = false;
        }
    }
    
    // Collectible collision detection.
    for(let i = 0; i < collectiblesArray.length; i++){
        collectible = collectiblesArray[i];
        if (rectIntersect(collectible.hitBoxX, collectible.hitBoxY, collectible.hitBoxW, collectible.hitBoxH, character.hitBoxX, character.hitBoxY, character.hitBoxW, character.hitBoxH) && collectible instanceof Collectible && !collectible.hasCollided){
            //Rule out secondary collision.
            collectible.hasCollided = true;
            collectiblesArray.splice(i, 1);
            collectible_sound.play();
            score++;
            continue; 
        }
    }

    // Arrow collision detection.
    for(let i = 0; i < arrowArray.length; i++){
        arrow = arrowArray[i];
        if (rectIntersect(arrow.hitBoxX, arrow.hitBoxY, arrow.hitBoxW, arrow.hitBoxH, character.hitBoxX, character.hitBoxY, character.hitBoxW, character.hitBoxH) && arrow instanceof Arrow && !arrow.hasCollided){
            
            //Rule out secondary collision.
            arrow.hasCollided = true;

            // Remove object.
            arrowArray.splice(i, 1);

            // Play hit sound.
            arrowHit_sound.play();

            // Lose life.
            lives --;    

            // If no lives left -> Game Over.
            if(lives == 0){
                gameOver();
            }

            continue; 
        }
    }

    // Log top collision detection:
    for(let i = 0; i < logObstacleArray.length; i++){
        log2 = logObstacleArray[i];
        if (rectIntersect(log2.hitBoxX2, log2.hitBoxY2, log2.hitBoxW2, log2.hitBoxH2, character.hitBoxX, character.hitBoxY, character.hitBoxW, character.hitBoxH) ){
            
            //Rule out secondary collision.
            character.isColliding = true;

            // Reset falling speed
            fallingSpeed = 0;

            // Play sound.
            if((character.y + character.height) < (log2.hitBoxY2 + log2.hitBoxH2+45)){
                logRoll_sound.play();
            }

            continue;
        }
    }

    //This is failcheck for log top collision
    character.isColliding = false;

    // Log collision detection:
    for(let i = 0; i < logObstacleArray.length; i++){
        log = logObstacleArray[i];
        if (rectIntersect(log.hitBoxX, log.hitBoxY, log.hitBoxW, log.hitBoxH, character.hitBoxX, character.hitBoxY, character.hitBoxW, character.hitBoxH) && character.y <= log.hitBoxY && !character.isColliding){
            //Rule out secondary collision.
            log.hasCollided = true;

            // Reset falling speed
            fallingSpeed = 0;

            // Remove object.
            logObstacleArray.splice(i, 1);

            // Play sound.
            logHit_sound.play();

            // Lose life.
            lives --;

            // If no lives left -> Game Over.
            if(lives == 0){
                gameOver();
            }
            continue;
        }
    }
}

// Function to handle character falling after platform collision ends.
function handleFalling(){

    // When no longer colliding with platform.
    if(character.isColliding == false){
        if(!pointCloseToLine((character.hitBoxX + character.hitBoxW+1), (character.hitBoxY + character.hitBoxH+1), (character.hitBoxX + character.hitBoxW), (character.hitBoxY + character.hitBoxH),(character.hitBoxX + character.hitBoxW), (character.yConst + character.hitBoxH+40), 5)){
            fallingSpeed = fallingSpeed +0.04;
            character.y = character.y + fallingSpeed ;
            character.hitBoxY = character.hitBoxY + fallingSpeed;
        }
        else{
            // Reset falling speed
            fallingSpeed = 0;
        }
    }
}

// Function to stop game and print game over screen.
function gameOver(){

    // Set game to be over.
    isGameOver = true;

    // Draw information about game over.
    ctx.font = "40px Sans";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeText(gameover, canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.5);
    ctx.fillText(gameover, canvas.getBoundingClientRect().width * 0.5, canvas.getBoundingClientRect().height * 0.5);
    ctx.font = "30px Sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeText("Press Enter to return to title screen", canvas.getBoundingClientRect().width * 0.5 , canvas.getBoundingClientRect().height * 0.6)
    ctx.fillText("Press Enter to return to title screen", canvas.getBoundingClientRect().width * 0.5 , canvas.getBoundingClientRect().height * 0.6)

    // Handle game over sound playing.
    music.pause();
    gameOver_sound.play();
    

    // Add event listener for resize event to canvas.
    document.addEventListener("keypress", function(e){
        if(e.key == "Enter"){
            document.location.reload();
            music.play();
        }
    });
    
}

// Geometry calculations helper section.

// Find angle between point in given coordinates.
function findLineAngle(xStart, xEnd, yStart, yEnd){

    let dy = yEnd - yStart;
    let dx = xEnd - xStart;

    // Calculate angle.
    let angle = Math.atan2(-dy, dx);

    // Convert to degrees.
    angle *= 180/Math.PI

    if (angle < 0) angle += 180;

    return angle;
}

// Calculates lines slope.
function calcLineK(startXCoord, startYCoord, endXCoord, endYCoord){
    let deltaX = endXCoord - startXCoord;
    let deltaY = endYCoord - startYCoord;
    let k = deltaY/deltaX;
    return k;
}

// Calculates lines constant.
function calcLineB(startXCoord, startYCoord, k){
    let b = startYCoord-(k*startXCoord);
    return b;
}

// Calculates if a point is on a line.
function isPointInLine(pointX,pointY, k, b){
    if(pointY - (k*pointX) == b ){
        return true;
    }
    else{
        return false;
    }
}

// Calculates points distance to a line and return true if it is close enough.
function pointCloseToLine(startXCoord, startYCoord, endXCoord, endYCoord, charHitCornerX, charHitCornerY, threshold){
    let deltaX = endXCoord - startXCoord;
    let deltaY = endYCoord - startYCoord;
    var distance = Math.abs(deltaY * charHitCornerX - deltaX*charHitCornerY - startXCoord * endYCoord + endXCoord * startYCoord) / Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    var threshold = threshold;
    if (distance < threshold){
        return true;
    }
    else{
        return false;
    }
}

// Get distance between two points.
function getDistance(x1, y1, x2, y2) {

    let xDist = x2 - x1;
    let yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Calculates if two rectangles overlap.
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }

    return true;
}  