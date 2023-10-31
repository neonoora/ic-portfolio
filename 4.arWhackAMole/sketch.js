// The color detection algorithm in this assignment is based on
// Professor Kapp's class example "Color Tracking Fish Game"

// video capture object
let capture;

// color we want to track
let r = 0;
let g = 0;
let b = 0;

// the threshold determines the sensitivity of the color detection algorithm
// lower numer -> higher sensitivity
let threshold = 20;

// artwork
let artMole, artHammer;

// hammer location
let hammerX = 0;
let hammerY = 0;

// the mole's position 
let moleX,moleY;

// keep track of the time
let frameCurrent = 0;

// the distance between the mouse and the mole
let distance;

// keep track of the score
let score = 0;

// countdown - keep track of the time
let nowTime = 0, totalTime = 15;

// game state - 0 = intial / 1 = game on / 2 = game over
let state = 0;

// load artworks and songs
function preload() {
  artHammer = loadImage('images/hammer.png');
  artMole = loadImage('images/mole.png');
  songHit = loadSound('sounds/hit.wav')
}

function setup() {
  pixelDensity(1);
  createCanvas(350, 350);

  // select initial position
  moleX = int(random(1,5)) * 75
  moleY = int(random(1,5)) * 75

  // start up the web cam
  capture = createCapture({
    video: {
      mandatory: {
        minWidth: 350,
        minHeight: 350,
        maxWidth: 350,
        maxHeight: 350,
      }
    }
  });
  capture.hide();

}

function draw() {
  // expose the pixels in the incoming video stream
  capture.loadPixels();

  // if we have some pixels to work wtih them we should proceed
  if (capture.pixels.length > 0) {

    // set up variables to test for the best pixel
    let bestLocations = [];

    for (let i = 0; i < capture.pixels.length; i += 4) {
      // determine how close of a match this color is to the desired color
      let match = dist(r, g, b, capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
      if (match < threshold) {
        // store the location of qualified pixels into the array
        bestLocations.push(i);
      }
    }

    // draw the video on the top left
    imageMode(CORNER);
    image(capture, 0, 0);

    // initial state
    if(state == 0){

      fill(255)
      textSize(20)
      text("Mouse click to pick color",width * 0.1,height * 0.2)
      text("Press 'P' to play the game",width * 0.1,height * 0.3)

    //-> press P to start the game
      if(keyIsDown(80)){
        state = 1
      }
    }
     
    if(state == 1){
    // create a 4 x 4 grid 
    fill(255,50)
      rectMode(CENTER)
      for(let i = 1; i < 5; i ++ ){
        for(let j = 1; j < 5; j ++ ){
          rect( i * 75, j * 75, 50, 50 )
        }
    }

    // both framecount & time increase
    frameCurrent ++
    nowTime ++ 

    // countdown
    if(nowTime % 60 == 0){
      totalTime -= 1
    }

    // draw the mole in the desired position
    fill(255,0,0)
    imageMode(CENTER)
    image(artMole,moleX,moleY,60,45)

    // time runs out -> game over
    if(totalTime < 1){
      state = 2
    }

    // choose a new position for the mole after a certain time
    if(frameCurrent % 40 == 0){
      moleX = int(random(1,5)) * 75 
      moleY = int(random(1,5)) * 75 
    }
    
    // if the distance between the mouse & mole (?) close enough
    // press the mouse to get score
    distance = dist(moleX,moleY,hammerX,hammerY)
    if(distance < 30){

      frameCurrent = 0

      // pick a new position to pop up
      moleX = int(random(1,5)) * 75 
      moleY = int(random(1,5)) * 75 
      score += 1
      songHit.play()
    }
  }

    if(state == 2){
      fill(255)
      textSize(20)

      // game over text info
      text("GAME OVER",width * 0.2,height * 0.4)
      text("Score: " + score,width * 0.2,height * 0.5)
      text("Press 'R' to restart",width * 0.2,height * 0.6)

      // press R restart the game & clear the score
      if(keyIsDown(82)){
        state = 0
        score = 0
        totalTime = 15
        nowTime = 0
      }
    }

    // do we have a best match?  
    // it's possible that no pixels met our threshold
    if (bestLocations.length > 0) {
      // average up all of our locations
      let xSum = 0;
      let ySum = 0;
      for (let i = 0; i < bestLocations.length; i++) {
        xSum += (bestLocations[i] / 4) % 350;
        ySum += (bestLocations[i] / 4) / 350;
      }

      // average our sums to get the centriod point to draw the hammer 
      hammerX = xSum / bestLocations.length;
      hammerY = ySum / bestLocations.length;
    }
  }

  // draw the hammer here
    imageMode(CENTER);
    image(artHammer, hammerX, hammerY,60,60);


  // display threshold
  noStroke();
  fill(255);
  rectMode(CORNER);
  rect(0,0,350,30);
  fill(0);
  textSize(10)
  text("Threshold:" + int(threshold) + " - hit 'A' and 'D' to adjust", 10, 20);
  fill(255,0,0)
  text("SCORE: " + score, 220,20)
  text("TIME: " + totalTime, 280,20)
}

function mousePressed() {
  // memorize the color the user is clicking on
  r = red(get(mouseX,mouseY));
  g = green(get(mouseX,mouseY));
  b = blue(get(mouseX,mouseY));
}

// press A & D to adjust threshold
function keyPressed() {
  if (key == 'A' || key == 'a') {
    threshold--;
  }
  if (key == 'D' || key == 'd') {
    threshold++;
  }
}