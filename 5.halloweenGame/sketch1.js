// artwork for the game 
let artGL,artGR;
let artGO;
let artCY,artCR,artCB,artCG;
let artPPK;
let artBG;
let artOver,artRestart;

// sound effects 
let soundCandy,soundDie,soundClick;

// moving background
let p1 = 0
let p2 = 640

// socring system
let score = 0;
let HI = 0;

// ghost position
let xPosGhost;

// 0 = initial / 1 = play / 2 = end
let state = 0; 
let mode;

let gameCanvas;




function preload(){

	artBG = loadImage("images/starryNite.png")
	artGL = loadImage("images/ghostLeft.png")
	artGR = loadImage("images/ghostRight.png")

	artCY = loadImage("images/candyY.png")
	artCR = loadImage("images/candyR.png")
	artCB = loadImage("images/candyB.png")
	artCG = loadImage("images/candyG.png")

	artPPK = loadImage("images/pumpKing.png")

	artRule = loadImage("images/rules.png")
	artMode = loadImage("images/mode.png")
	artOver = loadImage("images/gameOver.png")
	artRestart = loadImage("images/restart.png")

	soundCandy = loadSound('sounds/candy.wav')
	soundDie = loadSound('sounds/die.wav')
	soundClick = loadSound('sounds/click.wav')

}


function setup(){

	gameCanvas = createCanvas(480,500)
	background(0)

	artGO = artGL

	xPosGhost = 200

	c1 = new Candy (60,artCY)
	c2 = new Candy (120,artCR)
	c3 = new Candy (180,artCB)
	c4 = new Candy (240,artCG)
	c5 = new Candy (300,artCB)
	c6 = new Candy (360,artCR)
	c7 = new Candy (420,artCY)

	pk1 = new Pumpkin()
	pk2 = new Pumpkin()
	pk3 = new Pumpkin()

}






function draw(){
	
// moving background
  image(artBG,0,p1)
  image(artBG,0,p2)

  p1 += 1
  p2 += 1

  if (p1>640){
		p1 = p2 - 640
	}
	if (p2>640){
		p2 = p1 - 640
	}


	// initial  - show rule & modes
	if (state == 0){
		score = 0
		mode = "-"
		image(artRule,-150,-30,780,500)
		image(artMode,50,350,400,75)

	}


	// play 
	if (state > 1 && state < 2){

		

			xPosGhost = constrain(xPosGhost,-5,width-75)

			image(artGO,xPosGhost,300,80,80)


			// control ghost
			if (keyIsDown(65)){
				xPosGhost -= 2.5
				artGO = artGL
			}

			if (keyIsDown(68)){
				xPosGhost += 2.5
				artGO = artGR
			}


			// dropping candies
			c1.display()
			c1.move()
			c1.checkhit()

			c2.display()
			c2.move()
			c2.checkhit()

			c3.display()
			c3.move()
			c3.checkhit()

			c4.display()
			c4.move()
			c4.checkhit()

			c5.display()
			c5.move()
			c5.checkhit()

			c6.display()
			c6.move()
			c6.checkhit()

			c7.display()
			c7.move()
			c7.checkhit()
	}


	// easy mode
	if(state == 1.1){

		mode = "Easy"


		pk1.display()
		pk1.moveEasy()
		pk1.checkhit()

		pk2.display()
		pk2.moveEasy()
		pk2.checkhit()

		pk3.display()
		pk3.moveEasy()
		pk3.checkhit()
	}


	// medium mode 
	if(state == 1.2){

		mode = "Medium"

		pk1.display()
		pk1.moveMedium()
		pk1.checkhit()

		pk2.display()
		pk2.moveMedium()
		pk2.checkhit()

		pk3.display()
		pk3.moveMedium()
		pk3.checkhit()
	}

	
	// hard mode
	if(state == 1.3){

		mode = "Hard"


		pk1.display()
		pk1.moveHard()
		pk1.checkhit()

		pk2.display()
		pk2.moveHard()
		pk2.checkhit()

		pk3.display()
		pk3.moveHard()
		pk3.checkhit()
	}


	if (state == 2){

		if (HI < score){
			HI = score

		window.localStorage.setItem("HI",HI)
		}

		image(artOver,40,120,400,200)
		fill(250,223,112)
		textSize(20)
		text(score,320,220,200,200)
		text(HI,320,280,200,200)
		image(artRestart,160,420,150,75)

	}

	window.localStorage.setItem("score",score)
	window.localStorage.setItem("mode",mode)
	
}





class Candy{

	constructor(x,pic){

		this.xPos = x
		this.yPos = random(-600,-100)

		this.speed = 2;
		this.pic = pic
	}

	display(){
		image(this.pic,this.xPos,this.yPos,55,55)
	}

	move(){
		this.yPos += this.speed


		if (this.yPos > 500){
			this.yPos = random(-600,-100)
		}
	}

	checkhit(){
		if( abs(this.xPos - xPosGhost) < 50 && abs(300 - this.yPos) < 20){
			this.yPos = random(-600,-100)
			score += 1
			soundCandy.play()

		}
	}

}





class Pumpkin{

	// make candy react when hit ghost

	constructor(){


		this.xPos = random(80,400)
		this.yPos = random(-800,-100)

		this.speedEasy = 3;
		this.speedMedium = 4;
		this.speedHard = 6;
		this.pic = artPPK

	}

	display(){
		image(this.pic,this.xPos,this.yPos,55,55)
	}

	moveEasy(){
		this.yPos += this.speedEasy
		if (this.yPos > 500){
			this.xPos = random(80,400)
			this.yPos = random(-800,-100)
		}
	}

	moveMedium(){
		this.yPos += this.speedMedium
		if (this.yPos > 500){
			this.xPos = random(80,400)
			this.yPos = random(-800,-100)
		}
	}

	moveHard(){
		this.yPos += this.speedHard
		if (this.yPos > 500){
			this.xPos = random(80,400)
			this.yPos = random(-800,-100)
		}
	}


	checkhit(){
		if( abs(this.xPos - xPosGhost) < 50 && abs(300 - this.yPos) < 20){
			this.yPos = random(-600,-100)
			soundDie.play()
			state = 2
		}
	}

}



function mousePressed(){

	if (state == 2 && mouseY > 430 && mouseY < 490 && mouseX > 160 && mouseX <310){
			soundClick.play()
			state = 0
		}

	if (state == 0 && mouseY > 370 && mouseY < 405){
			soundClick.play()

			if (mouseX > 50 && mouseX < 160){
				state = 1.1
			}else if (mouseX > 200 && mouseX < 290) {
				state = 1.2
			}else if (mouseX > 340 && mouseX < 440){
				state = 1.3
			}else{
				state = 0
			}

	}
 }


function restart(){
	state = 0
}

