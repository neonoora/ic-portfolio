// variable to hold a reference to our A-Frame world
let world;

// dynamic texture buffer
let buffer, texture;

// container holds a set of tangram together 
let container,theContainers = [];

// communicate 2D & 3D positions
let panelMouseX,panelMouseY,modelX,modelY;

// cool down - add one container each time 
let counter = 0, addOK = false;

// buttons
let restartButton,clearButton,staticButton,moveButton,flyButton,addButton;

// indicate the creature's feature - fly / walk / stay still? 
let containerType;

// create arrays for different types of containers
let theStaticContainers = [];
let theMoveContainers = [];
let theFlyContainers = [];
let allTheContainers = [];

// preload Sound
function preload(){
	addSound = document.getElementById('soundEffect')
};

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	world = new World('VRScene');
	world.setBackground(128,200,256);

	world.setUserPosition(0,0,2)

	// create our off screen graphics buffer & texture
	buffer = createGraphics(1500, 1000);
	texture = world.createDynamicTextureFromCreateGraphics(buffer);
	
	// floor for the containers to race around on
	let floor = new Box({
		width: 50,
		height: 20,
		depth:0.2,
		red:200,green:200,blue:200,
		rotationX: -90,
		y:-3,z:2,
		asset:'moss',
		repeatX:50,
		repeatY:20,
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
		},
	});
	world.add(panel);

	// click to restart the easel 
	// put 2D & 3D models back to their original places
	restartButton = new Box({
		red:255,green:255,blue:0,
		x:-2.5,y:5.5,z:-5,
		width:0.2,height:0.2,depth:0.1,
		clickFunction:function(me){
			p1 = new Piece (250,125,250,90,59,128,234,1,1)
			p1Model.setRotation(0,0,0)
			p1Model.setPosition(-2,1,0)

			
			p2 = new Piece (125,250,250,0,188,43,102,1,2)
			p2Model.setRotation(0,0,0)
			p2Model.setPosition(-2.5,0.5,0)

			p3 = new Piece (437.5,125,125,180,217,84,54,1,3)
			p3Model.setRotation(0,0,0)
			p3Model.setPosition(-1.2,1,0)


			p4 = new Piece (250,312.5,125,-90,70,156,164,1,4)
			p4Model.setRotation(0,0,0)
			p4Model.setPosition(-2,0.2,0)


			p5 = new Piece (437.5,437.5,176.77,45,102,61,184,1,5)
			p5Model.setRotation(0,0,-45)
			p5Model.setPosition(-1.28,-0.2,0)


			p6 = new Piece (375,250,176.77,45,83,169,60,2,6)
			p6Model.setRotation(0,0,0)
			p6Model.setPosition(-1.5,0.5,0)


			p7 = new Piece (187.5,437.5,125,0,230,185,63,3,7)
			p7Model.setRotation(0,0,0)
			p7Model.setPosition(-2.3,-0.2,0)
		}
	})
	world.add(restartButton)

	let restartText = new Text ({
		text:"Restart Easel",
		red:128,green:128,blue:128,
		side:'double',
		x:-3.3,y:5.5,z:-5,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(restartText)

	// click to clear the world 
	// remove all the container copies from their arrays & the world
	clearButton = new Box({
		red:255,green:0,blue:255,
		x:-2.5,y:3,z:-5,
		width:0.2,height:0.2,depth:0.1,
		clickFunction:function(me){

			while(theStaticContainers.length > 0){
				world.remove(theStaticContainers[0].containerCopy)
				theStaticContainers.splice(0,1)
			}

			while(theMoveContainers.length > 0){
				world.remove(theMoveContainers[0].containerCopy)
				theMoveContainers.splice(0,1)
			}

			while(theFlyContainers.length > 0){
				world.remove(theFlyContainers[0].containerCopy)
				theFlyContainers.splice(0,1)
			}
		}
	})
	world.add(clearButton)

	let clearText = new Text ({
		text:"Clear Garden",
		red:128,green:128,blue:128,
		side:'double',
		x:-3.3,y:3,z:-5,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(clearText)


	// instruciton on how to use easel
	let easelInstructionText1 = new Text({
		text:"Mouse Click & Move on Easel",
		red:128,green:128,blue:128,
		side:'double',
		x:-3.8,y:4.4,z:-5,
		scaleX:4,scaleY:4,scaleZ:4,
	})
	world.add(easelInstructionText1)


	let easelInstructionText2 = new Text({
		text:"R - Rotate / F - flip / Z - Set the piece",
		red:128,green:128,blue:128,
		side:'double',
		x:-3.8,y:4.1,z:-5,
		scaleX:4,scaleY:4,scaleZ:4,
	})
	world.add(easelInstructionText2)

	// click to add the creature to the world
	addButton = new Box({
		red:255,green:70,blue:0,
		x:2.5,y:3,z:-5,
		width:0.2,height:0.2,depth:0.1,
		clickFunction:function(me){
			addOK = true;
			addSound.play()
		}
	})
	world.add(addButton)

	let addText = new Text ({
		text:"ADD MY CREATURE",
		red:128,green:128,blue:128,
		side:'double',
		x:3.7,y:3,z:-5,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(addText)

	// indicate that this create should be added to the fly array
	flyButton = new Sphere({
		red:255,green:0,blue:0,
		x:2.5,y:5,z:-5,
		radius:0.12,
		opacity:0.5,
		clickFunction:function(me){
			containerType = 'fly'
			flyButton.setOpacity(1)
			moveButton.setOpacity(0.5)
			staticButton.setOpacity(0.5)

			flyButtonText.setOpacity(1)
			moveButtonText.setOpacity(0.3)
			staticButtonText.setOpacity(0.3)
		},
	})
	world.add(flyButton)

	let chooseText = new Text ({
		text:"My creature can ...",
		red:128,green:128,blue:128,
		side:'double',
		x:3.5,y:5.5,z:-5,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(chooseText)

	let flyButtonText = new Text ({
		text:"fly",
		red:0,green:0,blue:0,
		side:'double',
		x:2.9,y:5,z:-5,
		opacity:0.3,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(flyButtonText)

	// indicate that this create should be added to the move array
	moveButton = new Sphere({
		red:0,green:255,blue:0,
		x:2.5,y:4.5,z:-5,
		radius:0.12,
		opacity:0.5,
		clickFunction:function(me){
			containerType = 'move'
			flyButton.setOpacity(0.5)
			moveButton.setOpacity(1)
			staticButton.setOpacity(0.5)

			flyButtonText.setOpacity(0.3)
			moveButtonText.setOpacity(1)
			staticButtonText.setOpacity(0.3)
		},
	})
	world.add(moveButton)

	let moveButtonText = new Text ({
		text:"walk",
				red:0,green:0,blue:0,
		side:'double',
		x:3,y:4.5,z:-5,
		opacity:0.3,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(moveButtonText)

	// indicate that this create should be added to the static array
	staticButton = new Sphere({
		red:0,green:0,blue:255,
		x:2.5,y:4,z:-5,
		radius:0.12,
		opacity:0.2,
		clickFunction:function(me){
			containerType = 'static'
			flyButton.setOpacity(0.5)
			moveButton.setOpacity(0.5)
			staticButton.setOpacity(1)

			flyButtonText.setOpacity(0.3)
			moveButtonText.setOpacity(0.3)
			staticButtonText.setOpacity(1)
		},
	});
	world.add(staticButton)

	let staticButtonText = new Text ({
		text:"stay still",
		red:0,green:0,blue:0,
		side:'double',
		x:3.2,y:4,z:-5,
		opacity:0.3,
		scaleX:5,scaleY:5,scaleZ:5,
	})
	world.add(staticButtonText)

	// create an original container functions as the template
	container = new Container3D({
		x:0.5,y:0.5,z:-5,
	})
	world.add(container)

	// create a center point for the original container
	let centerPoint = new Sphere ({
		x:0,y:0,z:1,
		red:255,green:0,blue:0,
		radius:0.03,
	})
	container.add(centerPoint)



	/* —————— 2D & 3D TANGRAM PIECES —————— */

	// triangle - blue on the top
	p1 = new Piece (250,125,250,90,59,128,234,1,1)

		p1Model = new OBJ ({
			asset: 'p1_obj',
			mtl: 'p1_mtl',
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
	/* —————— 2D & 3D TANGRAM PIECES —————— */
}




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

	/* MAKE A COPY FROM THE ORIGINAL CONTAINER */
	if(addOK == true){
		addOK = false
		let temp = new ContainerCopy()

		if(containerType == 'move'){
			theMoveContainers.push(temp)
		}else if(containerType == 'fly'){
			theFlyContainers.push(temp)
		}else{
			theStaticContainers.push(temp)
		}
	}
	/* MAKE A COPY FROM THE ORIGINAL CONTAINER */

		// containers in the move array should walk around
		for(let i = 0; i < theStaticContainers.length; i++){
			theStaticContainers[i].stay()
		}

		// containers in the move array should walk around
		for(let j = 0; j < theMoveContainers.length; j++){
			theMoveContainers[j].move()
			theMoveContainers[j].walk()

		}

		// containers in the fly array should fly around
		for(let k = 0; k < theFlyContainers.length; k ++){
			theFlyContainers[k].move()
			theFlyContainers[k].fly()
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




class ContainerCopy{

	constructor(){

		// pick a ranodm position to start
		this.x = random(-25,25)
		this.y = -1
		this.z = random(0,10)
		this.rotationY = random(360)

		// pick random destination and moving speed
		this.moveDestX = random(-25,25)
		this.moveDestZ = random(-5,10)
		this.moveSpeed = random(0.01,0.03)

		this.stayX = random(6,25)
		this.walkX = random(-25,5)

		this.counter = 0

		// create a copy of the original container
		this.containerCopy = new Container3D({
			x:this.x, 
			y:this.y, 
			z:this.z, 
			rotationY:this.rotationY
		})

		this.p1Copy = new OBJ ({
			asset: 'p1_obj',
			mtl: 'p1_mtl',
			x:p1Model.getX(),y:p1Model.getY(),z:p1Model.getZ(),
			rotationX:p1Model.getRotationX(),
			rotationY:p1Model.getRotationY(),
			rotationZ:p1Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p1Copy)

		this.p2Copy = new OBJ ({
			asset: 'p2_obj',
			mtl: 'p2_mtl',
			x:p2Model.getX(),y:p2Model.getY(),z:p2Model.getZ(),
			rotationX:p2Model.getRotationX(),
			rotationY:p2Model.getRotationY(),
			rotationZ:p2Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p2Copy)

		this.p3Copy = new OBJ ({
			asset: 'p3_obj',
			mtl: 'p3_mtl',
			x:p3Model.getX(),y:p3Model.getY(),z:p3Model.getZ(),
			rotationX:p3Model.getRotationX(),
			rotationY:p3Model.getRotationY(),
			rotationZ:p3Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p3Copy)

		this.p4Copy = new OBJ ({
			asset: 'p4_obj',
			mtl: 'p4_mtl',
			x:p4Model.getX(),y:p4Model.getY(),z:p4Model.getZ(),
			rotationX:p4Model.getRotationX(),
			rotationY:p4Model.getRotationY(),
			rotationZ:p4Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p4Copy)

		this.p5Copy = new OBJ ({
			asset: 'p5_obj',
			mtl: 'p5_mtl',
			x:p5Model.getX(),y:p5Model.getY(),z:p5Model.getZ(),
			rotationX:p5Model.getRotationX(),
			rotationY:p5Model.getRotationY(),
			rotationZ:p5Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p5Copy)

		this.p6Copy = new OBJ ({
			asset: 'p6_obj',
			mtl: 'p6_mtl',
			x:p6Model.getX(),y:p6Model.getY(),z:p6Model.getZ(),
			rotationX:p6Model.getRotationX(),
			rotationY:p6Model.getRotationY(),
			rotationZ:p6Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p6Copy)

		this.p7Copy = new OBJ ({
			asset: 'p7_obj',
			mtl: 'p7_mtl',
			x:p7Model.getX(),y:p7Model.getY(),z:p7Model.getZ(),
			rotationX:p7Model.getRotationX(),
			rotationY:p7Model.getRotationY(),
			rotationZ:p7Model.getRotationZ(),
			scaleX:0.075,scaleY:0.075,scaleZ:0.075,
		})
		this.containerCopy.add(this.p7Copy)

		// add a sensor in front of the creature
		// so the creature can always move toward the sensor
		    this.sensor = new Box({
	      		x:0,y:0,z:5,
      			width:0.1,height:0.1,depth:0.1,
	      		opacity: 0.2
    		});
    		this.containerCopy.addChild(this.sensor);

		world.add(this.containerCopy)

		// perlin noise offset
    	this.noiseOffset = random(1000);
	}

	// creatures in different arrays have their own territory

	stay(){
		this.x = this.stayX
		this.containerCopy.setPosition(this.x, -1, this.z);
	}


	move(){
		if (this.x < this.destX) {
			this.x += this.moveSpeed
		}
		else {
			this.x -= this.moveSpeed
		}

		if (this.z < this.destZ) {
			this.z += this.moveSpeed
		}
		else {
			this.z -= this.moveSpeed
		}
		this.counter += 1

		// have the creature sway while moving 
		let swayAmount = map(noise(this.noiseOffset), 0, 1, -1, 1);
    	this.containerCopy.spinY(swayAmount);
    	this.noiseOffset += 0.01;
	}

	walk(){
		this.x = this.walkX
		this.containerCopy.setPosition(this.x, -1, this.z);
		if (this.counter == 360) {
			this.destX = random(-25,5);
			this.destZ = random(-5,10);
			this.moveSpeed = random(0.01,0.03)
			this.counter = 0
		}
	}

	fly(){
		// the flying creatures should move up & down 
		this.containerCopy.setPosition(this.x, 10, this.z);
		let fluctuateAmount = map(noise(this.noiseOffset), 0, 1, -1, 1);
		this.containerCopy.nudge(0,fluctuateAmount,0);
		if (this.counter == 360) {
			this.destX = random(-25,25);
			this.destZ = random(-10,10);
			this.moveSpeed = random(0.01,0.03)
			this.counter = 0
		}
	}
}