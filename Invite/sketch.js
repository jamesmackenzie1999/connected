// This Sketch uses the 'SimpleSimplePeer' Library
// how to get mysocketId?

let myVideo;
let friends = [];
let myid = "";
let peer;
let myName = ""
let stage = 0;
let friendsNames = []
let myMessages = '';
let messages;
let mouseVector = [0,0]
let myGender = ''
let myAge = ''
let timer = 0;

let color1R
let color1G
let color1B 
let color2R 
let color2G
let color2B 
var audioCtx;
var listener;

const Y_AXIS = 1;
const X_AXIS = 2;

let wc;
let line1, line2, line3, line4, line5


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
  },
  audio: true,
}

let blackFont;
let mediumFont;
let regularFont;
let thinFont;

let bGreen = '#00eb64'
let bBlue = '#0e8bf6'
let bRed = '#ff4f45'
let bWhite = '#ececec'

let inviteCircles = []
let groups = []

function preload() {
  blackFont = loadFont('ABCDiatype-Bold-Trial.otf')
  mediumFont = loadFont('ABCDiatype-Medium-Trial.otf')
  regularFont = loadFont('diatype.otf')
  thinFont = loadFont('ABCDiatype-Thin-Trial.otf')
  dharma = loadFont('font.ttf')

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(mediumFont)

  color1R = random(100,255)
  color1G = random(100,255)
  color1B = random(100,255)
  color2R = random(100,255)
  color2G = random(100,255)
  color2B = random(100,255)

  wc = windowWidth/2
  wl = windowWidth*1/8
  wr = windowWidth*7/8
  line1 = height*2/8
  line2 = height*3/8
  line3 = height*4/8
  line4 = height*5/8
  line5 = height*6/8

  myVideo = createCapture(constraints,
    function(stream) {
      peer = new p5LiveMedia(this, "CAPTURE", stream, "friendsSpace2")
      peer.on('stream', gotStream);
      peer.on('disconnect',gotDisconnect)
      // set up a data channel:
      peer.on('data', gotData);
    }
  );
  myVideo.elt.muted = true;
  myVideo.hide();
  setInterval(sendData,100);

  audioCtx = new AudioContext();
  listener = audioCtx.listener;
  //listener.setPosition(0,0,0);

  for (var i=0; i<10; i++){
    groupPosition = {x: random(0,width),y: random(0,height)}
    groups.push(groupPosition)
  }
}

