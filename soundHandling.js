//Virtual channel switching by Tim Cotten
//https://blog.cotten.io/playing-audio-resources-simultaneously-in-javascript-546ec4d6216a
function Channel(audio_uri){
    this.audio_uri = audio_uri;
    this.soundEffect = new Audio(audio_uri)
  }
  
  Channel.prototype.play = function() {
    this.soundEffect.play();
  }
  Channel.prototype.pause = function() {
    this.soundEffect.pause();
  }
  
  function Switcher(audio_uri, num){
    this.channels = [];
    this.num = num;
    this.index = 0;
    
    for (var i = 0; i < num; i++){
      this.channels.push(new Channel(audio_uri));
    }
  }
  
  Switcher.prototype.play = function() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  }

  Switcher.prototype.pause = function() {
    this.channels[this.index].pause();
    this.index = this.index < this.num ? this.index : 0;
  }
  
   //The free sounds effects were mainly downloaded by these sites: https://www.soundsnap.com/ and https://mixkit.co/
  collectible_sound = new Switcher("https://drive.google.com/uc?export=download&id=1ryqINxB5_JeAHEwC-44E3-tCiMIZVLY5", 5);
  gameOver_sound = new Switcher("https://drive.google.com/uc?export=download&id=1FjVoh75GtXIOkwrM-ZCdqftHFp2Dw36P", 1);
  logRoll_sound = new Switcher("https://drive.google.com/uc?export=download&id=1PeTaoJ05YSZ5iAAs4nMMDsoCiL184qwl", 1);
  logHit_sound = new Switcher("https://drive.google.com/uc?export=download&id=15qZYeGC_AAjD7HDMGlEsfJYkNfBvqM5J", 5);
  arrowHit_sound = new Switcher("https://drive.google.com/uc?export=download&id=10Hv4SYARF8ngAGpMvzjbYDqbTpxfpJza", 5);
  
  music = new Switcher("https://drive.google.com/uc?export=download&id=13p1yi3zKVmdA9ginl5QWvHjXbmyqq1FW", 1 ) // This music was made by joshuaempyre, licensed under CCBY 3.0, https://freesound.org/s/250749/ 



