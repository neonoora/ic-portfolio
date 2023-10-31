// // NOTE: this demo showcases how a p5 sketch can be used in conjunction with an
// // HTML document.  Please open up the 'index.html' file and refer to it as necessary

let xPos,yPos

function setup() {
  // create our canvas
  createCanvas(500, 500);

  // erase the background
  background(0);
  noStroke();

  xPos = 250
  yPos = 250

  mcSpeed = 2
  mcSize = 30

}

function draw(){

  // no trace
  background(0)

  // show character on screen
  fill(0,0,255)
  rect(xPos,yPos,mcSize,mcSize)

  // wrap around 
  if(xPos > width - mcSize){
    xPos = width - mcSize
  }else if(xPos < 0){
    xPos = 0
  }else if(yPos > height - mcSize){
    yPos = height - mcSize
  }else if(yPos < 0){
    yPos = 0
  }

  
  // move left right
  if(keyIsDown(65)){
    window.parent.moveLeft2 = true
    xPos -= mcSpeed
    fill(255)
  }else{
    window.parent.moveLeft2 = false
    fill(255)
  }

  if(keyIsDown(68)){
    window.parent.moveRight2 = true
    xPos += mcSpeed
    fill(255)
  }else{
    window.parent.moveRight2 = false
    fill(255)
  }


  if(keyIsDown(65) && keyIsDown(68)){
    window.parent.moveLeft2 = false
    window.parent.moveRight2 = false
    xPos += 0
    fill(255)
  }else{
    fill(255)
  }


  // check the other screen
  if(window.parent.moveLeft1 == true){
    xPos -= mcSpeed
  }else if(window.parent.moveRight1 == true){
    xPos += mcSpeed
  }

  // move up down
  if(keyIsDown(87)){
    window.parent.moveUp2 = true
    yPos -= mcSpeed
  }else{
    window.parent.moveUp2 = false
  }

  if(keyIsDown(83)){
    window.parent.moveDown2 = true
    yPos += mcSpeed
  }else{
    window.parent.moveDown2 = false
  }

  if(keyIsDown(87) && keyIsDown(83)){
    window.parent.moveUp1 = false
    window.parent.moveDown1 = false
    yPos += 0
    fill(255)
  }


  // check the other screen
  if(window.parent.moveUp1 == true){
    yPos -= mcSpeed
  }else if(window.parent.moveDown1 == true){
    yPos += mcSpeed
  }

}
