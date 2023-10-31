let artBG;


function setup() {
  // create our canvas
  createCanvas(480, 50);

  // erase the background
  background(255);

  artBG = loadImage("images/starryNite.png")
}

function draw(){

  image(artBG,0,0)


  let mode = window.localStorage.getItem("mode")
  let score = window.localStorage.getItem("score")
  let HI = window.localStorage.getItem("HI")

  fill(250,224,112)
  textSize(15)
  text("mode: "+ mode, 50,25)
  text("score: "+ score, 200,25)
  text("HI: "+ HI, 350,25)

}
