// UFO image
let UFO;

// starry background
let artwork;

// sound effects
let lose_song;
let bounce_song;
let hit_song;

// paddle position
let xPosRect

// ball position 
let xPosBall, yPosBall;

// UFO position
let xPosUFO,yPosUFO

// UFO size 
let sizeUFO

// ball speed 
let xSpeedBall, ySpeedBall;

// ball starting speed
let xStartSpeed, yStartSpeed;

// hit - distance between ball and UFO
let dBU;

// hue - gradual color change
let hue;

// condition to restart 

	// center the ball
	let nuevo = true;

	// press mouse to start
	let mP =false;


// counter
let hit = 0;
let bounce = 0;
let highest = 0;

// endless background 
let p1 = 0;
let p2 = 1000;

// acceleration 
let oxSpeedBall, oySpeedBall;
let acceX, acceY;


function preload(){
	UFO = loadImage('images/ufo.png')
	artwork = loadImage('images/starfield.png')

	lose_song=loadSound('sounds/game_over.wav')
  	bounce_song=loadSound('sounds/space_bounce.wav')
  	hit_song=loadSound('sounds/ship_caught.wav')
}


function setup(){
	createCanvas(500,500)

	noStroke()

	// solid background color
	background(0)

	// out of sight UFO
	image(UFO,600,600,sizeUFO,sizeUFO)

	// paddle start position
	xPosRect = 250;

	// paddle start color
	fill(128)

	// ball start position 
	xPosBall = 250
	yPosBall = 250

	// ball start color
	r = 255;
  	g = 255;
  	b = 255;
  	hue = 0

  	// ball start speed 
  	xSpeedBall = 0;
  	ySpeedBall = 0;


	// Basic Mode  
	rectMode(CENTER)
  	ellipseMode(CENTER)
  	imageMode(CENTER)
  	colorMode(HSB,255)

}


function draw(){

	// no trace 
	background (0)

	sizeUFO = 100

	//UFO various size

    // 5 hit -> size 90
    if (hit % 2 == 0){
    	sizeUFO = 80
    }

    else if (hit % 3 == 0){
    	sizeUFO = 60
    }

    else if (hit % 5 == 0){
    	sizeUFO = 40
    }

    else if (hit % 7 == 0){
    	sizeUFO = 120
    }

	// endless background 
	image(artwork,0,p1)
  	image(artwork,250,p1)
  	image(artwork,0,p2)
  	image(artwork,250,p2)

  	// moving background
  	p1 -= 2
  	p2 -=2

	if (p1<-1000){
		p1 = p2 + 1024
	}
	if (p2<-1000){
		p2 = p1 + 1024
	}

	// get UFO
	image(UFO,xPosUFO,yPosUFO,sizeUFO,sizeUFO)


	// 3 visual borders - left, right, up
	fill(128)
	rect(10,height/2,20,height)
  	rect(width-10,height/2,20,height)
  	rect(width/2,10,width-40,20)


  	// display counter
  	fill (255)
  	text("Bounces: " + bounce, 25,15 )
  	text("UFOs: " + hit, 110,15 )
  	text("HI: " + highest, 180,15 )

  	// paddle
  	fill(128)
  	rect(xPosRect,height,100,30)

  	// keyboard control

	  	// key A -> left
	  	if (keyIsDown(65)){
	      xPosRect -= 2
	    }

	    // key D -> right
	    if (keyIsDown(68)){
	      xPosRect += 2
	    }

	// paddle boundary
	if (xPosRect < 70){
      xPosRect = 70;
    }

    if (xPosRect > width-70){
      xPosRect = width-70;
    }

    // ball gradual color change
	fill(hue,180,180)

	if (frameCount % 0.5 == 0 && hue < 300){
		hue += 0.5
	}
	if (hue == 300){
		hue = 0
	}
    ellipse(xPosBall,yPosBall,20,20)


    // ball movement 

	xPosBall += xSpeedBall;
    yPosBall += ySpeedBall;

    constrain(abs(xSpeedBall),1.2,2.5)
    constrain(abs(ySpeedBall),1.2,2.5)


    // ball bounce
    if (xPosBall < 30 || xPosBall > width - 30){
      xSpeedBall *= -1
      oxSpeedBall = xSpeedBall
      bounce_song.play()
    }

    if (yPosBall < 30){
      ySpeedBall *= -1
      oySpeedBall = ySpeedBall
      bounce_song.play()
    }


    // paddle bounce
    if (yPosBall + 10 > height - 16 && xPosBall > xPosRect - 50 && xPosBall < xPosRect + 50){
      
   	  // little over threshold
      yPosBall = height - 30.00001
      ySpeedBall *= -1
      
      
      // hit paddle left
      if (xPosRect - xPosBall < 50 && xPosRect - xPosBall > 0){
        acceX = map(xPosRect - xPosBall,0,50,0,0.1)
        acceY = map(abs(xPosRect - xPosBall),0,50,0.15,0)
        if(oxSpeedBall<0){
          xSpeedBall -= acceX
        }else{
          xSpeedBall += acceX
        }
        ySpeedBall -= acceY
      }

      // hit paddle right
      if (xPosRect - xPosBall > -50 && xPosRect - xPosBall < 0){
        acceX = map(xPosRect - xPosBall,0,-50,0,0.1)
        acceY = map(abs(xPosRect - xPosBall),0,50,0.15,0)
        if(oxSpeedBall<0){
          xSpeedBall -= acceX
        }else{
          xSpeedBall += acceX
        }
        ySpeedBall -= acceY
      }

      bounce += 1
      bounce_song.play()    

    }

    // ball fall 

    if (yPosBall - 10 > 500){
     
    	xPosBall = 250
      	yPosBall = 250
      	xPosRect = 250
      	xSpeedBall = 0
      	ySpeedBall = 0

      	mP = false
      	nuevo = true

      	xPosUFO = 600
      	yPosUFO = 600

      	lose_song.play()

      	if (highest <hit){
      		highest = hit
      	}

      	bounce = 0
      	hit = 0
    }

    dBU = dist(xPosBall,yPosBall,xPosUFO,yPosUFO)
    if (dBU < (sizeUFO/2)+10){
      hit += 1
      hit_song.play()
      xPosUFO = random (85,415)
      yPosUFO = random (85,300)
    }

    


}


function mousePressed(){
  

  while (nuevo === true){

    while (mP === false){

    xPosUFO = random (85,415)
    yPosUFO = random (85,280)

    // random speed when mouse pressed
    // speed not close to 0
    xStartSpeed = random(-2,2);
    if (xStartSpeed < -1.2 || xStartSpeed >1.2){
      xSpeedBall = xStartSpeed;

      yStartSpeed = random(-2,2);
      if (yStartSpeed < -1.2 || yStartSpeed > 1.2){
      ySpeedBall = yStartSpeed;

      nuevo = false
      mP = true;

      }else{
        continue
      }

    }else{
      continue
    }
    
    }

  }
    
}















