let gnomesL1 = []
let gnomesL2 = []
let gnomesL3 = []
let heartsL1 = []
let lifeL1 = 2
let lifeL2 = 3
let lifeL3 = 3
let sis2


let songGameOverPlayed = false
let songYouWinPlayed = false


// DIFFICULTY VALUES BEGIN
let numOfGnomesL1
let numOfHeartsL1
let numOfGnomesL2
let numOfGnomesL3

let showL2
let unshowL2

let speedRangeL3

let cPosX
let cPosY
// DIFFICULTY VALUES END


function preload(){
  sisb = loadImage("images/leftGirl.png")
  road = loadImage('images/road1.png')
  tree = loadImage('images/tree1.png')
  rock = loadImage('images/rock1.png')
  door = loadImage('images/door2.png')
  heart = loadImage('images/heart.png')

  gnome = loadImage('images/gnome.png')
  gnomeRight = loadImage('images/gnomeRight.png')

  initial = loadImage('images/initial.png')
  instruction = loadImage('images/ins.png')


  songYouWin = loadSound("sounds/youWin.wav")
  songGameOver = loadSound("sounds/gameOver.wav")
}

// SETUP BEGINS
function setup(){
  createCanvas(550,550)
  background(0)
  noStroke()

        // DEFAULT VALUES BEGIN
        numOfGnomesL1 = 8
        numOfHeartsL1 = 2
        numOfGnomesL2 = 10
        numOfGnomesL3 = 8

        showL2 = 60
        unshowL2 = 120

        speedRangeL3 = 1.2

        cPosX = 525
        cPosY = 25
        // DEFAULT VALUES END


        // CUSTOMIZED DIFFICULTY BEGINS
        window.parent.gameMode = window.localStorage.getItem("MODE")

        if(window.parent.gameMode == "EASY"){
          showL2 = 60
          unshowL2 = 240
          speedRangeL3 = 1

        }

        if(window.parent.gameMode == "NORMAL"){
          showL2 = 60
          unshowL2 = 120
          speedRangeL3 = 1.5
        }

        if(window.parent.gameMode == "HARD"){
          showL2 = 60
          unshowL2 = 65
          speedRangeL3 = 3
        }

        // CUSTOMIZED DIFFICULTY ENDS


// make one character for each level
    sis2L1 = new SIS2 (cPosX,cPosY)
    sis2L2 = new SIS2 (cPosX,cPosY)
    sis2L3 = new SIS2 (cPosX,cPosY)

  // make hearts for L1
  for (let i = 0; i < numOfHeartsL1 ; i++){
    let newheart1 = new Popup (int(random(1,10)),int(random(1,10)))
    heartsL1.push(newheart1)
  }

  // make gnomes for L1
  for (let i = 0; i < numOfGnomesL1 ; i++){
    let newgnome1 = new Popup (int(random(1,10)),int(random(1,10)))
    gnomesL1.push(newgnome1)
  }

  // make gnomes for L2
  for (let i = 0; i < numOfGnomesL2 ; i++){
    let newgnome2 = new Popup (int(random(1,10)),int(random(1,10)))
    gnomesL2.push(newgnome2)
  }

  // make gnomes for L3
  for (let i = 0; i < numOfGnomesL3 ; i++){
    let newgnome3 = new Popup(random(100,400),random(100,400))
    gnomesL3.push(newgnome3)
  }
}
// SETUP ENDS


// ADDITIONAL FUNCTION BEGINS

// get tile ID from position
function getTileByPos (x,y){
  let arrayX = int(x/50)
  let arrayY = int(y/50)

  return window.parent.world2[arrayY][arrayX]
}

// stop when hit rock or tree
function moveOK (id){
  if (id == 1 || id ==5){
    return false
  }else{
    return true
  }
}

// get the tile ID - X
function getTileByPos_X (x,y){
  let arrayX = int (x / 50)
  return arrayX
}

