// This Sketch uses the 'SimpleSimplePeer' Library
// how to get mysocketId?

let myVideo;
let friends = [];
let myName = "";
let peer;
let myPosition = {
  x: 10,
  y: 10
}

let constraints = {
  video: {
    width: {
      ideal: 160
    },
    height: {
      ideal: 120
    },
    frameRate: {
      ideal: 10
    }

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  myVideo = createCapture(constraints,
    function(stream) {
      peer = new p5LiveMedia(this, "CAPTURE", stream, "friendsSpace2")
      peer.on('stream', gotStream);
      // set up a data channel:
      peer.on('data', gotData);
    
    }
  );
  myVideo.muted = true;
  myVideo.hide();
}

function draw() {
  background(220, 100, 250);
  image(myVideo, myPosition.x,myPosition.y, 160,120);
  for (let i = 0; i < friends.length; i++) {
    if(peer){
    if(friends.length>1){
    // line(friends[i].x, friends[i].y, friends[i-1].x, friends[i-1].y)
    console.log(friends[0].x)
    }
    }   
  }
}

// We got a new stream!
function gotStream(stream) {
  friends.push(new Friend(stream))
}

function gotData(data) {
  console.log(data);

  // If it is JSON, parse it
  let parsedData = JSON.parse(data);
  let ourFriendsName = parsedData.name;
  let ourFriendsPositionX = parsedData.x;
  let ourFriendsPositionY = parsedData.y;
  
  for (let i = 0; i < friends.length; i++){
    console.log(friends[i]);
    if (friends[i].name === ourFriendsName){
      friends[i].x = ourFriendsPositionX;
      friends[i].y = ourFriendsPositionY;
    }
  }
}

function mousePressed() {
  
  myPosition = {
    x: mouseX,
    y: mouseY
  }

  let dataToSend = {
    name: peer.socket.id,
    x: mouseX,
    y: mouseY
  };

  // Have to send string
  peer.send(JSON.stringify(dataToSend));
}



class Friend {
  constructor(stream) {
    this.x = 0;
    this.y = 0;
    this.stream = stream;
    this.name = stream.elt.id;
  }

  display() {
    image(this.stream, this.x, this.y, 160, 120);
  }
}