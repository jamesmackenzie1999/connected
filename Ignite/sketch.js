let myVideo;
let friends = [];
let myID = "";
// let peer;
let myName = ""
let stage = -1;
let friendsNames = []
let myMessage = '';
let myIG = ''
let messageString = ''
let friendsMessages=[]

let messages = []
let mouseVector = [0,0]
let myGender = ''
let myAge = ''
let myLike = ''
let myColor = ''
let myMusic = ''
let myCelebrity = ''
let mySmell =''
let myDrawing = []
let myHighlights =[]

let myPressed = false
let myInterests = []
let color1 = '#b042ff'
let color2 = '#FF9300'

let bGreen = '#00eb64'
let bBlue = '#0e8bf6'
let bRed = '#ff4f45'
let bWhite = '#ececec'
let ELLIPSE_SIZE = 20

let friendsDraw =[]
let myDraw = []
let interestsLeft = 2;
let messagesLeft;

let timer0 = 20 //Drawing
let timer = 20; //Adding to Drawing
let timer2 = 20; //highlighitng shite
let timer3 = 10; //stalking instagram
let timer4 = 5; //countdown to date
let timer5 = 20; //video and decorating cupcakes
let timer7 = 20; //Messaging
let numberOfMessages = 76;

let genderFieldMade=false
let ageFieldMade = false
let interestFieldMade = false
let messageFieldMade = false
let instagramFieldMade = false
let likeFieldMade = false
let randomDrawn = false
let colorFieldMade = false
let musicFieldMade = false
let celebrityFieldMade = false
let smellFieldMade = false
let nameFieldMade = false

let audioMade = false

var audioCtx;
var listener;

const Y_AXIS = 1;
const X_AXIS = 2;

let wc;
let w1, w2,w3,w4
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

//Ratio of width 1.3* height

let blackFont;
let mediumFont;
let regularFont;
let thinFont;
let dharma;

let startImage;
let welcomeImage;
let sameImage
let celebsImage, foodImage, musicImage, sportsImage, tvImage


function preload() {
  blackFont = loadFont('ABCDiatype-Black-Trial.otf')
  mediumFont = loadFont('ABCDiatype-Medium-Trial.otf')
  regularFont = loadFont('ABCDiatype-Regular-Trial.otf')
  thinFont = loadFont('ABCDiatype-Thin-Trial.otf')
  dharma = loadFont('font.ttf')
}

let fontSize1 = 150
let fontSize2 = 25
let fontSize3 = 20
let fontSize4 = 10

