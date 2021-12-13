/*

A short description (3-5+ sentences) sharing the following information:
  The goal/purpose of your project
  The entire loop through which someone would go through to interaction with your piece.
 (How does the sketch start initially?
 How/when does the user start interacting with the sketch?
 What steps does the user take until they are finished interacting with the sketch?
 Are there different options/possible paths for the user to take when interacting
    with this sketch?
 What happens when the loop/interaction is finished?)

The goal of this piece is to create a camping experience for the user.
This character will begin seated at the fire, coaxing it to start.
Once the fire is going, they grab items to cook their food.
The scene will end when the player fails (blew out flame, burnt food) or goes to sleep.
The different paths for the character are in failure and order.
When the loop is finished, it will return to a title screen to replay.

Resources:
https://www.youtube.com/watch?v=cl-mHFCGzYk
https://freesound.org/people/lwdickens/sounds/529093/
https://freesound.org/people/ThatMisfit/sounds/413458/
https://www.youtube.com/watch?v=j_nV2jcTFvA
https://editor.p5js.org/REAS/sketches/S1TNUPzim
*/

var mic;
var butt;//(button) for restart
var flames = [];
var startButton;
var flag; // which screen
var timer;

//specific positions for flames which worked
var x = [10,-40,-50,-80,30,0,30]
var y = [0,20,0,30,30,20,50]
var size = [1.2, 1.35,1.3,1,1.25,1,1]

var snow = [];//holds snowflakes
var ambient; //bckground noise
//var fireSound;
var youDied; //sound
var growl;

var palette = {
  darkSienna: '#220901',
  blood: '#01172F', //oxford blue
  darkRed: '#941B0C',
  rust: '#BC3908',
  yellow: '#F6AA1C',
  almond: '#A7754D',
  ground: '#1d332f',
  tree1: '#261f12',
  tree2: '#2c3b2f'

};
//draw logs
var logs = {
  length: 200,
  width: 50,
  color1: palette.darkSienna,
  color2: palette.almond,
  display: function(x,y,rot){
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    translate(x,y);
    rotate(rot);
    noStroke();
    fill(this.color1);
    rect(0,0,this.length, this.width);
    ellipse(0-(this.length)/2,0,20,this.width);
    fill(this.color2)
    ellipse((this.length)/2,0,20, this.width);
    pop();
  }
}

class TheFire {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  display(){
    push();
    noStroke();
    rectMode(CENTER)
    scale(0.25);
    fill(palette.rust)
    flame(round(random(3)));
    pop();
  }
  moveFire(intensity){
    if (intensity > 3 && intensity < 9){
      if (millis() - timer > 3000){
        changeFlag();
      }
    }
    if (intensity>9){
      noLoop();
      background(palette.blood);
      logs.display(250,340,5);
      logs.display(200,400,20);
      logs.display(300,380,170);
      fill(palette.almond);
      //maybe new word for "extinguished"
      textSize(20);
      text("you blew out the flame... :(", 100,100);
      butt = createButton("try again");
      butt.position(100,150);
      butt.mousePressed(retry);
    }
  }
}

//https://www.youtube.com/watch?v=cl-mHFCGzYk
class SnowFlake {
  constructor(){
    let x = random(width);
    let y = random(-100,-10);
//using vector math
//https://p5js.org/reference/#/p5.Vector
    this.pos = createVector(x,y);
    this.vel = createVector(0,1);
    this.acc = createVector();
  }
  update(){
    this.pos.add(this.vel);
    this.pos.add()
    // if (this.pos.y>height){
    //   this.pos.y = -10;
    // }
  }
  render(){
    stroke(255,255,255,150);
    strokeWeight(4);
    point(this.pos.x, this.pos.y); //accesses vector <x,y>
  }
}