function draw() {
  background('#1b1b1b');
  textAlign(CENTER, CENTER);
  fill('#ececec');
  noStroke()
  //console.log(friends)
  let wc = width/2
  
  //image(myVideo, myPosition.x,myPosition.y, 160,120);

  // for (let i=0; i<friends.length; i++){
  //   image(friends[i].stream, friends[i].x, friends[i].y, 160,120)
  // }

  listener.setPosition(mouseX, mouseY,0)

  if(stage===0){
    class Invite {
      constructor(x,y){
        this.x = x,
        this.y = y,
        this.width = 100
        this.widthChange = 0.1
        this.xDirection = random(-PI,PI)
        this.yDirection = random(-PI,PI)
        this.speed = random(10,20)
        this.color = random([bGreen,bBlue,bRed])
      }
      drawToCanvas(){
        this.x = this.x+this.xDirection/this.speed
        this.y = this.y+this.yDirection/this.speed
        this.width = this.width + this.widthChange
        noFill()
        strokeWeight(1)

        if (dist(mouseX, mouseY, this.x,this.y) < this.width/2) {
          strokeWeight(2)
          this.x = this.x+ this.xDirection*2/this.speed
          this.y = this.y+ this.xDirection*2/this.speed
          console.log()
        }
        stroke(this.color)
        ellipse(this.x,this.y,this.width)
        noStroke()
      }
    }

    if(inviteCircles.length<36){
      for(var i=0; i<groups.length; i++){
        newInviteCircle = new Invite(groups[i].x, groups[i].y)
        inviteCircles.push(newInviteCircle)
      }
    }
  
    if(inviteCircles.length>100){
      inviteCircles.splice(0,1)
      }

    for(var i=0; i<inviteCircles.length; i++){
      inviteCircles[i].drawToCanvas()
    }

    if(mouseIsPressed){
      stage++
      nameField = createInput("");
      nameField.changed(enteredName);
      nameField.position(wc-width*1/4,line3);
    }

    textSize(150)
    textFont(dharma)
    fill(bWhite)
    text("INVITE",width/2,line1)

    textFont(regularFont)
    textSize(25)
    fill(bGreen)
    text("Break down boundaries", wc, line3)

    if(peer){
     

      if(friends.length>0) {
        textFont(regularFont)
        textSize(20)
        text('Press to Continue',wc,line4)
        let peopleWithYou = 'People Online: '+ friends.length
        textSize(15)
        text(peopleWithYou, wc,line5)
      } else {
        textFont(regularFont)
        textSize(15)
        text('Wait here for others to connect', wc, line5)
      }
    }
  }

  if(stage===1){
    text('Enter Your Name', wc, line1)
    nameField.position(mouseX,mouseY-15)
  }

  if (stage===2){
    let color1 = color(color1R, color1G, color1B)
    let color2 = color(color2R, color2G, color2B)

    setGradient(0, 0, width, height, (color(color1)), (color(color2)), X_AXIS);
    fill(255)
    noStroke()
    textSize(35)
    let welcomeName = 'Welcome ' + myName
    textFont(mediumFont)
    text(welcomeName, wc, line2)
    textSize(15)
    text('Pick your favourite point on the spectrum', wc, line3)

    if(mouseIsPressed){
      let myGenderPosition = map(mouseX, 0, width, 0, 1);
      myGender = lerpColor((color(color1)), (color(color2)), myGenderPosition);
      stage=3
    }
  }

  if(stage===3){
    timer++
    textSize(10)
    fill(myGender)
    textSize(35)
    textFont(mediumFont)
    text('What shape best represents you', wc, line1-height*1/8)
    textSize(15)
    let boxWidth = height*1/10
    fill(myGender)
    rect(wc-boxWidth*1/2,line1,boxWidth,boxWidth,0)
    rect(wc-boxWidth*1/2,line2,boxWidth,boxWidth,boxWidth*2/10)
    rect(wc-boxWidth*1/2,line3,boxWidth,boxWidth,boxWidth*3/10)
    rect(wc-boxWidth*1/2,line4,boxWidth,boxWidth,boxWidth*4/10)
    rect(wc-boxWidth*1/2,line5,boxWidth,boxWidth,boxWidth*5/10)

    if(timer>30){
      if(mouseIsPressed){
        if(mouseY>line1 && mouseY<line2){
          myAge = 1;
        }
        if(mouseY>line2 && mouseY<line3){
          myAge = 2;
        }
        if(mouseY>line3 && mouseY<line4){
          myAge = 3;
        }
        if(mouseY>line4 && mouseY<line5){
          myAge = 4;
        }
        if(mouseY>line5 && mouseY<height){
          myAge = 5;
        }
        stage=4
        messageField = createInput("");
        messageField.changed(enteredMessage);
        messageField.position(20,line5);
        messageField.id('messagefield')
      }
    } 
  }


  if(stage===4) {
    background('#1b1b1b')
    textSize(10)
    textAlign(LEFT,TOP)
    fill('#ececec');

    text("Send Messages: Click & Press Enter\nShare Video: Message 'video'\nRecieve Video: Move Closer to Someone", 5/100*width, line5);
    if(friends.length>0){
    for (let i = 0; i < friends.length; i++){
      //console.log(i+' '+friends[i].name+': '+friends[i].messages)
      if(friends[i].age>0){
        //console.log(friends[i].gender.levels)
        fill(friends[i].gender.levels) 
        text((friends[i].name+': '+friends[i].messages),friends[i].x+10, friends[i].y-5)
        if(friends[i].age==1){
          rect(friends[i].x-5,friends[i].y-5,10,10,0)
        }
        if(friends[i].age==2){
          rect(friends[i].x-5,friends[i].y-5,10,10,1)
        }
        if(friends[i].age==3){
          rect(friends[i].x-5,friends[i].y-5,10,10,2)
        }
        if(friends[i].age==4){
          rect(friends[i].x-5,friends[i].y-5,10,10,3)
        }
        if(friends[i].age==5){
          rect(friends[i].x-5,friends[i].y-5,10,10,4)
        }
      }  
    }
  }
    fill(myGender)
    if(myAge==1){
      rect(mouseX-15,mouseY-35,10,10,1)
    }
    if(myAge==2){
      rect(mouseX-15,mouseY-35,10,10,2)
    }
    if(myAge==3){
      rect(mouseX-15,mouseY-35,10,10,3)
    }
    if(myAge==4){
      rect(mouseX-15,mouseY-35,10,10,4)
    }
    if(myAge==5){
      rect(mouseX-15,mouseY-35,10,10,5)
    }
    text(('You: '+myMessages),mouseX,(mouseY-35))
    messageField.position(mouseX, mouseY-15)
    let myGenderCss = (String("'rgb("+myGender.levels[0]+", "+ myGender.levels[1]+", "+myGender.levels[2]+")'"))
    document.getElementById('messagefield').style.borderColor = myGenderCss
  }

  let mouseVector=createVector(mouseX,mouseY)

  if(myMessages==='video'){
    image(myVideo, mouseX,(mouseY-130), 160,120)
  }

  for (let i = 0; i < friends.length; i++) {
    if (friends[i].messages==='video'){
      if(friends[i].x){
        let videoVector = createVector(friends[i].x, friends[i].y)    
        let videoDistance= mouseVector.dist(videoVector)
        console.log(videoDistance)
        let videoAlpha = map(videoDistance,0,400,255,0)
        tint(255,videoAlpha)
        image(friends[i].stream, friends[i].x, friends[i].y,160, 120)
        //friends[i].display()
      }
    }
  }

  stroke(myGender)
  
  if(stage>3){
    if(friends.length>0){
      if(friends[0].x){
        let friend0Vector = createVector(friends[0].x, friends[0].y)
        let distance0 = mouseVector.dist(friend0Vector)
        let friend0Weight = map(distance0,0,400,4,0)
        if(friends[0].gender!=''){
        let lineColour0 = lerpColor(friends[0].gender, myGender,0.5)
        stroke(lineColour0)
        strokeWeight(friend0Weight)
        line(friends[0].x,friends[0].y, mouseX,mouseY)
        }
 
        if(friends.length>1){
          let friend2Vector = createVector(friends[friends.length-1].x, friends[friends.length-1].y)
          let distance2 = mouseVector.dist(friend2Vector)
          let friend2weight = map(distance2, 0,400,4,0)
          if(friends[friends.length-1].gender!=''){
          let lineColour2 = lerpColor(friends[friends.length-1].gender, myGender,0.5)
          stroke(lineColour2)
          strokeWeight(friend2weight)
          line(friends[friends.length-1].x, friends[friends.length-1].y, mouseX, mouseY)
          }  
        }
      }
    }

    for (let i = 1; i < friends.length; i++) {
      if(peer){
        if(friends.length>1){
          let lastFriendsVector=createVector(friends[i-1].x, friends[i-1].y)
          let friendsVector= createVector(friends[i].x, friends[i].y)
          let friendsDistance = lastFriendsVector.dist(friendsVector)
          let friendsWeight = map(friendsDistance,0,400,4,0)
          if(friendsWeight){
            if(friends[i].gender!=''>0 && friends[i-1].gender!=''){
              let lineColour = lerpColor(friends[i].gender, friends[i-1].gender,0.5)
              stroke(lineColour)
               } else {
              stroke(myGender)
               }
              strokeWeight(friendsWeight)
              line(friends[i].x, friends[i].y, friends[i-1].x, friends[i-1].y)
          }
        }
      }
    }
  }

  if (friends.length>0 && stage<3){
    for (let i=0; i<friends.length; i++){
      noStroke()
      ellipse(friends[0].x, friends[0].y,3,3)
      ellipse(mouseX, mouseY,4,4)
      ellipse(friends[i].x, friends[i].y,5,5)
    }
  }
}

