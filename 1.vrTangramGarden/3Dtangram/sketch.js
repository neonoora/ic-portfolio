// variable to hold a reference to our A-Frame world
let world;

// dynamic texture buffer
let buffer, texture;

// container holds a set of tangram together 
let container;

// communicate (?) 2D & 3D positions
let panelMouseX,panelMouseY,modelX,modelY;


function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	world = new World('VRScene');
	world.setBackground(128,200,256);

	// create our off screen graphics buffer & texture
	buffer = createGraphics(1500, 1000);
	texture = world.createDynamicTextureFromCreateGraphics(buffer);
	

	// floor for the robots to race around on
	let floor = new Plane({
		width: 20,
		height: 20,
		red:128,green:128,blue:128,
		rotationX: -90,
		y:-5,
	});
	world.add(floor);

	// create a control panel that the user can click on
	let panel = new Plane({
		width: 4.5, height: 3,
		x: 0, y: 4.2, z: -5,
		dynamicTexture: true,
		asset: texture,
		dynamicTextureWidth: 750,
		dynamicTextureHeight: 500,
		overFunction: function (entitiy, intersectionInfo){
				panelMouseX = intersectionInfo.point2d.x
				panelMouseY = intersectionInfo.point2d.y
				modelX = intersectionInfo.point3d.x - 0.5
				modelY = intersectionInfo.point3d.y - 4
		}
	});
	world.add(panel);



	// create a container
	container = new Container3D({
		x:0.5,y:0.5,z:-5,
	})
	world.add(container)

	// create a center point for the container
	let centerPoint = new Sphere ({
		x:0,y:0,z:1,
		red:255,green:0,blue:0,
		radius:0.03,
	})
	container.add(centerPoint)






	/* ———— Geometry ———— Geometry ———— Geometry ———— Geometry ———— */

	// triangle - blue on the top
	p1 = new Piece (250,125,250,90,59,128,234,1,1)

		p1Model = new OBJ ({
			asset: 'p1_obj',
			mtl: 'p1_mtl',
			opacity:0,
			x:-2,y:1,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p1Model)

	// triangle - red on the left 
	p2 = new Piece (125,250,250,0,188,43,102,1,2)

		p2Model = new OBJ ({
			asset: 'p2_obj',
			mtl: 'p2_mtl',
			x:-2.5,y:0.5,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p2Model)

	// triangle - orange on the right
	p3 = new Piece (437.5,125,125,180,217,84,54,1,3)

		p3Model = new OBJ ({
			asset: 'p3_obj',
			mtl: 'p3_mtl',
			x:-1.2,y:1,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p3Model)

	// triangle - teal in the middle
	p4 = new Piece (250,312.5,125,-90,70,156,164,1,4)

		p4Model = new OBJ ({
			asset: 'p4_obj',
			mtl: 'p4_mtl',
			x:-2,y:0.2,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p4Model)

	// triangle - purple in the corner
	p5 = new Piece (437.5,437.5,176.77,45,102,61,184,1,5)

		p5Model = new OBJ ({
			asset: 'p5_obj',
			mtl: 'p5_mtl',
			rotationZ:-45,
			x:-1.28,y:-0.2,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p5Model)

	// square - green in the middle
	p6 = new Piece (375,250,176.77,45,83,169,60,2,6)

		p6Model = new OBJ ({
			asset: 'p6_obj',
			mtl: 'p6_mtl',
			opacity:0,
			transparent:true,
			x:-1.5,y:0.5,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p6Model)

	// quad - yellow down below
	p7 = new Piece (187.5,437.5,125,0,230,185,63,3,7)

		p7Model = new OBJ ({
			asset: 'p7_obj',
			mtl: 'p7_mtl',
			x:-2.3,y:-0.2,z:0,
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		container.add(p7Model)
}

/* ———— Geometry ———— Geometry ———— Geometry ———— Geometry ———— */


function draw() {
	buffer.clear();
	buffer.background(0);

	// add the tangram pieces
	p1.displayAndMove()
	p2.displayAndMove()
	p3.displayAndMove()
	p4.displayAndMove()
	p5.displayAndMove()
	p6.displayAndMove()
	p7.displayAndMove()

	if(keyIsDown(80)){
		container.spinY(1)
	}
}



class Piece {

	constructor(x,y,s,d,r,g,b,i,n){
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

		// piece number 
		this.n = n

		// state: 0 - not moving, 1 - moving
		this.state = 0

		// customized rotation angle
		this.angle = 0

		this.angleReverse = false

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


		// points in square
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

		buffer.noStroke()

		// the shapes are always rotating
		buffer.push()
		buffer.translate(this.x,this.y)

		// rotate by original degree & customized angle 
		buffer.rotate(radians(this.d + this.angle))

		// fill color
		buffer.fill(this.r,this.g,this.b,220)


		// determine the shape
		if(this.i == 1){
			buffer.triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3)
		}
		if(this.i == 2){
			buffer.rectMode(CENTER)
			buffer.rect(this.x1,this.y1,this.s,this.s)
		}
		if(this.i == 3){
			buffer.quad(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3,this.x4,this.y4)
		}

		// draw an ellipse in the shape center
		buffer.stroke(0,100)
		buffer.strokeWeight(1)
		buffer.ellipseMode(CENTER)
		buffer.ellipse(0,0,50,50)
		buffer.pop()

		this.targetX = panelMouseX * 2
		this.targetY = panelMouseY * 2

		// the distance between the center point and the mouse
		this.distance = dist(this.x,this.y,this.targetX,this.targetY)

		
		buffer.fill(0,255,0)
		buffer.ellipse(this.targetX,this.targetY,20,20)

		// ————————————————————


		// distance needs to be short enough to move the shape
		if(this.distance < 50 && mouseIsPressed == true && this.state == 0){
			this.state = 1
		}


		// move the shape around
		if(this.state == 1){

			this.x = this.targetX
			this.y = this.targetY

			this.ModelX = modelX
			this.ModelY = modelY

			// move around
			if(this.n == 1){
				p1Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 2){
				p2Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 3){
				p3Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 4){
				p4Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 5){
				p5Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 6){
				p6Model.setPosition(this.ModelX,this.ModelY,0)
			}else if (this.n == 7){
				p7Model.setPosition(this.ModelX,this.ModelY,0)
			}


			// Press R to rotate 45 degrees everytime
			if(keyIsDown(82) && this.rotateOK == true){
				this.angle += 45

				if(this.n == 1){
					p1Model.spinZ(-45)
				}else if(this.n == 2){
					p2Model.spinZ(-45)
				}else if(this.n == 3){
					p3Model.spinZ(-45)
				}else if(this.n == 4){
					p4Model.spinZ(-45)
				}else if(this.n == 5){
					p5Model.spinZ(-45)
				}else if(this.n == 6){
					p6Model.spinZ(-45)
				}else if(this.n == 7){
					if(this.angleReverse == false){
						p7Model.spinZ(-45)
					}else if(this.angleReverse == true){
						p7Model.spinZ(45)

					}
				}

				this.rotateOK = false
				this.counter = 0
			}


			// press F to flip
			if(keyIsDown(70) && this.flipOK == true){

				this.x1 *= -1
				this.x2 *= -1
				this.x3 *= -1
				this.x4 *= -1
							
				if(this.n == 1){
					p1Model.spinZ(180)
				}else if(this.n == 2){
					p2Model.spinZ(180)
				}else if(this.n == 3){
					p3Model.spinZ(180)
				}else if(this.n == 4){
					p4Model.spinZ(180)
				}else if(this.n == 5){
					p5Model.spinZ(180)
				}else if(this.n == 6){
					p6Model.spinZ(180)
				}else if(this.n == 7){
					if(this.angle == 45 || this.angle % 180 == 45){
						p7Model.spinX(180)
						p7Model.spinZ(90)
						this.angleReverse = true
					}else if(this.angle == 90 || this.angle % 180 == 90){
						p7Model.spinY(180)
						this.angleReverse = false
					}else if(this.angle == 135 || this.angle % 180 == 135){
						p7Model.spinY(180)
						p7Model.spinZ(-90)
						this.angleReverse = true
					}else if(this.angle == 180 || this.angle % 180 == 0){
						p7Model.spinY(180)
						this.angleReverse = true
					}
				}
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
				window.localStorage.setItem('ghostX', this.targetX)
		      	window.localStorage.setItem('ghostY', this.targetY)

		      	this.x = window.localStorage.getItem("ghostX")
		     	this.y = window.localStorage.getItem("ghostY")

		      	this.state = 0
			}
		}
	}
}