function preload(){
  //https://freesound.org/people/lwdickens/sounds/529093/
  ambient = loadSound("ambient.mp3");
  //fireSound = loadSound("fire.wav");
  //https://freesound.org/people/ThatMisfit/sounds/413458/
  growl = loadSound('growl.wav');
  //https://www.youtube.com/watch?v=j_nV2jcTFvA
  youDied = loadSound("darkSouls.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  ambient.loop();
  for (let i = 0; i<7; i++){
    flames.push(new TheFire(x[i],y[i],size[i]))
  }
  flag = 1;
}
// var x = 10;
// var y = 10;

function draw(){
  loop();
  frameRate(20);
  snow.push(new SnowFlake());
  if (flag == 1){
    titleScreen();
  }
  if (flag == 2){
    start();
    //fireSound.loop();
  }
  if (flag ==3){
    forest();
  }
  if (flag == 4){
    success();
  }
  if (flag == 0){
    deathScreen();
  }
  for (flake of snow){
    flake.update();
    flake.render();
  }
}

function success(){
  background(0);
  let color1 = color(1, 23, 47);
  let color2 = color(45, 66, 89)
  setGradient(color1, color2); // background
  fill(palette.ground); //green ground
  rectMode(CENTER)
  rect(width/2, height-50, width, 100);
  for (let i = 0; i < 30; i++){
    tree(20+50*i, height-120);
    tree(35+45*i, height-100)
  }
  //tiny fire
  //frameRate(10);
  noStroke();
  let fireX = width/2;
  let fireY = height-50;

  for (let i = 0; i<5; i++){
    ellipseMode(CENTER);
    fill(255, 221, 0, 50)
    let size = 100 + i**4;
    ellipse(fireX, fireY-i**2, size+random(4), size+random(6))
  }
  fill(palette.rust);
  quad(fireX,fireY, fireX+4, fireY+8, fireX, fireY+10, fireX-4,fireY+8);
  fill(50);
  rect(fireX, fireY+11,10,3)
  fill(95, 120, 125);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(100);
  //tex
  text("You Survived the Night", width/2, 250, width, 400);
}

function deathScreen(){
  //noLoop();
  ambient.pause();
  youDied.play();

  youDied.playMode('untilDone');
  //youDied.setLoop(false);
  //print(youDied.isLooping());
  background(0);
  //print(0);
  fill(palette.rust);
  noStroke();
  textSize(100);
  text('You Died', width/2, height/2  );
  print(flag);

  textSize(20);
  //text(cause, width/2, height/2 +100);
  youDied.onended(changeFlag);

}

function forest(){
  background(0);
  noStroke();
  fill(palette.almond);
  textSize(20)
  text("shh I think I heard something in the woods...", 400,400);
  var intensity = (mic.getLevel())*10;
  if (intensity > 2){
    growl.play();
    text("GGRRRWWWWRRR", 300,200);
  }
  if (intensity>8){
    timer = millis();
    flag = 0;
    growl.stop();
    ambient.loop();
  }
  if (millis()-timer>9000 ){
    changeFlag();
  }
}



function titleScreen(){
  let color1 = color(1, 23, 47);
  let color2 = color(45, 66, 89)
  setGradient(color1, color2); // background
  fill(palette.ground); //green ground
  rectMode(CENTER)
  rect(width/2, height-50, width, 100);
  for (let i = 0; i < 30; i++){
    tree(20+50*i, height-120);
    tree(35+45*i, height-100)
  }
  //tiny fire
  //frameRate(10);
  noStroke();
  let fireX = width/2;
  let fireY = height-50;

  for (let i = 0; i<5; i++){
    ellipseMode(CENTER);
    fill(255, 221, 0, 50)
    let size = 100 + i**4;
    ellipse(fireX, fireY-i**2, size+random(4), size+random(6))
  }
  fill(palette.rust);
  quad(fireX,fireY, fireX+4, fireY+8, fireX, fireY+10, fireX-4,fireY+8);
  fill(50);
  rect(fireX, fireY+11,10,3)
  //tree(100,100);

  fill(95, 120, 125);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(100);
  text("Let's Go Camping", width/2, 100);
  startButton = createButton('start');
  startButton.position(width/2, height/2);
  startButton.mousePressed(changeFlag);
  startButton.style('background-color', palette.almond)
}


// bezier curves
function flame(num){
  if (num == 0){
    push();
    translate(-100,-300);
    beginShape();
    vertex(100,100);
    bezierVertex(50,150,200,250,100,300);
    bezierVertex(100,150,50,250,100,100)
    endShape();
    pop();
  } else if (num == 1){
    push();
    translate(-240,-300);
    beginShape();
    vertex(200,200);
    bezierVertex(200,200,300,250,200,300);
    bezierVertex(200,150,150,200,200,100);
    bezierVertex(100,150,250,250,200,200)
    endShape();
    pop();
  } else if (num == 2){
    push()
    translate(-280,-300);
    beginShape();
    vertex(300,300);
    bezierVertex(350,200,350,150,350,100);
    bezierVertex(250,300,300,300,300,300)
    endShape();
    pop();
  } else{
    push()
    translate(-420,-300);
    beginShape();
    vertex(400,100);
    bezierVertex(350,100,500,200,400,300);
    bezierVertex(450,250,300,250,400,100);
    endShape();
    pop();
  }
}

function changeFlag(){

  flag+=1;
  timer = millis();
}

function start(){
  let color1 = color(1, 23, 47);
  let color2 = color(45, 66, 89)
  setGradient(color1, color2); // background
  removeElements();
  var intensity = (mic.getLevel())*10;
  fill(palette.almond)
  textSize(20);
  noStroke();

  text("feed the flame by blowing on the mic", 250,100)
  //log in the back of flames
  logs.display(250,340,5);

  //print(intensity);
  //it works!!

  push();

  translate(250,450)
  translate(0,-50*intensity);
  scale(2*intensity,2*intensity);
  scale(intensity)
  //translate(this.x-100,this.y-400);
  for (let i = 0; i< flames.length; i++){
    flames[i].display();
  }

  pop();

  logs.display(200,400,20);
  logs.display(300,380,170);
  for (let i = 0; i< flames.length; i++){
    flames[i].moveFire(intensity);
  }
  //blew too hard, flame extinguished

  ///move this into a function or class

}

 function snowfall(){
   for (let i = 0; i<arr.length; i++){
     arr[i].display();
     arr[i].move();
     //print(i);
   }
 }

//THIS FUNCTION IS NOT MY OWN
//https://editor.p5js.org/REAS/sketches/S1TNUPzim
//must set color as color(r,g,b)
function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function tree(x,y){
  push();
  noStroke();
  translate(x,y);
  fill(palette.tree1);
  //doublecheck
  rectMode(CENTER);
  //x,y,(centered)size, size
  rect(10,30,10,10);
  fill(palette.tree2)

  triangle(10,0,20,20,0,20);
  push();

  translate(0,10);
  triangle(10,0,20,20,0,20);
  pop();
  pop();
}


function retry(){
  loop();
  removeElements();
}
