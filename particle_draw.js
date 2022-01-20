// Based on code from Frank's Laboratory.

// Particle object lists for particles.
const particlesEffectArray = [];

// Class for particles effect for character.
class ParticleEffect{
    constructor(){
        this.x = character.x;
        this.y = character.y;
        this.radius = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = "hsl(" + hue +", 100%, 50%)";
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y * 1.08, this.radius, 0,  Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
    }
    update(){
        this.x -= gamespeed;
        this.y += this.speedY;
    }
}

// Initialize particles for drawing of particles from character.
function handleParticlesCharacter(){
    particlesEffectArray.unshift(new ParticleEffect);
    for(let i = 0; i < particlesEffectArray.length; i++){
        particlesEffectArray[i].update();
        particlesEffectArray[i].draw();
    }
    if(particlesEffectArray.length >= 200){
        for(let i = 0; i < particlesEffectArray.length*0.2; i++){
            particlesEffectArray.pop(particlesEffectArray[0]);
        }
    }
}