let percentageMouseX = 0
let percentageMouseY = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(mediumFont)

  w1 = windowWidth*0.1
  w4= windowWidth*0.9
  w3=windowWidth*0.7
  wc = windowWidth/2
  wl = windowWidth*1/8
  wr = windowWidth*7/8
  line0 = height*0.1
  line1 = height*2/8
  line2 = height*3/8
  line3 = height*4/8
  line4 = height*5/8
  line5 = height*0.9

  myVideo = createCapture(constraints,
    function(stream) {
      peer = new p5LiveMedia(this, "CAPTURE", stream, "DigitalDating1")
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
}

let ignitionCircles = []

function draw() {

  percentageMouseX = map(mouseX, 0, width, 0, 100)
  percentageMouseY = map(mouseY, 0, height, 0, 100)

  background('#1b1b1b');
  textAlign(CENTER, CENTER);
  fill('black');
  noStroke()
  let wc = width/2
  listener.setPosition(mouseX, mouseY,0)

  class Ignition {
    constructor(x,y){
      this.x = x,
      this.y = y,
      this.width = 5
      this.widthChange = -0.5
      this.xDirection = random(-PI,PI)
      this.yDirection = random(-PI,PI)
      this.speed = random(0.05,1)
      this.color = random([bGreen,bBlue,bRed])
    }
    drawToCanvas(){
      this.x = this.x+this.xDirection/this.speed
      this.y = this.y+this.yDirection/this.speed
      this.width = this.width - this.widthChange
      if (dist(mouseX, mouseY, this.x,this.y) < this.width/2) {
        fill(this.color);
      } else {
        noFill()
      }
      stroke(this.color)
      strokeWeight(1)
      ellipse(this.x,this.y,this.width)
      noStroke()
    }
  }

  if(stage===-1){

    if(ignitionCircles.length<50){
      newIgnitionCircle = new Ignition(wc, line1)
      ignitionCircles.push(newIgnitionCircle)
    }

    if(frameCount%20===0){
      newIgnitionCircle = new Ignition(wc, line1)
      ignitionCircles.push(newIgnitionCircle)
    }
  
    if(ignitionCircles.length>100){
      ignitionCircles.splice(0,1)
      }

    for(var i=0; i<ignitionCircles.length; i++){
      ignitionCircles[i].drawToCanvas()
    }
    textSize(fontSize1)
    textFont(dharma)
    fill(bWhite)
    text("IGNITE",wc,line1)

    textFont(regularFont)
    textSize(fontSize2)
    fill(bGreen)
    text("Start something new", wc, line3)

    textFont(regularFont)
    textSize(15)
    text('Wait here for your date to connect', wc, height*0.9)
  


    if(friends[0]){
      stage=0
    }
  }

  if (stage>1){
    if(!friends[0]){
      alert('There has been an error with the internet connection,\nPlease try again.\n')
    }
    if(friends.length>1){
      alert('There are too many people in this online room.\nDisconnect any extra devices you have and try again.\n\nIf that does not work try the backup room.')
    }
  }

  if(stage===0){

    if(nameFieldMade===false){
      nameField = createInput("");
      nameField.changed(enteredName);
      nameField.position(wc-125,line4);
      nameFieldMade=true
    }

    textSize(fontSize1)
    textFont(dharma)
    fill(bBlue)
    text("ABOUT YOU",wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('Whats your name?', wc, line3)
  }

  if(stage===1){
    if(genderFieldMade==false){
      genderField = createInput("");
      genderField.changed(enteredGender);
      genderField.position(wc-125,line4)
      genderFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    noStroke();
    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('What are your preferred pronous?', wc, line3)
  }

  if(stage===2){
    if(ageFieldMade==false){
      ageField = createInput("");
      ageField.changed(enteredAge);
      ageField.position(wc-125,line4)
      ageFieldMade=true
    }

    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textSize(fontSize3)
    textFont(regularFont)
    fill(bWhite)
    text('How old are you?', wc, line3)
  }

  if(stage===3){
    if(likeFieldMade==false){
      likeField = createInput("");
      likeField.changed(enteredLike);
      likeField.position(wc-125,line4)
      likeFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    let questions = ['What is your favourite holiday ?', 'Do you like Cats or Dogs?','What is your favourite show to binge','Whats your favourite meal?','Do you like tea or coffee?']
    if (randomDrawn ==false){
    randomQuestion = random(questions)
    randomDrawn=true
    }
    text(randomQuestion, wc, line3)
  }

  if(stage===4){
    if(colorFieldMade==false){
      colorField = createInput("");
      colorField.changed(enteredColor);
      colorField.position(wc-125,line4)
      colorFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('What does your hair look like?', wc, line3)
  }

  if(stage===5){
    if(musicFieldMade==false){
      musicField = createInput("");
      musicField.changed(enteredMusic);
      musicField.position(wc-125,line4)
      musicFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('What type of music do you listen to?', wc, line3)
  }

  if(stage===6){
    if(celebrityFieldMade==false){
      celebrityField = createInput("");
      celebrityField.changed(enteredCelebrity);
      celebrityField.position(wc-125,line4)
      celebrityFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('Who is your celebrity crush?', wc, line3)
  }

  if(stage===7){
    if(smellFieldMade==false){
      smellField = createInput("");
      smellField.changed(enteredSmell);
      smellField.position(wc-125,line4)
      smellFieldMade=true
    }
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('ABOUT YOU',wc,line1)

    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('Whats your favourite conversation topic?', wc, line3)
  }


  if (stage===8){
    if(peer){
      //If friend has entered age go to next stage
      //console.log(friends)
        if(friends[0].smell!='') {
          stage++
        } else {
          textSize(fontSize2)
          fill(bGreen)
          text('Your date is on their way', wc, line3)
        }
      }
  }

  if (stage>8){
    noFill()
    stroke(bBlue)
    strokeWeight(1)
    ellipse(map(friends[0].x,0,100,0,width), map(friends[0].y,0,100,0,height),ELLIPSE_SIZE,ELLIPSE_SIZE )
    noStroke()
  }

  //FIRST DRAWING
  if(stage==9){
    textSize(fontSize1)
    fill(bBlue)
    textAlign(LEFT, TOP)
    textFont(dharma)
    friendsName = friends[0].name
    upperCaseName = friendsName.toUpperCase();
    text('MEET '+upperCaseName,w1,line0)
    
    textSize(fontSize2)
    fill(bWhite)
    textFont(mediumFont)
    textAlign(LEFT,TOP)
    text(friends[0].name+' ('+friends[0].gender+') is '+friends[0].age+' and has '+friends[0].color+' hair.\nThey like '+friends[0].like+', listen to '+friends[0].music+'\nand have a  crush on '+friends[0].celeb+'.\n\n'+'Click and drag to draw\nwhat you think they look like.\n\nYou have '+timer0+' seconds left.\nMake sure you and your partner\ndraw in the different sections.', w1, line2)

    if (frameCount % 60 == 0 && timer0>0){
          timer0--
        }
        if(timer0==0){
          stage++
        }

    myPressed = mouseIsPressed

    if(myPressed==true){
      myDrawing.push({
        x: percentageMouseX,
        y: percentageMouseY
      })
    }
    
    for(let i=0; i<myDrawing.length; i++){
      fill(bGreen)
      let mappedDrawingX = map(myDrawing[i].x,0,100,0,width)
      let mappedDrawingY = map(myDrawing[i].y,0,100,0,height)
      ellipse(mappedDrawingX, mappedDrawingY, 10,10)
    }
  }


  //SECOND DRAWING

  if(stage==10){
    fill(bWhite)
    textAlign(LEFT,TOP)
    text('This is what '+friends[0].name+' thinks you look like.\nAdd to it for the next '+timer+' seconds.',w1,line1)

    myPressed = mouseIsPressed

    if(myPressed==true){
      myDrawing.push({
        x: percentageMouseX,
        y: percentageMouseY
      })
    }
    for(let i=0; i<myDrawing.length; i++){
      fill(bGreen)
      let mappedDrawingX = map(myDrawing[i].x,0,100,0,width)
      let mappedDrawingY = map(myDrawing[i].y,0,100,0,height)
      ellipse(mappedDrawingX, mappedDrawingY, 10,10)
    }

    for(let i=0; i<friends[0].drawing.length; i++){
      fill(bBlue)
      let friendsMappedDrawingX = map(friends[0].drawing[i].x,0,100,0,width)
      let friendsMappedDrawingY = map(friends[0].drawing[i].y,0,100,0,height)
      ellipse(friendsMappedDrawingX, friendsMappedDrawingY, 10,10)
    }

    if (frameCount % 60 == 0 && timer>0){
      timer--
    }
    if(timer==0){
      stage++
    }

  }

//HIGHLIGHTS

  if(stage==11){
    fill(bWhite)
    textAlign(LEFT, TOP)
    textSize(fontSize3)
    text('Highlight the other things that you like. You have '+timer2+' seconds.',200,150)
    textFont(regularFont)
    textSize(14)

    let interestX1 = width*0.2
    let interestX2 = width*0.27
    let interestX3 = width*0.34
    let interestX4 = width*0.41
    let interestX5 = width*0.48

    let interestY1 = height*0.3
    let interestY2 = height*0.37
    let interestY3 = height*0.44
    let interestY4 = height*0.51
    let interestY5 = height*0.58

    text('Cheese', interestX1,interestY1); text('Animals', interestX2,interestY1); text('Hobbies',interestX3,interestY1); text('Books',interestX4,interestY1); text('Movies',interestX5,interestY1)
    text('Rugs', interestX1,interestY2); text('Cereal',interestX2,interestY2); text('Tea',interestX3, interestY2); text('Nights Out',interestX4,interestY2); text('Marvel',interestX5,interestY2)
    text('Coke',interestX1,interestY3); text('TV',interestX2,interestY3); text('Cities',interestX3,interestY3); text('Beaches',interestX4,interestY3); text('Early Starts',interestX5,interestY3)
    text('Sweet',interestX1,interestY4); text('Savoury',interestX2,interestY4); text('Galleries',interestX3,interestY4); text('Sports',interestX4,interestY4); text('Late Nights', interestX5,interestY4)
    text('Spending',interestX1,interestY5); text('Saving',interestX2,interestY5); text('Hats',interestX3,interestY5); text('Humour',interestX4,interestY5);text('Music',interestX5,interestY5)
  
    myPressed = mouseIsPressed

    if(myPressed==true){
      myHighlights.push({
        x: percentageMouseX,
        y: percentageMouseY
      })
    }
    for(let i=0; i<myHighlights.length; i++){
      fill('rgba(0,235,100,0.05)')
      let mappedHighlightX = map(myHighlights[i].x,0,100,0,width)
      let mappedHighlightY = map(myHighlights[i].y,0,100,0,height)
      ellipse(mappedHighlightX, mappedHighlightY, 20,20)
    }

    if(friends[0].highlights){
      for (var i=0; i<friends[0].highlights.length; i++){
        fill('rgba(14,139,246,0.05)')
        let friendsMappedHighlightsX = map(friends[0].highlights[i].x,0,100,0,width)
        let friendsMappedHighlightsY = map(friends[0].highlights[i].y,0,100,0,height)
        ellipse(friendsMappedHighlightsX, friendsMappedHighlightsY,20,20)
      }
    }

    if (frameCount % 60 == 0 && timer2>0){
      timer2--
    }
    if(timer2==0){
      stage++
    }
  }

  if(stage==12){
    textFont(dharma)
    fill(bBlue)
    textSize(fontSize1)
    textAlign(RIGHT, TOP)
    text('NOW SAY HI', w4,line0)

    if(messageFieldMade==false){
      messageField = createInput("");
      messageField.changed(enteredMessage);
      messageField.position(width-400, line5+5)
      messageFieldMade=true
    }

    friendsMessages.push(friends[0].message)
    if(friendsMessages[friendsMessages.length-1]!=friendsMessages[friendsMessages.length-2]){
      messages.push(friends[0].name+': '+friends[0].message)
    }
    messageString = join(messages, '\n')
    textAlign(LEFT, BOTTOM)
    textSize(fontSize3)
    textFont(regularFont)
    fill(bWhite)
    text(messageString,width-400,line5-5);
    
 
    messagesLeft=numberOfMessages-messages.length
    minutes = Math.round(timer7/60)
    textAlign(RIGHT,TOP)
    fill(bRed)
    textSize(14)
    text(messagesLeft+' messages left\nOr '+minutes+' minutes left.',width-410,line5+10)

    if(messagesLeft==0){
      stage++
      messageField.remove()
    }

    textFont(regularFont)
    textSize(14)
    textAlign(LEFT,TOP)
    fill(bWhite)

    let interestX1 = width*0.2
    let interestX2 = width*0.27
    let interestX3 = width*0.34
    let interestX4 = width*0.41
    let interestX5 = width*0.48

    let interestY1 = height*0.3
    let interestY2 = height*0.37
    let interestY3 = height*0.44
    let interestY4 = height*0.51
    let interestY5 = height*0.58

    text('Cheese', interestX1,interestY1); text('Animals', interestX2,interestY1); text('Hobbies',interestX3,interestY1); text('Books',interestX4,interestY1); text('Movies',interestX5,interestY1)
    text('Rugs', interestX1,interestY2); text('Cereal',interestX2,interestY2); text('Tea',interestX3, interestY2); text('Nights Out',interestX4,interestY2); text('Marvel',interestX5,interestY2)
    text('Coke',interestX1,interestY3); text('TV',interestX2,interestY3); text('Cities',interestX3,interestY3); text('Beaches',interestX4,interestY3); text('Early Starts',interestX5,interestY3)
    text('Sweet',interestX1,interestY4); text('Savoury',interestX2,interestY4); text('Galleries',interestX3,interestY4); text('Sports',interestX4,interestY4); text('Late Nights', interestX5,interestY4)
    text('Spending',interestX1,interestY5); text('Saving',interestX2,interestY5); text('Hats',interestX3,interestY5); text('Humour',interestX4,interestY5);text('Music',interestX5,interestY5)
    
    for(let i=0; i<myHighlights.length; i++){
      fill('rgba(0,235,100,0.05)')
      let mappedHighlightX = map(myHighlights[i].x,0,100,0,width)
      let mappedHighlightY = map(myHighlights[i].y,0,100,0,height)
      ellipse(mappedHighlightX, mappedHighlightY, 20,20)
    }

    if(friends[0].highlights){
      for (var i=0; i<friends[0].highlights.length; i++){
        fill('rgba(14,139,246,0.05)')
        let friendsMappedHighlightsX = map(friends[0].highlights[i].x,0,100,0,width)
        let friendsMappedHighlightsY = map(friends[0].highlights[i].y,0,100,0,height)
        ellipse(friendsMappedHighlightsX, friendsMappedHighlightsY,20,20)
      }
    }

    if (frameCount % 60 == 0 && timer7>0){
      timer7--
    }
    if(timer7==0){
      stage++
      messageField.remove()
    }
  }

  if(stage==13){
    if(instagramFieldMade==false){
      igField = createInput("");
      igField.changed(enteredIG);
      igField.position(wc-125,line4)
      instagramFieldMade=true
    }    
    textSize(fontSize3)
    fill(bWhite)
    text('Whats your instagram handle?\n(Or any other platform if you specify).', wc,line3)
    textSize(fontSize4)
    fill(bBlue)
    text('Will be used for stalking', wc, line5)
  }

  if(stage==14){
    if(friends[0].ig==''){
    textSize(fontSize3)
    fill(bGreen)
    text('Your date is just typing it in', wc,line3)
    }else {
      stage++
    }
  }

  if(stage==15){
    textFont(regularFont)
    textSize(fontSize3)
    fill(bWhite)
    text('Check our their Instagram\n(or other platform) on your phone.', wc, line3)
    textSize(fontSize2)
    fill(bGreen)
    text(friends[0].ig, wc,line4)

    if (frameCount % 60 == 0 && timer3>0){
      timer3--
    }
    if(timer3==0){
      stage++
    }

    textSize(10)
    textFont(mediumFont)
    text('You have '+timer3+' seconds left to scroll', wc, line5)
  }

  if(stage==16){
    textSize(14)
    textFont(mediumFont)
    fill(bWhite)
    textAlign(LEFT,CENTER)
    text("You'll see your date in", wl, line3)
    textFont(dharma)
    textSize(500)
    textAlign(CENTER, CENTER)
    countdown = Math.round(10-timer/100);
    textAlign(CENTER, CENTER)
    fill(bRed)
    textAlign(RIGHT,CENTER)
    text(timer4, wc,line3)
    textFont(mediumFont)
    fill(bWhite)
    textSize(fontSize3)
    text('Get Yourself Ready To Be Seen.', wr, line4)
    image(myVideo,wr-80,line4+20,80,60)
    fill(bRed)
    textSize(14)
    textAlign(CENTER, CENTER)
    text('No audio will be shared.',wc,height*0.1)

    if (frameCount % 60 == 0 && timer4>0){
      timer4--
    }
    if(timer4==0){
      stage++
    }
  }

  if(stage==17){

    textSize(fontSize3)
    fill(bWhite)
    textAlign(LEFT, TOP)
    text('Now decorate the cupcake for your partner.\nDo not show them what it looks like.\nYou will give it to them after the meal.',w1,line1)
    
    fill(bRed)
    textAlign(CENTER, CENTER)
    textSize(14)
    text('No audio is being shared.',wc,height*0.1)

    image(myVideo, wc-width*0.3,line2,width*0.3,width*0.3*0.75)
    image(friends[0].stream, wc,line2,width*0.3,width*0.3*0.75)

    textSize(fontSize3)
    fill(bWhite)
    textAlign(CENTER, CENTER)
    text(timer5+' seconds left', wc,line5)

    if (frameCount % 60 == 0 && timer5>0){
      timer5--
    }
    if(timer5==0){
      stage++
    }
  }

  if(stage==18){
    textSize(fontSize1)
    fill(bBlue)
    textFont(dharma)
    text('YOU CAN NOW MEET!',wc,line1)

    textSize(fontSize3)
    fill(bWhite)
    textFont(regularFont)
    textAlign(CENTER, CENTER)
    text('Let the facilitators know you are finished.\nYou are about to meet '+friends[0].name+' in person.\n\n'+friends[0].name+' also told us they like talking about '+friends[0].smell+',\ngive that a go - and have fun x',wc,line3)
    textSize(fontSize4)
    text('Please leave this tab open',wc,line5)
    // console.log(friends[0])
    // console.log(myName+'\n'+myAge+'\n'+myLike+'\n'+myColor+'\n'+myMusic+'\n'+myCelebrity+'\n'+mySmell)
    // console.log(messageString)
  }
}

function gotStream(stream, id) {
  friends.push(new Friend(stream, id))

  if(stage!=17){
  stream.elt.muted=true;} else {stream.elt.muted=false}

}



function enteredName() {
  myName = nameField.value();
  nameField.remove()
  stage++
}

function enteredGender() {
  myGender = genderField.value();
  genderField.remove();
  stage++
}

function enteredAge() {
  myAge = ageField.value();
  ageField.remove();
  stage++
}

function enteredLike() {
  myLike = likeField.value();
  likeField.remove();
  stage++
}

function enteredColor() {
  myColor = colorField.value();
  colorField.remove();
  stage++
}

function enteredMusic() {
  myMusic = musicField.value();
  musicField.remove();
  stage++
}

function enteredCelebrity() {
  myCelebrity = celebrityField.value();
  celebrityField.remove();
  stage++
}

function enteredSmell() {
  mySmell = smellField.value();
  smellField.remove();
  stage++
}

function enteredInterest(){
  myInterests.push({
    interest: interestField.value(),
    x: mouseX,
    y: mouseY
  })
  interestField.value('')
}

function enteredIG() {
  myIG = igField.value();
  igField.remove();
  stage++
}


function enteredMessage() {
  myMessage = messageField.value();
  messageField.value('');
  messages.push('You: '+myMessage)
}

function gotData(data) {
  let parsedData = JSON.parse(data);
  let ourFriendsid = parsedData.id;
  let ourFriendsName = parsedData.friendsName
  let ourFriendsPositionX = parsedData.x;
  let ourFriendsPositionY = parsedData.y;
  let ourFriendsMessage = parsedData.friendsMessage;
  let ourFriendsGender = parsedData.gender;
  let ourFriendsAge = parsedData.age;
  let ourFriendsInterests = parsedData.interests;
  let ourFriendsPressed = parsedData.pressed;
  let ourFriendsInstagram = parsedData.ig;
  let ourFreindsDrawing = parsedData.drawing
  let ourFriendsHighlights = parsedData.highlights
  
  for (let i = 0; i < friends.length; i++){
    if (friends[i].id === ourFriendsid){
      friends[i].x = ourFriendsPositionX;
      friends[i].y = ourFriendsPositionY;
      friends[i].name = ourFriendsName;
      friends[i].message = ourFriendsMessage;
      friends[i].gender = ourFriendsGender;
      friends[i].age = ourFriendsAge;
      friends[i].interests = ourFriendsInterests;
      friends[i].pressed = ourFriendsPressed;
      friends[i].ig = ourFriendsInstagram;
      friends[i].like = parsedData.like;
      friends[i].color = parsedData.color;
      friends[i].music = parsedData.music;
      friends[i].celeb = parsedData.celeb;
      friends[i].smell = parsedData.smell;
      friends[i].drawing = ourFreindsDrawing;
      friends[i].highlights = ourFriendsHighlights
    //   if(stage>1){
    //   friends[i].stream.panner.setPosition(ourFriendsPositionX,ourFriendsPositionY,0);
    // } else {friends[i].stream.panner.setPosition(1000,1000,1000)}
   }
  }
}

function sendData() {

  // myID =  peer.socket.id
  let dataToSend = {
    // id: myID,
    friendsName: myName,
    friendsMessage: myMessage,
    x: percentageMouseX,
    y: percentageMouseY,
    gender: myGender,
    age: myAge,
    like: myLike,
    color: myColor,
    music: myMusic,
    celeb: myCelebrity,
    smell: mySmell,
    interests: myInterests,
    pressed: myPressed,
    ig: myIG,
    drawing: myDrawing,
    highlights: myHighlights
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
    this.age = 0,
    this.ig = ''
    this.drawing = []
    this.highlights = []
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}