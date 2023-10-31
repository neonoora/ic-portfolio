let L1F2, mc2, flower

let cheatMode = false 

let world = [

  [1,1,1,1,1,1,1,1,1,1,5],
  [1,5,7,7,5,5,0,0,5,5,5],
  [1,5,0,0,0,7,0,0,7,0,1],
  [1,5,5,5,0,7,0,0,7,5,1],
  [1,0,0,7,0,5,5,0,0,5,1],
  [10,5,0,5,0,0,5,0,7,5,1],
  [1,5,0,7,0,7,7,0,5,0,1],
  [1,5,0,5,0,5,0,0,5,0,1],
  [1,7,7,5,0,5,0,0,5,0,1],
  [1,0,0,0,0,5,5,7,7,0,1],
  [1,1,1,1,1,1,1,1,1,1,1]
]


function preload(){
  L1F2 = loadImage("images/l1f2.png")

  road1 = loadImage('images/road1.png')
  tree2 = loadImage('images/tree2.png')
  track = loadImage('images/track.png')

  flower1 = loadImage('images/flower1.png')
  door2 = loadImage('images/door2.png')
}



function setup(){

  createCanvas(550,550)
  background(128)
  noStroke()

  mc2 = new L1MC2(525,25)
}



function getTileByPos (x,y){
  let arrayX = int (x / 50)
  let arrayY = int (y / 50)

  return world[arrayY][arrayX];
}

function moveOK(id){
  if (id == 0 || id == 5 || id == 10){
    return true
  }else{
    return false
  }
}


function keyPressed(){
  if (key == 'P' || key == 'p') {
    if(cheatMode == false){
      cheatMode = true
    }else if(cheatMode == true){
      cheatMode = false
    }
  }
}



function draw(){

  background(0,0)

  for(let y = 0; y < 11; y ++){
      for(let x = 0; x < 11; x ++){
        imageMode(CORNER)
        art = road1
        image(art,x*50,y*50,50,50)
        if(world[y][x]== 1){
          art = tree2
          image(art,x*50,y*50,50,50)
        }
        if(world[y][x]== 5 && cheatMode == true || world[y][x]== 7 && cheatMode == true){
          art = track
          image(art,x*50,y*50,50,50)
        }
        if(world[y][x]== 7){
          art = flower1
          image(art,x*50,y*50,30,30)
        }
        if(world[y][x]== 10){
          art = door2
          image(art,x*51,y*51,40,40)
        }
      }
    }

  imageMode(CENTER)
  mc2.displayAndMove()
  mc2.computerSensors()
}

class L1MC2 {

  constructor(a,b){
    this.x = a
    this.y = b

    this.speed = 1
    this.size = 50

    this.computerSensors()
  }


  displayAndMove(){

    image(L1F2,this.x, this.y,this.size,this.size)

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


    // move inside (D - move left) 
    if(keyIsDown(68)&& moveOK (getTileByPos(this.left.x,this.left.y)) == true){
      window.parent.L1moveIn2 = true
      this.x -= this.speed
    }else{
      window.parent.L1moveIn2 = false
    }


    // move outside (A - move right)
    if(keyIsDown(65)&& moveOK (getTileByPos(this.right.x,this.right.y)) == true){
      window.parent.L1moveOut2 = true
      this.x += this.speed
    }else{
      window.parent.L1moveOut2 = false
    }

    // not moving when both AD are pressed
    if(keyIsDown(65) && keyIsDown(68)){
      window.parent.L1moveIn2 = false
      window.parent.L1moveOut2 = false
      this.x += 0
    }


    // check the other screen
    if(window.parent.L1moveIn1 == true){
      this.x -= this.speed
    }else if(window.parent.L1moveOut1 == true){
      this.x += this.speed
    }



    // move up 
    if(keyIsDown(87)&& moveOK (getTileByPos(this.up.x,this.up.y)) == true){
      window.parent.L1moveUp2 = true
      this.y -= this.speed
    }else{
      window.parent.L1moveUp2 = false
    }


    // move down 
    if(keyIsDown(83)&& moveOK (getTileByPos(this.down.x,this.down.y)) == true){
      window.parent.L1moveDown2 = true
      this.y += this.speed
    }else{
      window.parent.L1moveDown2 = false
    }


    // not moving when both SW are pressed 
    if(keyIsDown(83) && keyIsDown(87)){
      window.parent.L1moveUp2 = false
      window.parent.L1moveDown2 = false
      this.y += 0
    }


    // check the other screen
    if(window.parent.L1moveUp1 == true){
      this.y -= this.speed
    }else if(window.parent.L1moveDown1 == true){
      this.y += this.speed
    }


    if(this.x < 40){
      console.log("pass")
      fill(0)
      rect(0,0,550,550)
      fill(255)
      textSize(20)
      text("level 1 passed",200,200)
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