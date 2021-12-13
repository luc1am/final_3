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
var flame0;
var flame1;
var flame2;
var flame3;
var flame4;
var flame5;
var flame6;

class TheFire {
  constructor(x,y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
  display(){
    push();
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
    if (intensity>0.9){
      noLoop();
      background(palette.blood);
      logs.display(250,340,5);
      logs.display(200,400,20);
      logs.display(300,380,170);
      fill(palette.almond);
      text("the flame was extinguished... :(", 100,100);
      butt = createButton("try again");
      butt.position(100,150);
      butt.mousePressed(retry);
    }
  }
}

class Cooking {
  constructor(pot, pan, food) {
    this.pot = pot;
    this.pan = pan;
    this.food = []; //contains multiple food items
  }
  display(){
    //
  }
}


function setup() {
  createCanvas(500,500);
  mic = new p5.AudioIn();
  mic.start();
  flame0 = new TheFire(10,0,1.2);
  flame1 = new TheFire(-40,20,1.35);
  flame2 = new TheFire(-50,0,1.3);
  flame3 = new TheFire(-80,30,1);
  flame4 = new TheFire(30,30,1.25);
  flame5 = new TheFire(0,20, 1);
  flame6 = new TheFire(30,50,1);
}

function draw() {
  background(palette.blood);
  var intensity = mic.getLevel();
  fill(palette.almond)
  text("feed the flame by blowing on the mic", 100,100)
  //log in the back of flames
  logs.display(250,340,5);

  //print(intensity);
  //it works!!

  push();
  translate(250,350)
  translate(0,-50*intensity);
  scale(5*intensity,8*intensity*intensity);
  scale(intensity)

//change into an array pls!!
  flame0.display()
  flame1.display()
  flame2.display()
  flame3.display()
  flame4.display()
  flame5.display()
  flame6.display()
  pop();

  logs.display(200,400,20);
  logs.display(300,380,170);

  //blew too hard, flame extinguished
  flame0.moveFire(intensity);
  flame1.moveFire(intensity);
  flame2.moveFire(intensity);
  flame3.moveFire(intensity);
  flame4.moveFire(intensity);
  flame5.moveFire(intensity);
  flame6.moveFire(intensity);
  ///move this into a function or class

}


function retry(){
  loop();
  removeElements();
}


function titleScreen(){
  pass;
  // display high scores
  //display
}
