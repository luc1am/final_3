/*
Audio reactivity via an audio file or microphone
    Sound should be measured
    This measurement (i.e. the data) should affect something visible
An object with a method
An additional interactive component via the DOM,
  mouse, or keyboard that makes a visible and/or audible change
functions for setting the visual environment:
    like fill(), stroke(), background()...*/


// ideas: blow on microphone to feed flame
      // blow too hard and it puts out the flame

      let mic;

       function setup(){
        let cnv = createCanvas(100, 100);
        cnv.mousePressed(userStartAudio);
        textAlign(CENTER);
        mic = new p5.AudioIn();
        mic.start();
      }

      function draw(){
        background(0);
        fill(255);
        text('tap to start', width/2, 20);

        micLevel = mic.getLevel();
        let y = height - micLevel * height;
        ellipse(width/2, y, 10, 10);
      }