// get the tile ID - Y
function getTileByPos_Y (x,y){
  let arrayY = int (y / 50)
  return arrayY
}

// hearts + when hit heart
function getOK(id){
  if (id == 7){
    return true
  }
}

// heart - when hit gnome
function minusOK(id){
  if (id == 8){
    return true
  }
}

// check if character can exit - enter next level
function exitOK(id){
  if (id == 22){
    return true
  }
}
// ADDITIONAL FUNCTION ENDS




// FUNCTION DRAW BEGINS

function draw(){



      // always draw the background
      imageMode(CORNER)
      for(let y = 0; y < 11; y++){
        for(let x = 0; x < 11; x++){
          art = road
          image(art,x*50,y*50,50,50)
        }
      }

      if(window.parent.gameState == 0){
        imageMode(CORNER)
        image(instruction,0,0,550,550)
      }


      // make map for level 1/2/3
      if(window.parent.gameState == 1
        || window.parent.gameState == 2
        || window.parent.gameState == 3){

          imageMode(CORNER)

              for(let y = 0; y < 11; y ++){
                for(let x = 0; x < 11; x ++){
                  if(window.parent.world2[y][x]== 1){
                    art = tree
                    image(art,x*50,y*50,50,50)
                  }
                  if(window.parent.world2[y][x]== 7){
                    art = heart
                    image(art,x*50,y*50,40,40)
                  }
                  if(window.parent.world2[y][x]== 8){
                    art = gnome
                    image(art,x*50,y*50,50,50)
                  }
                  if(window.parent.world2[y][x]== 9){
                    art = road
                    image(art,x*50,y*50,50,50)
                  }
                  if(window.parent.world2[y][x]== 22){
                    art = door
                    image(art,x*50,y*50,50,50)
                  }
                }
              }

              // display life value
              fill(255,0,0)
              textSize(20)
              textStyle(BOLD)
              text("x",50,25)
              imageMode(CENTER)
              image(heart,25,20,30,30)
        }

// LEVEL1 BEGINS
    if(window.parent.gameState == 1){

      for (let i = 0; i < gnomesL1.length; i++){
        gnomesL1[i].displayGnome()
      }

      for (let i = 0; i < heartsL1.length; i++){
        heartsL1[i].displayHeart()
      }

      sis2L1.display()
      sis2L1.move()
      sis2L1.computerSensors()
      sis2L1.hitGnomeL1()
      sis2L1.getHeartL1()
      sis2L1.exitL1()


      text(lifeL1,70,25)
    }
// LEVEL1 ENDS




// LEVEL2 BEGINS

      if(window.parent.gameState == 2){

        for (let i = 0; i < gnomesL2.length; i++){
            if(frameCount % showL2 == 0 && frameCount % unshowL2 != 0){
              gnomesL2[i].displayGnome()
            }
            if(frameCount % unshowL2 == 0){
              gnomesL2[i].disappear()
            }
        }

        heartsL1 = []

        sis2L2.display()
        sis2L2.move()
        sis2L2.computerSensors()
        sis2L2.hitGnomeL2()
        sis2L2.exitL2()

        text(lifeL2,70,25)
      }
// LEVEL2 ENDS


// LEVEL3 BEGINS

      if(window.parent.gameState == 3){
        window.parent.world2 = window.parent.world_new3

        for (let i = 0; i < gnomesL3.length; i++){
          gnomesL3[i].displayAndMoveL3()
        }

        sis2L3.display()
        sis2L3.move()
        sis2L3.computerSensors()
        sis2L3.exitL3()

        text(lifeL3,70,25)
      }
// LEVEL3 ENDS


// LEVEL FAIL BEGINS

      // generate NEW MAP - L1
      if(window.parent.gameState == 1.2 && window.parent.replay == true
      || window.parent.gameState == 1 && window.parent.replay == true){

              for(let i = 0; i<8; i++){
                gnomesL1[i].x = int(random(1,10))
                gnomesL1[i].y = int(random(1,10))
              }
            sis2L1.x = cPosX
            sis2L1.y = cPosY
            lifeL1 = 2
            window.parent.replay = false
            window.location.reload()
      }

      // generate NEW MAP - L2
      if(window.parent.gameState == 2.2 && window.parent.replay == true
      || window.parent.gameState == 2 && window.parent.replay == true){
        heartsL1 = []
          for(let i = 0; i<8; i++){
             gnomesL2[i].x = int(random(1,10))
            gnomesL2[i].y = int(random(1,10))
          }
          sis2L2.x = cPosX
          sis2L2.y = cPosY
          lifeL2 = 3
          window.parent.gameState = 2
          window.parent.replay = false
          window.location.reload()
      }


      // generate NEW MAP - L3
      if(window.parent.gameState == 3.2 && window.parent.replay == true){
        heartsL1 = []
          for(let i = 0; i<5; i++){
            gnomesL3[i].x = random(100,400)
            gnomesL3[i].y = random(100,400)
          }
          sis2L3.x = cPosX
          sis2L3.y = cPosY
          lifeL3 = 3
          window.parent.gameState = 3
          window.parent.replay = false
          window.location.reload()
      }
// LEVEL FAIL ENDS





}
// FUNCTION DRAW ENDS


