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



previously used code from audio hw assignment
new content:
change into classes
make a character walk across

*/
var palette = {
  darkSienna: '#220901',
  blood: '#01172F', //oxford blue
  darkRed: '#941B0C',
  rust: '#BC3908',
  yellow: '#F6AA1C',
  almond: '#A7754D'
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

var mic;
var butt;//(button) for restart
var flames = [];
var button2;
var flag;// which screen
var timer;


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
    //adjust for displacement,
    translate(this.x-50,this.y-125);
    scale(this.size);
    stroke(255);
    fill(palette.yellow);
    beginShape();
    curveVertex(50,0);
    curveVertex(75,100);
    curveVertex(50,125);
    curveVertex(25,100);
    //not sure why, but repeating these vertices helped,
      //without it doesn't fill correctly
    curveVertex(50,0);
    curveVertex(75,100);
    curveVertex(50,125)
    endShape();
    pop();

    //smaller red flames
    push();
    translate(this.x-10,this.y-25);
    scale(0.5);
    fill(palette.rust)
    beginShape();
    curveVertex(50,0);
    curveVertex(75,100);
    curveVertex(50,125);
    curveVertex(25,100);
    curveVertex(50,0);
    curveVertex(75,100);
    curveVertex(50,125)
    endShape();
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
      text("the flame was extinguished... :(", 100,100);
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
  }
  render(){
    stroke(255,255,255,150);
    strokeWeight(4);
    point(this.pos.x, this.pos.y); //accesses vector <x,y>
  }
}

var x = [10,-40,-50,-80,30,0,30]
var y = [0,20,0,30,30,20,50]
var size = [1.2, 1.35,1.3,1,1.25,1,1]
var snow = [];
var ambient;
var fireSound;

function preload(){
  //https://freesound.org/people/lwdickens/sounds/529093/
  ambient = loadSound("ambient.wav");
  fireSound = loadSound("fire.wav");

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
var x = 10;
var y = 10;

function draw(){

  frameRate(20);
  snow.push(new SnowFlake());
  if (flag == 1){
    titleScreen();
  }
  else if (flag == 2){
    start();
    fireSound.loop();
    
  }
  else if (flag ==3){
    forest();

  }
  else if (flag == 0){
    deathScreen();
  }
  for (flake of snow){
    flake.update();
    flake.render();
  }
}

function forest(){
  background(0);
  noStroke();
  fill(palette.almond);
  text("shh I think I heard something in the woods...", 400,400);
  var intensity = (mic.getLevel())*10;
  if (intensity > 2){
    text("GGRRRWWWWRRR", 300,200);
  }
  if (intensity >5){
    flag = 0;
  }
}

function deathScreen(){

  fill(palette.rust);
  noStroke();
  fontSize(100);
  text('You Died', width/2, height/2  );

  fontSize(20);
  //text(cause, width/2, height/2 +100);

}

function titleScreen(){
  let color1 = color(1, 23, 47);
  let color2 = color(45, 66, 89)
  setGradient(color1, color2); // background
  fill('#1d332f'); //green ground
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
  button2 = createButton('start');
  button2.position(width/2, height/2);
  button2.mousePressed(changeFlag);
  button2.style('background-color', palette.almond)
}

function flame(num){
  if (num == 0){
    beginShape();
    vertex(100,100);
    bezierVertex(50,150,200,250,100,300);
    bezierVertex(100,150,50,250,100,100)
    endShape();
  } else if (num == 1){
    beginShape();
    vertex(200,200);
    bezierVertex(200,200,300,250,200,300);
    bezierVertex(200,150,150,200,200,100);
    bezierVertex(100,150,250,250,200,200)
    endShape();
  } else if (num == 2){
    beginShape();
    vertex(300,300);
    bezierVertex(350,200,350,150,350,100);
    bezierVertex(250,300,300,300,300,300)
    endShape();
  } else{
    beginShape();
    vertex(400,100);
    bezierVertex(350,100,500,200,400,300);
    bezierVertex(450,250,300,250,400,100);
    endShape();
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
  textSize(10);
  noStroke();
  text("feed the flame by blowing on the mic", 100,100)
  //log in the back of flames
  logs.display(250,340,5);

  //print(intensity);
  //it works!!

  push();
  translate(250,350)
  translate(0,-50*intensity);
  scale(2*intensity,2*intensity);
  scale(intensity)
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
  fill('#261f12');
  //doublecheck
  rectMode(CENTER);
  //x,y,(centered)size, size
  rect(10,30,10,10);
  fill('#2c3b2f')

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
