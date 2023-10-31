let world;
let plumbob; 
let enter;
let container;
let bgm


// preload the click sound 
function preload(){
  clickSound = loadSound('music/click.wav')
  bgm = loadSound('music/bgm.wav')
}

function setup(){
  noCanvas();
  noStroke();

  // not enter yet
  enter = false

  //  connect to VR
  world = new World ("VRScene");

  // dynamic texture
  buffer1 = createGraphics(1000,1000)
  buffer1.background(200,255)
  texture1 = world.createDynamicTextureFromCreateGraphics(buffer1)


  // set the user "outside" the gallery
  world.setUserPosition(0,1,20)

  // set the sky color
  world.setBackground(200,200,200)

  // create a floor
  let floor = new Box({
    x:0, y:-5, z:0,
    width:30, height: 30,depth:0.2,
    rotationX: -90,
    asset:texture1,
    dynamicTexture:true,
    dynamicTextureWidth: 30,
    dynamicTextureHeight: 30,

  })
    world.add(floor)


  // add frames to the world
    var set1 = new Set(-5,3,-12,0,'pic1')
    var set2 = new Set(5,3,-12,0,'pic2')
    var set3 = new Set(-11,3,-6,90,'pic3')
    var set4 = new Set(-11,3,5,90,'pic4')
    var set5 = new Set(11,3,-6,-90,'pic5')
    var set6 = new Set(11,3,5,-90,'pic6')
    var set7 = new Set(-5,3,11,180,'pic7')
    var set8 = new Set(5,3,11,180,'pic8')



    // add the center point
      var center = new Sphere ({
          x:0, y:2, z:-2, 
          radius:0.005,
          red:255, green:255, blue:255,
      })
      world.add(center)


      // create a container that hold the dog and the plumbob
      container = new Container3D({
        x:0,y:0,z:0,
      })
      world.add(container)


    // add a 3D dog
    dog = new GLTF({
      asset: 'dog',
      x: 0,
      y: -2,
      z: 13,

    });
    container.add(dog);


    // add a plumbob
    plumbob = new Octahedron({
      x: 0, y:-1, z:13,
      radius: 0.2,
      red:120, green:174, blue:52,

    // enter the world by click the plumbob
      clickFunction: function (me){
        if(enter == false){
          world.slideToObject(center,2000)
          enter = true
          clickSound.play()
          bgm.play()
        }
      }
    })
    container.add(plumbob);

}



class Set {
  constructor(x,y,z,r,pic){

      // make a frame (plane)
      this.myFrame = new Plane({
        x:x, y:y, z:z,
        red:255, green:255, blue:255,
        width:8, height:4.5,
        rotationY:r,
        asset: pic,
        enterFunction: function (me){
          me.setScale(1.45,1.45,1.45);
        },
        leaveFunction: function (me){
          me.setScale(1,1,1);
        },
      });
      world.add(this.myFrame);


      // make a caption (prism)
        this.myCaption = new Cylinder({
        x:x, y: y-4, z:z,
        height: 5,
        radius:0.6,
        red:126, green:132, blue:136,
        rotationX: -90,
        rotationY: r-90,
        segmentsRadial: 3,
      });
      world.add(this.myCaption)
      
  }
}



function draw(){

  // spin the plumbob
  plumbob.spinY(1)

  // enter the gallery
  if(enter == true){
    container.nudge(0,-1,4)
    container.spinY(180)
    enter = false
  }

  buffer1.noStroke()
  buffer1.fill(random(255),random(255),random(255),100);
  buffer1.ellipse(random(1000),random(1000),random(20),random(20))
  
}
