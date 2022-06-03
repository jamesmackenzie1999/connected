var faces = []
var secondFace = false;

function setup() {
    createCanvas(400, 400);
    p5lm = new p5LiveMedia(this, "DATA", null, "w83C-S6DU");
    p5lm.on('data', gotData);
}

function draw() {
    background(220);
    if(window.startSketch=='true'){
    sendData()
    }
}

var pFacesLength

function gotData(data, id) {
  // If it is JSON, parse it
  let d = JSON.parse(data)
  faces = d
  // console.log(faces)
  if(pFacesLength !=faces.length){
      secondFace = 'true'
  }
  pFacesLength = faces.length
}

function sendData() {
  let dataToSend = window.Landmarks;
  // Send it
  p5lm.send(JSON.stringify(dataToSend));
}