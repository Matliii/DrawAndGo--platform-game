// List for platforms.
const platforms = []
const platformLength = []

// Variables for mouse tracking.
let prevXCoord, prevYCoord, currXCoord, currYCoord = 0;
let startXCoord, startYCoord, endXCoord, endYCoord = 0;

// Flags.
let drawflag = false;
let tooLong = false;

// Timeout variable for debouncing events.
let timeout;

// Line length checker for max line length restriction.
let lineLength = 0;

// Get the Canvas element and the 2D context for rendering.
const platCanvas = document.getElementById("platformCanvas");
const platctx = platCanvas.getContext("2d");
platCanvas.width = platCanvas.getBoundingClientRect().width;
platCanvas.height = platCanvas.getBoundingClientRect().height;

// Add event listener for resize event to canvas.
window.addEventListener("resize", function(e){
    platCanvas.width = platCanvas.getBoundingClientRect().width;
    platCanvas.height = platCanvas.getBoundingClientRect().height;
});

// Add evenlisteners for mouse events to canvas.
platCanvas.addEventListener("mousemove", function(e){
    findMouseCoordinates("move", e)

    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
    });
});

platCanvas.addEventListener("mousedown", function(e){
    findMouseCoordinates("down", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
    });
});
platCanvas.addEventListener("mouseup", function(e){
    findMouseCoordinates("up", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
    });
});

platCanvas.addEventListener("mouseout", function(e){
    findMouseCoordinates("out", e)
    // If there's a timer, cancel it
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
    });
});

// Function to find current mouse coordinates and do actions based on the mouse event.
function findMouseCoordinates(response, e) {

    // Mousedown event.
    if(response == 'down'){
        prevXCoord = currXCoord;
        prevYCoord = currYCoord;
        currXCoord = e.clientX - platCanvas.getBoundingClientRect().left;
        currYCoord = e.clientY - platCanvas.getBoundingClientRect().top;

        // Restrict drawing area.
        if(currYCoord > canvas.height * 0.60 && currYCoord < canvas.height * 0.93 && !isGameOver && !isInTitleScreen){
            // Enable draw.
            drawflag = true;
            tooLong = false;

            // Initialize new platform.
            platforms.unshift(new gamePlatform(currXCoord, currYCoord))
        }
    }

    // Mouseup event.
    if(response == 'up'){
       
        // If drawing is enabled.
        if(drawflag){
            endXCoord = currXCoord;
            endYCoord = currYCoord;

            // Update endcoordinates and draw.
            for(let i = 0; i < platforms.length; i++){
                if(platforms[i].isFinished == false){
                    platforms[i].updateCoords(endXCoord, endYCoord);
                    platforms[i].draw();
                    platforms[i].setAsFinished();
                }
            }
        }
        // Disable draw.
        drawflag = false;
        endXCoord, endYCoord = 0;
    }

    // Mousemove event.
    if(response == 'move'){
        if(drawflag){
            prevXCoord = currXCoord;
            prevYCoord = currYCoord;
            currXCoord = e.clientX - platCanvas.getBoundingClientRect().left;
            currYCoord = e.clientY - platCanvas.getBoundingClientRect().top;
            // Update endcoordinates and draw.
            for(let i = 0; i < platforms.length; i++){
                if(platforms[i].isFinished == false){
                    platforms[i].updateCoords(currXCoord, currYCoord);
                    lineLength = platforms[i].lineLength;
                    platforms[i].draw();
                }
                if(lineLength >= 4000){
                    platforms[i].setAsFinished();
                    lineLength = 0;
                    drawflag = false;
                    endXCoord, endYCoord = 0;
                }
            }
        }
    }
}

// Class for particles, used for drawn platform object generation from mouse.
class gamePlatform{
    constructor(xStart, yStart){
        this.startXCoord = xStart;
        this.startYCoord = yStart;
        this.color = "hsl(" + hue +", 100%, 50%)";
        this.width = 15;
        this.isDrawn = false;
        this.isFinished = false;
        this.lineLength = 0;

        // Hitbox
        this.hitBoxX = undefined
        this.hitBoxY = undefined
        this.hitBoxH = this.width;
        this.hitBoxW = 0;
    }
    draw(){
        // Draw platform.
        platctx.beginPath();
        platctx.moveTo(this.startXCoord, this.startYCoord);
        platctx.lineTo(this.endXCoord, this.endYCoord);
        platctx.lineWidth = this.width;
        platctx.strokeStyle = this.color;
        platctx.closePath();
        platctx.stroke();
        this.isDrawn = true;
        this.angle = findLineAngle(this.startXCoord, this.endXCoord, this.startYCoord, this.endYCoord);
    }
    showAngle(){
        //Show current angle.
        platctx.beginPath();
        platctx.rect
        platctx.font = "25px Sans";
        platctx.fillStyle = "white";
        platctx.strokeStyle = "transparent";
        platctx.closePath();
        platctx.strokeText(Math.floor(this.angle) + "°", this.endXCoord + this.width * 1.5, this.endYCoord + this.width * 1.5);
        platctx.fillText(Math.floor(this.angle) + "°", this.endXCoord + this.width * 1.5, this.endYCoord + this.width * 1.5);
    }
    updateCoords(xEnd, yEnd){
        // Update end coordinates.
        this.endXCoord = xEnd;
        this.endYCoord = yEnd;
        this.lineLength += getDistance(this.startXCoord, this.startYCoord, this.endXCoord, this.endYCoord)
    }
    setAsFinished(){
        // Set line as finished -> drawing and rendering ready.
        this.isFinished = true;
    }
    update(){
        // Update line.
        if(this.isDrawn){
            this.color = "hsl(" + hue +", 100%, 50%)";
            this.startXCoord -= gamespeed;
            this.endXCoord -= gamespeed;
            this.draw();
            if(this.isFinished == false){
                this.showAngle();
            }
        }
    }
}

// Function to handle platform draw.
function handlePlatformDraw(){

    // Coordinate to define removal (dependent on draw direction).
    let removalCoord;

    // For each platform.
    for(let i = 0; i < platforms.length; i++){

        // Update coordinates.
        platforms[i].update();

        // Check draw direction to determine removal parameter.
        if(platforms[i].startXCoord < platforms[i].endXCoord){
            removalCoord = platforms[i].endXCoord;
        }
        else{
            removalCoord = platforms[i].startXCoord;
        }

        // Handle removal of platforms.
        if(removalCoord < platCanvas.getBoundingClientRect().left){
            platforms.pop(platforms[i]);
        }
    }
}