let rocksL1 = []
let rocksL2 = []
let rocksL3 = []
let sis1L1

// DIFFICULTY VALUES BEGIN
let numOfRockL1
let numOfRockL2
let numOfRockL3

let cPosX
let cPosY


let girlOn
let doorOn
let myX
let myY
// DIFFICULTY VALUES END


function preload (){
  sisa = loadImage("images/l1f1.png")
  road = loadImage('images/road1.png')
  tree = loadImage('images/tree1.png')
  rock = loadImage('images/rock1.png')
  door = loadImage('images/door1.png')

  initial = loadImage('images/1.png')
  gameOver = loadImage('images/2.png')
  youWin = loadImage('images/3.png')
}

// SETUP BEGINS
function setup(){
  createCanvas(550,550)
  background(0)
  noStroke()

        // VALUES BEGIN
          numOfRockL1 = 10
          numOfRockL2 = 10
          numOfRockL3 = 2

          cPosX = 25
          cPosY = 25

          doorOn = false
          girlOn = false
        // VALUES END

// make one character for each level
  sis1L1 = new SIS1 (cPosX,cPosY)
  sis1L2 = new SIS1 (cPosX,cPosY)
  sis1L3 = new SIS1 (cPosX,cPosY)

  // make rocks for L1

    for (let i = 0; i < numOfRockL1 ; i++){
      let newrock1 = new Popup (int(random(1,10)),int(random(1,10)))
      rocksL1.push(newrock1)
    }


  // make rocks for L2
  for (let i = 0; i < numOfRockL2 ; i++){
    let newrock2 = new Popup (int(random(1,10)),int(random(1,10)))
    rocksL2.push(newrock2)
  }

  // make rocks for L3
  for (let i = 0; i < numOfRockL3 ; i++){
    let newrock3 = new Popup (int(random(1,10)),int(random(1,10)))
    rocksL3.push(newrock3)
  }
}
// SETUP ENDS


// ADDITIONAL FUNCTIONS BEGINS

// get tile ID from position
function getTileByPos (x,y){
  let arrayX = int(x/50)
  let arrayY = int(y/50)

  return window.parent.world1[arrayY][arrayX]
}

// stop when hit rock or tree
function moveOK (id){
  if (id == 1 || id ==5){
    return false
  }else{
    return true
  }
}
// ADDITIONAL FUNCTIONS ENDS




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


      // make map for level 1/2/3
      if(window.parent.gameState == 1
        || window.parent.gameState == 2
        || window.parent.gameState == 3){

          imageMode(CORNER)

              for(let y = 0; y < 11; y ++){
                for(let x = 0; x < 11; x ++){
                  if(window.parent.world1[y][x]== 1){
                    art = tree
                    image(art,x*50,y*50,50,50)
                  }
                  if(window.parent.world1[y][x]== 5){
                    art = rock
                    image(art,x*50,y*50,40,40)
                  }
                  if(window.parent.world1[y][x]== 9){
                    art = road
                    image(art,x*50,y*50,50,50)
                  }
                  if(window.parent.world1[y][x]== 11){
                    art = door
                    image(art,x*50,y*50,50,50)
                  }
                }
              }
        }


// LEVEL0 BEGINS
      if(window.parent.gameState == 0){
        if(keyIsDown(80)){
          window.parent.gameState = 1
        }else if(keyIsDown(71)){
          window.parent.gameMode = 2000
        }
      }


// LEVEL0 ENDS


// LEVEL1 BEGINS
      if(window.parent.gameState == 1){

        for (let i = 0; i < rocksL1.length; i++){
          rocksL1[i].display()
        }

        imageMode(CENTER)
        sis1L1.display()
        sis1L1.move()
        sis1L1.computerSensors()
      }
// LEVEL 1 ENDS

// LEVEL2 BEGINS
      if(window.parent.gameState == 2){

        for (let i = 0; i < rocksL1.length; i++){
          rocksL2[i].display()
        }

        imageMode(CENTER)
        sis1L2.display()
        sis1L2.move()
        sis1L2.computerSensors()

          // random popup

          for(let i = 0; i < rocksL2.length; i++){
            if(frameCount % 60 == 0 && frameCount % 120 == 0){
              rocksL2[i].display();
            }
            if(frameCount % 120 == 0){
              rocksL2[i].disappear()
            }
          }

      }
// LEVEL2 ENDS