function gotStream(stream, id) {
  friends.push(new Friend(stream, id))

  for (let i=0; i<friends.length; i++){
  }

  for (let i=0; i<friends.length; i++){
    var audioSource = audioCtx.createMediaStreamSource(friends[i].stream.elt.srcObject)
    var panner = audioCtx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'linear';
    panner.refDistance = 1;
    panner.maxDistance = 100;
    panner.rollOffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    panner.setPosition(0,0,0);
    audioSource.connect(panner);
    panner.connect(audioCtx.destination);
    stream.panner = panner;
    stream.elt.muted = true;
    stream.x = 0;
    stream.y = 0;
    friends[i].stream = stream;
  }
}

function gotData(data) {
  let parsedData = JSON.parse(data);
  let ourFriendsid = parsedData.id;
  let ourFriendsName = parsedData.friendsName
  let ourFriendsPositionX = parsedData.x;
  let ourFriendsPositionY = parsedData.y;
  let ourFriendsMessages = parsedData.friendsMessages;
  let ourFriendsGender = parsedData.gender;
  let ourFriendsAge = parsedData.age;
  
  for (let i = 0; i < friends.length; i++){
    if (friends[i].id === ourFriendsid){
      friends[i].x = ourFriendsPositionX;
      friends[i].y = ourFriendsPositionY;
      friends[i].name = ourFriendsName;
      friends[i].messages = ourFriendsMessages;
      friends[i].gender = ourFriendsGender;
      friends[i].age = ourFriendsAge
      if(stage>1){
      friends[i].stream.panner.setPosition(ourFriendsPositionX,ourFriendsPositionY,0);
    } else {friends[i].stream.panner.setPosition(1000,1000,1000)}
   }
  }
}

function enteredName() {
  myName = nameField.value();
  nameField.remove()
  stage++
}

function enteredMessage() {
  myMessages = messageField.value();
  messageField.value('');
}

function sendData() {
  let dataToSend = {
    id: peer.socket.id,
    friendsName: myName,
    friendsMessages: myMessages,
    x: mouseX,
    y: mouseY,
    gender: myGender,
    age: myAge
  };
  console.log(peer)
  peer.send(JSON.stringify(dataToSend));
}

class Friend {
  constructor(stream) {
    this.x = 0;
    this.y = 0;
    this.name = '';
    this.stream = stream;
    this.id = stream.elt.id;
    this.messages = [];
    this.gender = '';
    this.age = 0
  }
 
  display() {
    //image(this.stream, this.x, this.y, 160, 120);
  }
}

function gotDisconnect(lostID) {
  friends.splice(friends.findIndex(e => e.id === lostID),1);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

// function mouseReleased() {
//   return true
// }