class Popup{

  constructor(x,y){

    this.x = x
    this.y = y

    this.speedX = random(-1 * speedRangeL3,speedRangeL3)
    this.speedY = random(-1 * speedRangeL3,speedRangeL3)

    this.timeToMove = int (random(200,300))
    this.timeMoving = 0

    this.art = gnomeRight
  }

  // DISPLAY GNOMES
  // make sure the tile is empty in both screen
  displayGnome(){
    if(window.parent.world2[this.y][this.x] == 0
    && window.parent.world1[this.y][10-this.x] == 0){
      window.parent.world2[this.y][this.x] = 8
    }
  }

  // DISPLAY HEARTS
  displayHeart(){
    if(window.parent.world2[this.y][this.x] == 0
    && window.parent.world1[this.y][10-this.x] == 0){
      window.parent.world2[this.y][this.x] = 7
    }
  }

  // GNOMES disappear & popup in new tiles
  disappear(){
    window.parent.world2[this.y][this.x] = 0
    this.x = int(random(1,10))
    this.y = int(random(1,10))
    this.displayGnome()
  }

  displayAndMoveL3 (){

    imageMode(CENTER)
    image(this.art,this.x,this.y,50,50)

    this.x += this.speedX
    this.y += this.speedY

    this.timeMoving += 1

          if(this.timeMoving >= this.timeToMove || frameCount % 600 == 0){
            this.speedX = random(speedRangeL3 * -1,speedRangeL3)
            this.speedY = random(speedRangeL3 * -1,speedRangeL3)
            this.timeToMove = int (random(200,300))
            this.timeMoving = 0
          }

          // new position every 10 sec
          if(frameCount % 600 == 0){
            this.x = random(100,400)
            this.y = random(100,400)
          }

          // constrain
          if(this.x < 50){
            this.x = 51
            this.speedX *= -1
          }else if(this.x > 500){
            this.x = 499
            this.speedX *= -1
          }else if(this.y < 50){
            this.y = 51
            this.speedY *= -1
          }else if(this.y > 450){
            this.y = 449
            this.speedY *= -1
          }

          // face left / right
          if(this.speedX > 0){
            this.art = gnomeRight
          }else{
            this.art = gnome
          }

    // collision
          if(dist(this.x,this.y,sis2L3.x,sis2L3.y)<40){

              if(lifeL3 > 1){
                lifeL3 -=1
                this.x = random(100,400)
                this.y = random(100,400)
              }else{
                lifeL3 = 0
                window.parent.gameState = 3.2
              }
          }
  }

}