// LEVEL3 BEGINS
        if(window.parent.gameState == 3){

          for (let i = 0; i < rocksL3.length; i++){
            rocksL3[i].display()
          }

          imageMode(CENTER)
          sis1L3.display()
          sis1L3.move()
          sis1L3.computerSensors()
        }
// LEVEL3 ENDS


// LEVEL0 BEGINS
      if(window.parent.gameState == 0){
        imageMode(CORNER)
        image(initial,0,0,550,550)
      }
// LEVEL0 ENDS


// LEVEL FAIL BEGINS
      if(window.parent.gameState == 1.2
        ||window.parent.gameState == 2.2
        ||window.parent.gameState == 3.2){
          imageMode(CORNER)
          image(gameOver,0,0,550,550)
        }

        // generate NEW MAP - L1
        if(window.parent.gameState == 1.2){
          if(keyIsDown(82)){
            window.parent.replay = true
            for(let i = 0; i<rocksL1.length; i++){
              rocksL1[i].x = int(random(1,10))
              rocksL1[i].y = int(random(1,10))
            }
            sis1L1.x = cPosX
            sis1L1.y = cPosY
            window.parent.gameState = 1
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
          }
        }

        // generate NEW MAP - L2
        if(window.parent.gameState == 2.2){
          if(keyIsDown(82)){
            window.parent.replay = true
            for(let i = 0; i<rocksL2.length; i++){
              rocksL2[i].x = int(random(1,10))
              rocksL2[i].y = int(random(1,10))
            }
            sis1L2.x = cPosX
            sis1L2.y = cPosY
            window.parent.gameState = 2
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
          }
        }

        // generate NEW MAP - L3
        if(window.parent.gameState == 3.2){
          if(keyIsDown(82)){
            window.parent.replay = true
            for(let i = 0; i<rocksL3.length; i++){
              rocksL3[i].x = int(random(1,10))
              rocksL3[i].y = int(random(1,10))
            }
            sis1L3.x = cPosX
            sis1L3.y = cPosY
            window.parent.gameState = 3
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
          }
        }

// LEVEL FAIL ENDS


// LEVEL WIN BEGINS
      if(window.parent.gameState == 3.5){
          imageMode(CORNER)
          image(youWin,0,0,550,550)

          if(keyIsDown(81)){
            window.parent.gameState = 0
          }
      }
// LEVEL WIN ENDS




// CUSTOMIZE LEVEL BEGINS
          if(window.parent.gameMode == 1000){
                  for(let y = 0; y < 11; y ++){
                    for(let x = 0; x < 11; x ++){
                      imageMode(CORNER)
                      art = road
                      image(art,x*50,y*50,50,50)
                        if(window.parent.world_cus1[y][x]== 1){
                          art = tree
                          image(art,x*50,y*50,50,50)
                        }
                        if(window.parent.world_cus1[y][x]== 11){
                          art = door
                          image(art,x*50,y*50,50,50)
                        }
                        if(window.parent.world_cus1[y][x]== 111){
                          art = sisa
                          image(art,x*50,y*50,50,50)
                        }
                    }
                  }

                  if(mouseIsPressed == true){
                    fill(255,255,255,0)
                    stroke(255,0,0)
                    strokeWeight(5)
                    rectMode(CORNER)
                    rect(int(mouseX/50)*50,int(mouseY/50)*50,50,50)
                    if(keyIsDown(84)){
                      window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] = 1
                      window.parent.world_cus2[int(mouseY/50)][10-int(mouseX/50)] = 1
                    }
                    if(keyIsDown(90)){
                      if(window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] == 11){
                        window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] = 0
                        window.parent.world_cus2[int(mouseY/50)][10-int(mouseX/50)] = 0
                        doorOn = false
                      }
                      if(window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] == 111){
                        window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] = 0
                        window.parent.world_cus2[int(mouseY/50)][10-int(mouseX/50)] = 0
                        girlOn = false
                      }
                    }
                    if(keyIsDown(69) && doorOn == false){
                      window.parent.world_cus1[int(mouseY/50)][int(mouseX/50)] = 11
                      window.parent.world_cus2[int(mouseY/50)][10-int(mouseX/50)] = 22
                      doorOn = true
                    }
                    if(keyIsDown(67) && girlOn == false){
                      myX = int(mouseX/50)
                      myY = int(mouseY/50)
                      window.parent.world_cus1[myY][myX] = 111
                      window.parent.world_cus2[myY][10-myX] = 222
                      girlOn = true
                    }
                    if(keyIsDown(83)){
                      window.localStorage.setItem("myWorld1",JSON.stringify(window.parent.world_cus1))
                      window.localStorage.setItem("myWorld2",JSON.stringify(window.parent.world_cus2))
                      window.localStorage.setItem("myPosX", myX * 50)
                      window.localStorage.setItem("myPosY", myY * 50)
                    }
                  }
              }
