function setup(){
	createCanvas(1500,1000)
	background(255)

	// triangle - blue on the top
	p1 = new Piece (250,125,250,90,59,128,234,1)

	// triangle - red on the left 
	p2 = new Piece (125,250,250,0,188,43,102,1)

	// triangle - orange on the right
	p3 = new Piece (437.5,125,125,180,217,84,54,1)

	// triangle - teal in the middle
	p4 = new Piece (250,312.5,125,-90,70,156,164,1)

	// triangle - purple in the corner
	p5 = new Piece (437.5,437.5,176.77,45,102,61,184,1)

	// square - green in the middle
	p6 = new Piece (375,250,176.77,45,83,169,60,2)

	// quad - yellow down below
	p7 = new Piece (187.5,437.5,125,0,230,185,63,3)
}

function draw(){
	background(255)
	p1.displayAndMove()
	p2.displayAndMove()
	p3.displayAndMove()
	p4.displayAndMove()
	p5.displayAndMove()
	p6.displayAndMove()
	p7.displayAndMove()
}

class Piece {

	constructor(x,y,s,d,r,g,b,i){
		// x position 
		this.x = x

		// y position
		this.y = y

		// size 
		this.s = s

		// original rotation degree
		this.d = d

		// colour
		this.r = r
		this.g = g
		this.b = b

		// identitiy - 1 = triangle, 2= square, 3 = quad
		this.i = i

		// state: 0 - not moving, 1 - moving
		this.state = 0

		// customized rotation angle
		this.angle = 0

		// allow to rotate
		this.rotateOK = true

		// allow to flip
		this.flipOK = true

		// the counter prevent continuous rotations 
		this.counter = 0


		// points in triangle
		if(this.i == 1){
			this.x1 = 0-this.s/2
			this.y1 = 0-this.s
			this.x2 = this.s/2
			this.y2 = 0
			this.x3 = 0-this.s/2
			this.y3 = this.s
			this.x4 = 0
			this.y4 = 0
		}


		// points in quad
		if(this.i == 2){
			this.x1 = 0
			this.y1 = 0
			this.x2 = 0
			this.y2 = 0
			this.x3 = 0
			this.y3 = 0
			this.x4 = 0
			this.y4 = 0
		}

		// points in quad
		if(this.i == 3){
			this.x1 = 0-0.5*this.s
			this.y1 = 0-0.5*this.s
			this.x2 = 0-1.5*this.s
			this.y2 = this.s*0.5
			this.x3 = this.s*0.5
			this.y3 = this.s*0.5
			this.x4 = this.s*1.5
			this.y4 = 0-this.s*0.5
		}
	}


	displayAndMove(){

		noStroke()

		// the shape is always in rotation state
		push()
		translate(this.x,this.y)

		// rotate by original degree & customized angle 
		rotate(radians(this.d + this.angle))

		// fill colour
		fill(this.r,this.g,this.b,220)

		// display the border when moving
		if(this.state == 1){
			fill(this.r,this.g,this.b,128)
		}


		// determine the shape
		if(this.i == 1){
			triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3)
		}
		if(this.i == 2){
			rectMode(CENTER)
			rect(this.x1,this.y1,this.s,this.s)
		}
		if(this.i == 3){
			quad(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4)
		}
		
		// display the center circle
		stroke(0,100)
		strokeWeight(1)
		ellipseMode(CENTER)
		ellipse(0,0,50,50)
		pop()

		// the distance between the center point and the mouse
		this.distance = dist(this.x,this.y,mouseX,mouseY)


		// ————————————————————

		// distance needs to be short enough to move the shape
		if(this.distance < 50 && mouseIsPressed == true && this.state == 0){
			this.state = 1

		}

		// move the shape sround
		if(this.state == 1){
			mouseIsPressed = false
			this.x = mouseX
			this.y = mouseY

			// press R key to rotate by 45 degree each time
			if(keyIsDown(82) && this.rotateOK == true){
				this.angle += 45
				this.rotateOK = false
				this.counter = 0
			}

			// press F to flip
			if(keyIsDown(70) && this.flipOK == true){

					this.x1 *= -1
					this.x2 *= -1
					this.x3 *= -1
					this.x4 *= -1
	
				this.flipOK = false
				this.counter = 0
			}

			// prevent continuous rotations
			this.counter += 1
			if(this.counter == 20){
				this.rotateOK = true
				this.flipOK = true
				this.counter = 0
			}

			// press Z key to place the shape
			if(keyIsDown(90)){
				window.localStorage.setItem('ghostX', mouseX)
		      	window.localStorage.setItem('ghostY', mouseY)

		      	this.x = window.localStorage.getItem("ghostX")
		     	this.y = window.localStorage.getItem("ghostY")
		      	this.state = 0
			}
		}
	}
}