class SIS2 {

      constructor(x,y){
        this.x = x
        this.y = y

        this.speed = 1
        this.size = 50

        this.computerSensors()

      }

      display(){
        image(sisb,this.x,this.y,this.size,this.size)

        // constrain
        if(this.x > width - this.size/2){
          this.x = width - this.size/2
        }else if(this.x < this.size / 2){
          this.x = this.size / 2
        }else if(this.y > height - this.size/2){
          this.y = height - this.size/2
        }else if(this.y < this.size / 2){
          this.y = this.size / 2
        }
      }



    move(){
        // move Inside (D - move left)
        if(keyIsDown(68)){
          window.parent.L1moveIn2 = true
          this.x -= this.speed
        }else{
          window.parent.L1moveIn2 = false
        }


        // move outside (A - move right)
        if(keyIsDown(65)
          && moveOK (getTileByPos(this.right.x,this.right.y)) == true
          && minusOK(getTileByPos(this.left.x,this.left.y)) == false){
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
        if(keyIsDown(87)
          && moveOK (getTileByPos(this.up.x,this.up.y)) == true
          && minusOK(getTileByPos(this.left.x,this.left.y)) == false){
          window.parent.L1moveUp2 = true
          this.y -= this.speed
        }else{
          window.parent.L1moveUp2 = false
        }


        // move down
        if(keyIsDown(83)
          && moveOK (getTileByPos(this.down.x,this.down.y)) == true
          && minusOK(getTileByPos(this.left.x,this.left.y)) == false){
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
    }


    computerSensors(){
      this.right = {x:this.x + 20, y:this.y}
      this.left = {x:this.x - 20, y:this.y}
      this.up = {x:this.x, y:this.y - 25}
      this.down = {x:this.x, y:this.y + 25}

      this.upperleft = {x:this.x - 10, y:this.y - 15}
      this.upperright = {x:this.x + 10, y:this.y - 15}
      this.downleft = {x:this.x - 10, y:this.y + 15}
      this.downright = {x:this.x + 10, y:this.y + 15}

    }


    // collect hearts
    getHeartL1(){
      if(getOK(getTileByPos(this.x,this.y)) == true){
        window.parent.world2[getTileByPos_Y(this.x,this.y)][getTileByPos_X(this.x,this.y)]= 9
            lifeL1 +=1
      }
    }

    // check if hits gnome L2
    hitGnomeL1(){
      if(minusOK(getTileByPos(this.x,this.y)) == true){
        window.parent.world2[getTileByPos_Y(this.x,this.y)][getTileByPos_X(this.x,this.y)]= 9
        if(lifeL1 > 1){
          lifeL1 -= 1
        }else{
          lifeL1 = 0
          window.parent.gameState = 1.2
        }
      }
    }

    // check if hits gnome L2
    hitGnomeL2(){
      if(minusOK(getTileByPos(this.x,this.y)) == true){
        window.parent.world2[getTileByPos_Y(this.x,this.y)][getTileByPos_X(this.x,this.y)]= 9
        if(lifeL2 > 1){
          lifeL2 -= 1
        }else{
          lifeL2 = 0
          window.parent.gameState = 2.2
        }
      }
    }


    // exit if enter the door

          exitL1 (){
            if(window.parent.gameState == 1 && this.x < 50 && this.y > 500 && lifeL1 > 0){
              window.parent.gameState = 2
              window.parent.world2 = window.parent.world_new2
            }
          }


          exitL2(){
            if(window.parent.gameState == 2 && this.x < 50 && this.y > 500 && lifeL2 > 0){
              window.parent.gameState = 3
              window.parent.world2 = window.parent.world_new3
            }
          }


          exitL3(){
            if(window.parent.gameState == 3 && this.x < 50 && this.y > 500 && lifeL3 > 0){
              window.parent.gameState = 3.5
              window.location.reload()
            }
          }
}