// CUSTOMIZE LEVEL ENDS


// SHOW CUSTOMIZE LEVEL BEGINS
        if(window.parent.gameMode == 2000){

          window.parent.world1 = window.localStorage.getItem("myWorld1")
          window.parent.world2 = window.localStorage.getItem("myWorld2")
          window.parent.world_new2 = window.localStorage.getItem("myWorld2")
          window.parent.world_new3 = window.localStorage.getItem("myWorld2")
          window.parent.c1PosX = window.localStorage.getItem("myPosX")
          window.parent.c1PosY = window.localStorage.getItem("myPosY")
          window.parent.c2PosX = 500 - window.parent.c1PosX
          window.parent.c2PosY = window.parent.c1PosY

          console.log(window.parent.world1)

          cPosX = window.parent.c1PosX
          cPosY = window.parent.c1PosY
        }
// SHOW CUSTOMIZE LEVEL ENDS

console.log(cPosX,cPosY)


}
// FUNCTION DRAW ENDS






class Popup{

  constructor(x,y){
    this.x = x
    this.y = y
  }

  // DISPLAY ROCKS
  // make sure the tile is empty in both screen
  display(){
    if(window.parent.world1[this.y][this.x] == 0
    && window.parent.world2[this.y][10-this.x] == 0){
      window.parent.world1[this.y][this.x] = 5
    }
  }


  // ROCKS disappear & popup in new tiles
  disappear(){
    window.parent.world1[this.y][this.x] = 0
    this.x = int(random(1,10))
    this.y = int(random(1,10))
    this.display()
  }
}


class SIS1 {

  constructor(x,y){

          this.x = x
          this.y = y

          this.speed = 1
          this.size = 50

          // display sensors
          this.computerSensors()
  }


  display(){
          image(sisa,this.x,this.y,this.size,this.size)

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
  }


  move(){

          // move inside (D - move right)
          if(keyIsDown(68)&& moveOK (getTileByPos(this.right.x,this.right.y)) == true){
            window.parent.L1moveIn1 = true
            this.x += this.speed
          }else{
            window.parent.L1moveIn1 = false
          }


          // move outside (A - move left)
          if(keyIsDown(65)&& moveOK (getTileByPos(this.left.x,this.left.y)) == true){
            window.parent.L1moveOut1 = true
            this.x -= this.speed
          }else{
            window.parent.L1moveOut1 = false
          }

          // not moving when both AD are pressed
          if(keyIsDown(65) && keyIsDown(68)){
            window.parent.L1moveIn1 = false
            window.parent.L1moveOut1 = false
            this.x += 0
          }


          // check the other screen
          if(window.parent.L1moveIn2 == true){
            this.x += this.speed
          }else if(window.parent.L1moveOut2 == true){
            this.x -= this.speed
          }


          // move up
          if(keyIsDown(87)&& moveOK (getTileByPos(this.up.x,this.up.y)) == true){
            window.parent.L1moveUp1 = true
            this.y -= this.speed
          }else{
            window.parent.L1moveUp1 = false
          }


          // move down
          if(keyIsDown(83)&& moveOK (getTileByPos(this.down.x,this.down.y)) == true){
            window.parent.L1moveDown1 = true
            this.y += this.speed
          }else{
            window.parent.L1moveDown1 = false
          }


          // not moving when both SW are pressed
          if(keyIsDown(83) && keyIsDown(87)){
            window.parent.L1moveUp1 = false
            window.parent.L1moveDown1 = false
            this.y += 0
          }


          // check the other screen
          if(window.parent.L1moveUp2 == true){
            this.y -= this.speed
          }else if(window.parent.L1moveDown2 == true){
            this.y += this.speed
          }

          // sensor
          fill(255,0,0)
          // ellipse(this.right.x, this.right.y,5,5)
          // ellipse(this.left.x, this.left.y,5,5)
          // ellipse(this.up.x, this.up.y,5,5)
          // ellipse(this.down.x, this.down.y,5,5)
          // ellipse(this.x,this.y,5,5)
  }


      computerSensors(){
              this.right = {x:this.x + 18, y:this.y}
              this.left = {x:this.x - 18, y:this.y}
              this.up = {x:this.x, y:this.y - 22}
              this.down = {x:this.x, y:this.y + 22}
      }
}
