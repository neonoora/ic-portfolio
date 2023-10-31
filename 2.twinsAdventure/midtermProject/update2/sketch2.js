let L2F2,mc2


let world = [
  [0,0,4,4,4,4,4,4,4,4],
  [0,0,0,0,1,0,0,0,2,4],
  [4,0,2,0,1,0,3,0,0,4],
  [4,0,0,0,0,0,2,1,0,4],
  [4,0,1,3,1,0,2,0,0,4],
  [4,0,0,0,3,0,0,0,0,4],
  [4,0,3,0,2,0,1,3,1,4],
  [4,2,2,0,0,0,0,2,1,4],
  [4,0,3,0,1,2,0,0,3,4],
  [4,4,4,4,4,4,4,4,4,4]
];

function preload(){
  L1F2 = loadImage("images/l1f2.png")
  road2 = loadImage('images/road2.png')
  tree2 = loadImage('images/tree2.png')
  car1 = loadImage('images/car1.png')
  car2 = loadImage('images/car2.png')
  car3 = loadImage('images/car3.png')
}

function setup() {
  // create our canvas
  createCanvas(500, 500);

  // erase the background
  background(128);
  noStroke();

  mc2 = new MC2(50,50)
}

function getTileByPos (x,y){
  let arrayX = int (x / 50)
  let arrayY = int (y / 50)

  return world[arrayY][arrayX];
}

function moveOK(id){
  if (id == 0){
    return true
  }else{
    return false
  }
}


function draw(){
  background(0,0)

  for(let y = 0; y < 10; y ++){
    for(let x = 0; x < 10; x ++){
      imageMode(CORNER)
      art = road2
      image(art,x*50,y*50,50,50)
      if(world[y][x]== 1){
        art = car1
      }else if(world[y][x]== 2){
        art = car2
      }else if(world[y][x]== 3){
        art = car3
      }else if(world[y][x]== 4){
        art = tree2
      }
      image(art,x*50,y*50,50,50)
    }
  }

    imageMode(CENTER)
    mc2.displayAndMove()
    mc2.computerSensors()
}


class MC2 {

  constructor(x,y){

    this.x = x
    this.y = y

    this.speed = 1.2
    this.size = 50

    this.computerSensors()
  }

  displayAndMove(){

    image(L1F2,this.x,this.y,this.size,this.size)

    // constrian 
    if(this.x > width - this.size/2){
      this.x = width - this.size/2
    }else if(this.x < this.size / 2){
      this.x = this.size / 2
    }else if(this.y > height - this.size/2){
      this.y = height - this.size/2
    }else if(this.y < this.size / 2){
      this.y = this.size / 2
    }

    // move left right
    if(keyIsDown(65)&& moveOK (getTileByPos(this.left.x,this.left.y)) == true){
      window.parent.moveLeft2 = true
      this.x -= this.speed
      fill(255)
    }else{
      window.parent.moveLeft2 = false
      fill(255)
    }

    if(keyIsDown(68) && moveOK (getTileByPos(this.right.x,this.right.y)) == true){
      window.parent.moveRight2 = true
      this.x += this.speed
      fill(255)
    }else{
      window.parent.moveRight2 = false
      fill(255)
    }


    if(keyIsDown(65) && keyIsDown(68)){
      window.parent.moveLeft2 = false
      window.parent.moveRight2 = false
      this.x += 0
      fill(255)
    }

    // check the other screen
    if(window.parent.moveLeft1 == true){
      this.x -= this.speed
    }else if(window.parent.moveRight1 == true){
      this.x += this.speed
    }

    // move up down
    if(keyIsDown(87) && moveOK (getTileByPos(this.up.x,this.up.y)) == true){
      window.parent.moveUp2 = true
      this.y -= this.speed
    }else{
      window.parent.moveUp2 = false
    }

    if(keyIsDown(83)&& moveOK (getTileByPos(this.down.x,this.down.y)) == true){
      window.parent.moveDown2 = true
      this.y += this.speed
    }else{
      window.parent.moveDown2 = false
    }

    if(keyIsDown(87) && keyIsDown(83)){
      window.parent.moveUp2 = false
      window.parent.moveDown2 = false
      this.y += 0
      fill(255)
    }


    // check the other screen
    if(window.parent.moveUp1 == true){
      this.y -= this.speed
    }else if(window.parent.moveDown1 == true){
      this.y += this.speed
    }


    // sensor
    fill(255,0,0)
    ellipse(this.right.x, this.right.y,5,5)
    ellipse(this.left.x, this.left.y,5,5)
    ellipse(this.up.x, this.up.y,5,5)
    ellipse(this.down.x, this.down.y,5,5)
  }



  computerSensors(){
    this.right = {x:this.x + 18, y:this.y}
    this.left = {x:this.x - 18, y:this.y}
    this.up = {x:this.x, y:this.y - 22}
    this.down = {x:this.x, y:this.y + 25}
  }
}


  



