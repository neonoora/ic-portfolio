let rocksL1 = []
let rocksL2 = []
let rocksL3 = []
let sis1L1

let songGameOverPlayed = false
let songYouWinPlayed = false

let ct1 = 0
let ct2 = 0
let ct3 = 0


// DIFFICULTY VALUES BEGIN
let numOfRockL1
let numOfRockL2
let numOfRockL3

let cPosX
let cPosY
// DIFFICULTY VALUES END


function preload (){
  sisa = loadImage("images/rightGirl.png")
  road = loadImage('images/road1.png')
  tree = loadImage('images/tree1.png')
  rock = loadImage('images/rock1.png')
  door = loadImage('images/door1.png')

  initial = loadImage('images/initial.png')
  gameOver = loadImage('images/gameOverR.png')
  youWin = loadImage('images/youWin.png')
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
          numOfRockL1 = 8
          numOfRockL2 = 8
          numOfRockL3 = 8

          cPosX = 25
          cPosY = 25

          showL2 = 60
          unshowL2 = 120

        // DEFAULT VALUES END

        // CUSTOMIZED DIFFICULTY BEGINS
        window.parent.gameMode = window.localStorage.getItem("MODE")
        if(window.parent.gameMode == "EASY"){

          showL2 = 60
          unshowL2 = 180
        }

        if(window.parent.gameMode == "NORMAL"){

          showL2 = 60
          unshowL2 = 120

        }

        if(window.parent.gameMode == "HARD"){
          showL2 = 30
          unshowL2 = 60

        }
        // CUSTOMIZED DIFFICULTY ENDS



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

              // SHOW MODE IN THE CORNER
              fill(113,70,222,200)
              textSize(20)
              textStyle(BOLD)
              text(window.parent.gameMode,15,500)
              text("MODE",15,530)
        }


// LEVEL0 BEGINS
      if(window.parent.gameState == 0){
        window.parent.replay = true
        if(keyIsDown(80)){
          window.parent.gameState = 1
        }

        // set difficulty level
        if(keyIsDown(69)){
          window.localStorage.setItem("MODE","EASY")
          window.location.reload()
        }
        if(keyIsDown(78)){
          window.localStorage.setItem("MODE","NORMAL")
          window.location.reload()
        }
        if(keyIsDown(72)){
          window.localStorage.setItem("MODE","HARD")
          window.location.reload()
        }

        fill(113,70,222)
        textSize(15)
        textStyle(BOLD)
        text("MODE - " + window.parent.gameMode,220,160)

        songYouWinPlayed = false
        songGameOverPlayed = false
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

        // for (let i = 0; i < rocksL2.length; i++){
        //   rocksL2[i].display()
        // }

        imageMode(CENTER)
        sis1L2.display()
        sis1L2.move()
        sis1L2.computerSensors()

          // random popup

          for(let i = 0; i < rocksL2.length; i++){
            if(frameCount % showL2 == 0 && frameCount % unshowL2 == 0){
              rocksL2[i].display();
            }
            if(frameCount % unshowL2 == 0){
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

  console.log(ct1)


      if(window.parent.gameState == 1.2
        ||window.parent.gameState == 2.2
        ||window.parent.gameState == 3.2){
          imageMode(CORNER)
          image(gameOver,0,0,550,550)
          if(songGameOverPlayed == false){
            songGameOver.play()
            songGameOverPlayed = true
          }

        }

        // generate NEW MAP - L1
        if(window.parent.gameState == 1.2){

          ct1 += 1
          if(ct1 > 420){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }

          if(keyIsDown(82) || keyIsDown(81)){
            window.parent.replay = true
            for(let i = 0; i<6; i++){
              rocksL1[i].x = int(random(1,10))
              rocksL1[i].y = int(random(1,10))
            }
            sis1L1.x = cPosX
            sis1L1.y = cPosY
            window.parent.gameState = 1
            songGameOverPlayed = false
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }
        }

        // generate NEW MAP - L2
        if(window.parent.gameState == 2.2){

          ct2 += 1
          if(ct2 > 420){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }

          if(keyIsDown(82) || keyIsDown(81)){
            window.parent.replay = true
            for(let i = 0; i<6; i++){
              rocksL2[i].x = int(random(1,10))
              rocksL2[i].y = int(random(1,10))
            }
            sis1L2.x = cPosX
            sis1L2.y = cPosY
            window.parent.gameState = 2
            songGameOverPlayed = false
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }
        }

        // generate NEW MAP - L3
        if(window.parent.gameState == 3.2){

          ct3 += 1
          if(ct3 > 420){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }

          if(keyIsDown(82) || keyIsDown(81)){
            window.parent.replay = true
            for(let i = 0; i< 6; i++){
              rocksL3[i].x = int(random(1,10))
              rocksL3[i].y = int(random(1,10))
            }
            sis1L3.x = cPosX
            sis1L3.y = cPosY
            window.parent.gameState = 3
            songGameOverPlayed = false
          }
          if(keyIsDown(81)){
            window.parent.gameState = 0
            songGameOverPlayed = false
            window.location.reload()
          }
        }

// LEVEL FAIL ENDS


// LEVEL WIN BEGINS
      if(window.parent.gameState == 3.5){
          imageMode(CORNER)
          image(youWin,0,0,550,550)
          if(frameCount%420 == 0){
            window.parent.gameState = 0
            window.parent.replay = true
          }
          if(songYouWinPlayed == false){
            songYouWin.play()
            songYouWinPlayed = true
          }
      }
// LEVEL WIN ENDS



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

  }

      computerSensors(){
              this.right = {x:this.x + 20, y:this.y}
              this.left = {x:this.x - 20, y:this.y}
              this.up = {x:this.x, y:this.y - 25}
              this.down = {x:this.x, y:this.y + 25}
      }
}
