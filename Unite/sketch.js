let timer = 300;
let timerInMinutes;
let timerRun=false;
let timerHeader = false;

let errorWait = false;
let errorWaitTime = 0;

let sameAnswers = [];
let differentAnswers = [];

let closnessResult = '0';
let bitternessResult = '0';
let agressionResult = '0';

let size = 10;
let minSize = 200;
let maxSize = 240;
let sizeSpeed = 0.025;

let frontStreamCreated = false;
let streamFieldMade = false;
let nameFieldMade = false;
let test1Calculated = false
let test2AnswerA = false;
let test2AnswerB = false;
let test2AnswerC = false;
let test2AnswerD = false;

let bRed = '#ff4f45'  //RED
let bBlue = '#0e8bf6'  //Blue    
let bGreen = '#00eb64'  //
let bWhite = '#ececec'
let bPink = '#e89cbd'
let bBlack = '#1b1b1b'
let bYellow = '#00eb64'

let options = {
    story: {
        celebName: ['Mary Berry','Jack Black','Your Mum','Hannah Montanna','Katie Price','Holly Willoughby','Your old canteen lady','Your childhood bully','My cats cousin'],
        verb:['release a chocolate bomb','fire an asteroid,release a flood','broadcast a monologue','let a huge fart rip','trigger a global panny-d','publish a dramatic zine','have a lockdown party','let Prince Andrew be king'],
        adjective: ['destroy','decimate','flatten','bore','depress','attack','brainwash','disconcert','eradicate'],
        place: ['the earth','Milton Keynes','the houses with a SW15 postcode',"Pizza Express' restaurants",'the hopes and dreams you foster','the solar system','the posts you saved on Instagram'],
    },
    etchRole: ['X','Y'],
    testQuestion: [
        [{
            q:'Whos your sidekick?',
            p1: 'The Queen',
            p2: 'Daniel Craig',
            p3: 'Taylor Swift'
        }],
        [{
            q:'What object best represents your friendship?',
            p1: 'Tea Towels',
            p2: 'Top Hats',
            p3: 'The Patriarchy'
        }],
        [{
            q:'Whats the best type of lighting?',
            p1: 'Florecent',
            p2: 'Fairy Lights',
            p3: 'Candles'
        }],
        [{
            q:'Whats the best way to eat potato?',
            p1: 'Chips',
            p2: 'Bakes',
            p3: 'Waffle'
        }],
        [{
            q:'If you two were to be a colour, what would you be?',
            p1: 'Blood Red',
            p2: 'Pink',
            p3: 'Egg Yolk Yellow'
        }],
        [{
            q:'Which is the best location?',
            p1: 'Big Ben',
            p2: 'Anywhere with\nyour partner',
            p3: 'A Mental One'
        }],
        [{
            q:'Which is the best joke?',
            p1: 'Your face',
            p2: "'Whiteboards\nare remarkable'",
            p3: 'This goverment'
        }],
    ],
    compQuestion: ['The best worst thing about my partner is...', 'The random thing I love about them is...', 'I will always go to them for help with...','I love the way they...','They taught me how to...','They are the only person I know who can...','Their best story is about them...','They are an expert at','Their best feature is...','No one can beat them at...'],
    streamWord1: ['good','high','full','sure','real','open','free','easy','poor','nice','wide','dark','cold','past','huge','rich','safe','warm','soft','tiny','busy','slow','tall','weak','pure','cool','neat','bold','calm','grim','rude','sour','gold','arty','edgy','nosy','solo','cozy','firy','auto','silk','lime','long','open','good','true','nice','wild','kind','deep','cool','dull'],
    streamWord2: ['area','baby','bank','base','case','book','call','city','club','deal','door','cost','duty','file','fire','food','fund','game','hair','hall','hand','home','city','food','team','game','hair','plan','term','wall','park','page','shop','task','sale','post','ball','race','text','wind','skin','tree','rock','star','rain','goal','pair','card','code','iron','pool','tone'],
}


let config = {
    streamName: '',
    story: {
        celebName: '',
        verb:'',
        adjective: '',
        place: '',
    },
    etchRole: '',
    testQuestion1: [],
    testQuestion2: [],
    testQuestion3: [],
    testQuestion4: [],
    testQuestion5: [],
    testQuestion6: [],
    compQuestion1: '',
    compQuestion2: '',
    compQuestion3: '',
    compQuestion4: '',
}

let myData = {
    role:'',
    room: '',
    name: '',
    stage: 'title',
    testAnswer: {
        ans1:'',
        ans2:'',
        ans3:'',
        ans4:'',
        ans5:'',
        ans6:'',
    },
    compAnswer: {
        ans1:'',
        ans2:'',
        ans3:'',
        ans4:'',
    },
    x:0,
    y:0,
    mousePressed:false,
}

let partner = []
partnerPresent=false

let touchEnd = false
let touchStart = false


function preload() {
    monument = loadFont('Monument.otf')
    dharma = loadFont('dharma.ttf')
    cooper = loadFont('Cooper.ttf')
    diatype = loadFont('Diatype.otf')
    next = loadImage('button.png')
    selected = loadImage('selected.png')
}

let ellipse1X, ellipse1Y, ellipse1Size
let ellipse2X, ellipse2Y, ellipse2Size


function setup() {
    if(window.innerWidth>1000){
      var cnv = createCanvas(windowHeight*9/16,windowHeight)
    } else {
      var cnv = createCanvas(windowWidth, windowHeight);
    }
    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height) / 2;
    // cnv.position(x, y);
    // console.log(x,y)

    backStream = new p5LiveMedia(this, "DATA", null, "w83C-S6DU");
    backStream.on('data', gotBackData);
    backStream.on('disconnect',gotDisconnect);
    setInterval(backDataSend,100)

    w = width
    h = height
    fontSize0 = w/4
    fontSize1 = w/10
    fontSize2 = w/15
    fontSize3 = w/20
    fontSize4 = w/25

    xLine1 = w*0.1
    xLine2 = w*0.2
    xLine3 = w*0.3
    xLine4 = w*0.4
    xLine5 = w*0.5
    xLine6 = w*0.6
    xLine7 = w*0.7
    xLine8 = w*0.8
    xLine9 = w*0.9
    xLine10 = w

    yLine1 = h*0.1
    yLine2 = h*0.2
    yLine3 = h*0.3
    yLine4 = h*0.4
    yLine5 = h*0.5
    yLine6 = h*0.6
    yLine7 = h*0.7
    yLine8 = h*0.8
    yLine9 = h*0.9
    yLine10 = h

    ellipse1X = 0
    ellipse1Y = 0
    ellipse2X = width
    ellipse2Y = height
    ellipse1Size = random(400,1000)
    ellipse2Size = random(400,1000)
}


function draw() {
    background(bBlack);
  

    if(myData.stage=='title'){
        ellipse1X = ellipse1X + 0.5
        ellipse1Y = ellipse1Y + 1
        ellipse2X = ellipse2X - 0.5
        ellipse2Y = ellipse2Y - 1
        stroke(bBlue)
        strokeWeight(2)
        noFill()
        ellipse(ellipse1X, ellipse1Y, ellipse1Size)
        stroke(bRed)
        strokeWeight(2)
        ellipse(ellipse2X, ellipse2Y, ellipse2Size)
        noStroke()
        fill(bWhite)
        textSize(fontSize0)
        textAlign(CENTER,CENTER)
        textLeading(fontSize0)
        textFont(dharma)
        textAlign(CENTER,CENTER)
        text('UNITE',xLine5,yLine3)
        textFont(diatype)
        textSize(fontSize4)
        fill(bGreen)
        text('Step up to a Challenge',xLine5,yLine5)
        let firstButton = circleButton('CONNECT',dharma,bBlack,fontSize1,bGreen,xLine5,yLine8)
        if (firstButton==true){
            myData.stage='landing'
        }
        
    }

    
    if(myData.stage=='landing'){
        let creatorButton = circleButton('Start a pair', diatype, bBlack,fontSize3,bRed,xLine3,yLine3)
        if (creatorButton==true){
            myData.role='creator'
            config.story.celebName = random(options.story.celebName)
            config.story.verb = random(options.story.verb)
            config.story.adjective = random(options.story.adjective)
            config.story.place = random(options.story.place) 
            config.etchRole = random(options.etchRole)
            questionArray = options.testQuestion
            shuffleArr(options.testQuestion)
            config.testQuestion1 = options.testQuestion[0][0]
            config.testQuestion2 = options.testQuestion[1][0]
            config.testQuestion3 = options.testQuestion[2][0]
            config.testQuestion4 = options.testQuestion[3][0]
            config.testQuestion5 = options.testQuestion[4][0]
            config.testQuestion6 = options.testQuestion[5][0]
            shuffleArr(options.compQuestion)
            config.compQuestion1 = options.compQuestion[0]
            config.compQuestion2 = options.compQuestion[1]
            config.compQuestion3 = options.compQuestion[2]
            config.compQuestion4 = options.compQuestion[3]
            config.streamName = ((JSON.stringify(random(options.streamWord1)+'_'+random(options.streamWord2))).substring(1)).slice(0,-1)
            myData.room=config.streamName
            myData.stage='roomOptions'
        }

        let joinerButton = circleButton('Join a pair', diatype, bBlack,fontSize3,bBlue,xLine6,yLine7)
        if (joinerButton==true){
            myData.role = 'joiner'
            myData.stage='roomOptions'
        }
    } 

    if(myData.stage=='roomOptions'){
        if(myData.role=='joiner'){
            h2('Enter the code from your partners device.',bWhite,xLine5,yLine4)
            if(streamFieldMade==false){
                streamField = createInput("");
                streamField.changed(enteredRoom)
                streamField.position(0, yLine5)
                streamFieldMade=true
            }         
            if(partnerPresent){
                myData.stage='enterName'
            }
        }
        if(myData.role=='creator'){
            h2('Get your partner to join with the following code.',bWhite,xLine5,yLine2)
            circleText(config.streamName,diatype,bBlue,fontSize2,bBlack, xLine5, yLine5)
            if(partnerPresent){
                myData.stage='enterName'
            }
        }
    }


    //-------------------------------*******------------------------
    //If parter has same room name
    if(friends.length>0){
        for (var i=0; i<friends.length; i++){
            if(myData.room !== '' && friends[i].data.room !==''){
                if(myData.room == friends[i].data.room){
                    partner = friends[i]
                    partnerPresent=true
                }
            }
        }
    }

    if(myData.stage=='enterName'){
        h2('Enter your name below',bWhite,xLine5,yLine4)
        if(nameFieldMade==false){
            nameField = createInput("");
            nameField.changed(enteredName);
            nameField.position(0, yLine5)
            nameFieldMade=true
        }
        if(myData.role=='joiner'){
            config=partner.config
        }
        if(myData.name!=''){
            if(partner.data.name!=''){
                myData.stage='intro'
            } else {
                waiting()
            }
        }
    }

    //STORY INTRO

    if(myData.stage=='intro'){
        h2('Hi '+myData.name+' and '+partner.data.name+'.',bWhite,xLine5,yLine2)
        rectMode(CORNER)
        textSize(fontSize4)
        textAlign(LEFT, TOP)
        fill(bWhite)
        text("I'm sure you know why you here.\nBut just to recap.\n\n"+config.story.celebName+' has said that they will '+config.story.verb+' that will '+config.story.adjective+' all of '+config.story.place+' in just 5 minutes.\n\nBut they have said if you and '+partner.data.name+' can pass these tests you can save '+config.story.place+'.', xLine1, yLine3,xLine8,yLine8)
        startButton = circleButton("LETS GO!",dharma,bBlack,fontSize1,bBlue,xLine7,yLine8)
        if(startButton==true){
            myData.stage='timer'
        }
    }

    //TIMER START

    var minutes = Math.floor(timer / 60);
    var seconds = timer - minutes * 60;
    timerInMinutes = minutes+':'+seconds

    if(myData.stage=='timer'){
        noStroke();
        circleText(timerInMinutes,dharma,bBlack,fontSize0,bRed,xLine5,yLine4-100,200)
        h2('Be quick and be close.',bWhite,xLine5,yLine7)
        if(partner.data.stage=='timer'){
            timerRun=true
        }
        // timerButton = circleButton('>',diatype,bWhite,fontSize3,bBlue,xLine7,yLine9)
        // if(partner.data.stage=='timer'||partner.data.stage=='test1'||partner.data.stage=='test1A'){
        //     if (timerButton==true){
        //         myData.stage='test1'
        //     }
        // }
        timerButton = nextButton(xLine5,yLine9)
        if(timerButton==true){
            myData.stage='test1'
        }

    }
    //TEST 1 INTRO

    if(myData.stage=='test1'){
        timerHeader=true
        circleText('TWINNING',dharma,bBlue,fontSize0,bBlack,xLine5,yLine4,xLine5)
        circleText('TEST 1',dharma,bGreen,fontSize2,bBlack,xLine2,yLine2)
        para('Without talking answer these questions.\n\nYou are trying to pick the same answer as your partner.\n\n'+config.story.celebName+' will then use it to judge how close you are.',xLine1,yLine6)
        test1AButton =  nextButton(xLine5,yLine9)
        if(test1AButton==true){
            myData.stage='test1A'
        }
    }

    if(myData.stage=='test1A'){
        h2(config.testQuestion1.q,bWhite,xLine5,yLine2)
        test1AButton1 = circleButton(config.testQuestion1.p1,diatype,bBlack,fontSize3,bRed,xLine2,yLine4)
        if (test1AButton1==true){
            myData.testAnswer.ans1=config.testQuestion1.p1
            myData.stage='test1B'
        }
        test1AButton2 = circleButton(config.testQuestion1.p2,diatype,bBlack,fontSize3,bGreen,xLine7,yLine6)
        if (test1AButton2==true){
            myData.testAnswer.ans1=config.testQuestion1.p2
            myData.stage='test1B'
        }
        test1AButton3 = circleButton(config.testQuestion1.p3,diatype,bBlack,fontSize3,bBlue,xLine4,yLine8)
        if (test1AButton3==true){
            myData.testAnswer.ans1=config.testQuestion1.p3
            myData.stage='test1B'
        }
    }

    if(myData.stage=='test1B'){
        h2(config.testQuestion2.q,bWhite,xLine5,yLine2)
        test1BButton1 = circleButton(config.testQuestion2.p1,diatype,bBlack,fontSize3,bBlue,xLine2,yLine4)
        if (test1BButton1==true){
            myData.testAnswer.ans2=config.testQuestion2.p1
            myData.stage='test1C'
        }
        test1BButton2 = circleButton(config.testQuestion2.p2,diatype,bBlack,fontSize3,bRed,xLine7,yLine6)
        if (test1BButton2==true){
            myData.testAnswer.ans2=config.testQuestion2.p2
            myData.stage='test1C'
        }
        test1BButton3 = circleButton(config.testQuestion2.p3,diatype,bBlack,fontSize3,bGreen,xLine4,yLine8)
        if (test1BButton3==true){
            myData.testAnswer.ans2=config.testQuestion2.p3
            myData.stage='test1C'
        }
    }

    if(myData.stage=='test1C'){
        h2(config.testQuestion3.q,bWhite,xLine5,yLine2)
        test1CButton1 = circleButton(config.testQuestion3.p1,diatype,bBlack,fontSize3,bGreen,xLine2,yLine4)
        if (test1CButton1==true){
            myData.testAnswer.ans3=config.testQuestion3.p1
            myData.stage='test1D'
        }
        test1CButton2 = circleButton(config.testQuestion3.p2,diatype,bBlack,fontSize3,bBlue,xLine7,yLine6)
        if (test1CButton2==true){
            myData.testAnswer.ans3=config.testQuestion3.p2
            myData.stage='test1D'
        }
        test1CButton3 = circleButton(config.testQuestion3.p3,diatype,bBlack,fontSize3,bRed,xLine4,yLine8)
        if (test1CButton3==true){
            myData.testAnswer.ans3=config.testQuestion3.p3
            myData.stage='test1D'
        }
    }

    if(myData.stage=='test1D'){
        h2(config.testQuestion4.q,bWhite,xLine5,yLine2)
        test1DButton1 = circleButton(config.testQuestion4.p1,diatype,bBlack,fontSize3,bRed,xLine2,yLine4)
        if (test1DButton1==true){
            myData.testAnswer.ans4=config.testQuestion4.p1
            myData.stage='test1E'
        }
        test1DButton2 = circleButton(config.testQuestion4.p2,diatype,bBlack,fontSize3,bGreen,xLine7,yLine6)
        if (test1DButton2==true){
            myData.testAnswer.ans4=config.testQuestion4.p2
            myData.stage='test1E'
        }
        test1DButton3 = circleButton(config.testQuestion4.p3,diatype,bBlack,fontSize3,bBlue,xLine4,yLine8)
        if (test1DButton3==true){
            myData.testAnswer.ans4=config.testQuestion4.p3
            myData.stage='test1E'
        }
    }

    if(myData.stage=='test1E'){
        h2(config.testQuestion5.q,bWhite,xLine5,yLine2)
        test1EButton1 = circleButton(config.testQuestion5.p1,diatype,bBlack,fontSize3,bGreen,xLine2,yLine4)
        if (test1EButton1==true){
            myData.testAnswer.ans5=config.testQuestion5.p1
            myData.stage='test1F'
        }
        test1EButton2 = circleButton(config.testQuestion5.p2,diatype,bBlack,fontSize3,bBlue,xLine7,yLine6)
        if (test1EButton2==true){
            myData.testAnswer.ans5=config.testQuestion5.p2
            myData.stage='test1F'
        }
        test1EButton3 = circleButton(config.testQuestion5.p3,diatype,bBlack,fontSize3,bRed,xLine4,yLine8)
        if (test1EButton3==true){
            myData.testAnswer.ans5=config.testQuestion5.p3
            myData.stage='test1F'
        }
    }

    if(myData.stage=='test1F'){
        h2(config.testQuestion6.q,bWhite,xLine5,yLine2)
        test1FButton1 = circleButton(config.testQuestion6.p1,diatype,bBlack,fontSize3,bRed,xLine2,yLine4)
        if (test1FButton1==true){
            myData.testAnswer.ans6=config.testQuestion6.p1
            myData.stage='test1Results'
        }
        test1FButton2 = circleButton(config.testQuestion6.p2,diatype,bBlack,fontSize3,bBlue,xLine7,yLine6)
        if (test1FButton2==true){
            myData.testAnswer.ans6=config.testQuestion6.p2
            myData.stage='test1Results'
        }
        test1FButton3 = circleButton(config.testQuestion6.p3,diatype,bBlack,fontSize3,bGreen,xLine4,yLine8)
        if (test1FButton3==true){
            myData.testAnswer.ans6=config.testQuestion6.p3
            myData.stage='test1Results'
        }
    }

    //TEST 1 RESULTS
    if(myData.stage=='test1Results'){
        if(partner.data.testAnswer.ans6!=''){
            if(test1Calculated==false){
                if(partner.data.testAnswer.ans1==myData.testAnswer.ans1){
                    sameAnswers.push(partner.data.testAnswer.ans1)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans1)
                }
                if(partner.data.testAnswer.ans2==myData.testAnswer.ans2){
                    sameAnswers.push(partner.data.testAnswer.ans2)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans2)
                }
                if(partner.data.testAnswer.ans3==myData.testAnswer.ans3){
                    sameAnswers.push(partner.data.testAnswer.ans3)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans3)
                }
                if(partner.data.testAnswer.ans4==myData.testAnswer.ans4){
                    sameAnswers.push(partner.data.testAnswer.ans4)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans4)
                }
                if(partner.data.testAnswer.ans5==myData.testAnswer.ans5){
                    sameAnswers.push(partner.data.testAnswer.ans5)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans5)
                }
                if(partner.data.testAnswer.ans6==myData.testAnswer.ans6){
                    sameAnswers.push(partner.data.testAnswer.ans6)
                } else {
                    differentAnswers.push(partner.data.testAnswer.ans6)
                }
            percentSimilar=Math.round(sameAnswers.length/6*100)
            test1Calculated=true
            }
            if(sameAnswers.length>2){
                circleText('NICE',diatype,bGreen,fontSize3,bBlack,xLine3,yLine2,xLine1)
                circleText(percentSimilar+'%',dharma,bBlue,fontSize0,bBlack,xLine5,yLine3,200)
                para('Fair. Your about '+percentSimilar+'% similar. Its a close shave but you are similar enough to keep going.\n\nYou both love '+sameAnswers[0]+', '+sameAnswers[1]+' and '+sameAnswers[2],xLine1,yLine5)
                startTest2 = circleButton('NEXT TEST',dharma,bBlack,fontSize1,bGreen,xLine5,yLine9)

                if (startTest2==true){
                    myData.stage='test2'
                }
            } else {
                circleText('NOPE',monument,bWhite,fontSize3,bBlue,xLine3,yLine2)
                circleText(percentSimilar+'%',diatype,bWhite,fontSize1,bRed,xLine5,yLine4)
                para('Sorry '+config.story.celebName+' says your not close enough.\nYou disagree on '+differentAnswers[0]+', '+differentAnswers[1]+', and '+differentAnswers[2]+'.'+xLine1,yLine7)
                let restartTest = circleButton('Try again',monument,bWhite,fontSize3,bRed,xLine5,yLine7)
                if(restartTest==true){
                    window.location.reload(true)
                }
            }
        } else {
            waiting()
        }
    }
    

    
    if(myData.stage=='test2'){
        circleText('TEST 2',diatype,bBlue,fontSize2,bBlack,xLine2,yLine2)
        circleText('FISHING',dharma,bGreen,fontSize0,bBlack,xLine5,yLine4,200)
        para('Again without talking answer these questions about your partner.\n\n'+config.story.celebName+' will then judge how kind you are to each other.',xLine1,yLine6)
        test2Button = nextButton(xLine5,yLine9)
        if(test2Button==true){
            myData.stage='test2A'
        }
    }

    if(myData.stage=='test2A'){
        if(myData.role=='joiner'){
            config=partner.config
        }
        h2(config.compQuestion1,bWhite,xLine5,yLine2)
        if(test2AnswerA==false){
            test2AnswerAField = createInput("");
            test2AnswerAField.changed(test2AAnswered);
            test2AnswerAField.position(0, yLine4)
            test2AnswerA=true
        }  
        if(partner.data.compAnswer.ans1==''){
            if(myData.compAnswer.ans1!=''){
                para('Wait for your partner',xLine1, yLine3,bBlue)
            }
            //para('Your partner is typing',xLine1,yLine4)
        } else {
            if(myData.compAnswer.ans1==''){
                para('Answer to unlock',xLine1,yLine3,bYellow)
            } else {
                para(partner.data.compAnswer.ans1,xLine1,yLine3,bYellow)
                paraLeft(myData.compAnswer.ans1,xLine5,yLine4,bGreen)
                test2AButton = nextButton(xLine5,yLine9)
                if(test2AButton==true){
                    myData.stage='test2B'
                }            
            }
        }
    }


    if(myData.stage=='test2B'){
        h2(config.compQuestion2,bWhite,xLine5,yLine2)
        if(test2AnswerB==false){
            test2AnswerBField = createInput("");
            test2AnswerBField.changed(test2BAnswered);
            test2AnswerBField.position(0, yLine4)
            test2AnswerB=true
        }  
        if(partner.data.compAnswer.ans2==''){
            if(myData.compAnswer.ans2!=''){
                para('Wait for your partner',xLine1, yLine3,bBlue)
            }
        } else {
            if(myData.compAnswer.ans2==''){
                para('Answer to unlock',xLine1,yLine3,bYellow)
            } else {
                para(partner.data.compAnswer.ans2,xLine1,yLine3,bYellow)
                paraLeft(myData.compAnswer.ans2,xLine5,yLine4,bGreen)
                test2BButton = nextButton(xLine5,yLine9)
                if(test2BButton==true){
                    myData.stage='test2C'
                }            
            }
        }
    }

    if(myData.stage=='test2C'){
        h2(config.compQuestion3,bWhite,xLine5,yLine2)
        if(test2AnswerC==false){
            test2AnswerCField = createInput("");
            test2AnswerCField.changed(test2CAnswered);
            test2AnswerCField.position(0, yLine4)
            test2AnswerC=true
        }  
        if(partner.data.compAnswer.ans3==''){
            if(myData.compAnswer.ans3!=''){
                para('Wait for your partner',xLine1, yLine3,bBlue)
            }
        } else {
            if(myData.compAnswer.ans3==''){
                para('Answer to unlock',xLine1,yLine3,bYellow)
            } else {
                para(partner.data.compAnswer.ans3,xLine1,yLine3,bYellow)
                paraLeft(myData.compAnswer.ans3,xLine5,yLine4,bGreen)
                test2CButton = nextButton(xLine5,yLine9)
                if(test2CButton==true){
                    myData.stage='test2D'
                }            
            }
        }
    }
    
    if(myData.stage=='test2D'){
        h2(config.compQuestion4,bWhite,xLine5,yLine2)
        if(test2AnswerD==false){
            test2AnswerDField = createInput("");
            test2AnswerDField.changed(test2DAnswered);
            test2AnswerDField.position(0, yLine4)
            test2AnswerD=true
        }  
        if(partner.data.compAnswer.ans4==''){
            if(myData.compAnswer.ans4!=''){
                para('Wait for your partner',xLine1, yLine3,bBlue)
            }
        } else {
            if(myData.compAnswer.ans4==''){
                para('Answer to unlock',xLine1,yLine3,bYellow)
            } else {
                para(partner.data.compAnswer.ans4,xLine1,yLine3,bYellow)
                paraLeft(myData.compAnswer.ans4,xLine5,yLine4,bGreen)
                test2DButton = nextButton(xLine5,yLine9)
                if(test2DButton==true){
                    myData.stage='test2Results'
                }            
            }
        }
    }

    if(myData.stage=='test2Results'){
        circleText('CUTE',dharma,bGreen,fontSize0,bBlack,xLine5,yLine3,200)
        para(config.story.celebName+' analysed your messages and thinks you were nice enough to pass the test.',xLine1, yLine5)
        let test2ResultsButton = nextButton(xLine5,yLine9)
        if(test2ResultsButton==true){
            myData.stage='savedWorld'
        }
    }

    if(myData.stage=='savedWorld'){
        timerHeader=false
        timerRun=false
        background(bGreen)
        h2('CONGRATULATIONS!\n\nYou have saved '+config.story.place+' from being destroyed.',bBlack,xLine5,yLine2)
        circleText(timerInMinutes,dharma,bGreen,fontSize1,bWhite,xLine5,yLine5,200)
        let savedWorld = nextButton(xLine5,yLine9)
        if(savedWorld==true){
            myData.stage='overallResults'
        }
    }

    if(myData.stage=='overallResults'){
        h2('We have been analysing your interactions and this is what we think you relationship is like.',bWhite,xLine5, yLine1)
        if(sameAnswers.length>differentAnswers.length || sameAnswers.length==differentAnswers.length){
        circleText('LOVE',dharma,bRed,fontSize0*2/3,bBlack,xLine3,yLine4,200)
        circleText('SUPRISE',dharma,bGreen,fontSize2,bBlack,xLine7,yLine5)
        } else {
            circleText('SUPRISE',dharma,bGreen,fontSize0*2/3,bBlack,xLine3,yLine4,200)
            circleText('LOVE',dharma,bRed,fontSize2,bBlack,xLine7,yLine5)
        }
        circleText('DISTANCE',dharma,bBlue,fontSize3,bBlack,xLine5,yLine6)
        let recipeButton = nextButton(xLine5,yLine9)
        if(recipeButton==true){
            myData.stage='recipe'
        }
    }

    if(myData.stage=='recipe'){
        para('Represent this in making a unique dish together.\n\nThese are the ingredients that best represent your connection.',xLine1,yLine1)
        if(sameAnswers.length>differentAnswers.length || sameAnswers.length==differentAnswers.length){
            h2('Custard Filling:\nSweet\n\nTopping:\nBitter\n\nSauce:\nSour',bYellow, xLine5,yLine5)
            } else {
            h2('Custard Filling:\nBitter\n\nTopping:\nSweet\n\nSauce:\nSour', bYellow, xLine5,yLine5)
        }
    }

    if(timer==0){
        background(bRed)
        h2('NOOOOOO\nYou have let '+config.story.place+' be '+config.story.adjective+' by '+config.story.celebName+'.',bWhite,xLine5,yLine2)
        circleText(timerInMinutes,monument,bGreen,fontSize1,bWhite,xLine5,yLine5,200)
        let startAgainButton = circleButton('Try Again',monument,bRed,fontSize3,bBlack,xLine5,yLine8)
        if(startAgainButton==true){
            window.location.reload(true)
        }
    }

    if(timerHeader){
        fill(bWhite)
        rectMode(CORNER)
        noStroke()
        fill(bRed)
        timerMapped = map(timer,300,0,0,xLine8)
        rect(xLine1,h*0.03,timerMapped,h*0.05,10)
        stroke(bRed)
        noFill()
        rect(xLine1,h*0.03,xLine8,h*0.05,10)
        noStroke()
        textSize(fontSize3)
        textFont(diatype)
        textAlign(LEFT, TOP)
        fill(bRed)
        if(timer<60){
            fill(bWhite)
        }
        text(timerInMinutes,xLine8-20,h*0.045)
    }

    if(timerRun){
        if (frameCount % 60 == 0 && timer>0){
            timer--
          }
    }
    
    if(errorWait==true){
        errorWaitTime++
    }
    touchEnd=false
    touchStart=false
}

function errorPage(){
    fill(bRed)
    ellipse(width/2, height/2, xLine8,xLine8);
    fill(bWhite)
    text('Sorry there was an error', xLine5,yLine5)
    let reloadButton = circleButton('Try Again',monument,bRed,fontSize3,bBlack,xLine5,yLine9)
        if(reloadButton==true){
            window.location.reload(true)
        }
}

function waiting(){
    background(bBlack)
    rectMode(CENTER)
    textAlign(CENTER,CENTER)
    textSize(fontSize3)
    textFont(diatype)
    twidth = textWidth('Waiting for your partner')
    size = map(sin(frameCount * sizeSpeed),-1.0,1.0,twidth+70,twidth+150);
    fill(bBlack)
    stroke(bGreen)
    strokeWeight(1)
    ellipse(width/2, height/2, size,size);
    noStroke()
    fill(bGreen)
    text('Waiting for your partner', xLine5,yLine5)
}

function para(t,x,y,f = 'bWhite'){
    rectMode(CORNER)
    textAlign(LEFT, TOP)
    fill(f)
    text
    textFont(diatype)
    textSize(fontSize4)
    text(t,x,y,(w-x*2),h)
}

function paraLeft(t,x,y,f = 'bWhite'){
    rectMode(CORNER)
    textAlign(RIGHT, TOP)
    fill(f)
    textFont(diatype)
    textSize(fontSize4)
    text(t,x,y,(w-x-xLine1),h)
}


function h2(t, c, x, y){
    fill(c)
    textFont(diatype)
    rectMode(CENTER)
    textAlign(CENTER,CENTER)
    textSize(fontSize3)
    text(t,x,y,xLine7,h)
}


function circleText(t, tFont, tColor, tSize, fillColor, x, y, p=80) {
   xCoord = x
    yCoord = y
    fill(fillColor)
    textFont(tFont)
    textSize(tSize)
    twidth = textWidth(t)
    r = twidth/2
    stroke(tColor)
    strokeWeight(2)
    ellipse(x, y, twidth+p,twidth+p)
    noStroke()
    fill(tColor)
    textAlign(CENTER, CENTER)
    text(t, x, y)
}

buttonTimer=0

function circleButton(t, tFont, tColor, tSize, fillColor, x, y, p=100) {
    xCoord = x
    yCoord = y
    fill(fillColor)
    textSize(tSize)
    textFont(tFont)
    stroke(tColor)
    strokeWeight(2)
    twidth = textWidth(t)
    r = twidth/2
    ellipse(x, y, twidth+p,twidth+p)
    
    if(mouseX<x+twidth && mouseX>x-twidth&&mouseY<y+twidth&&mouseY>y-twidth){
        ellipse(x, y, twidth+p+10,twidth+p+10)
    }
    if(touchStart==true){
        ellipse(x, y, twidth+p+10,twidth+p+10)
    }
    noStroke()
    fill(tColor)
    textAlign(CENTER, CENTER)
    text(t, x, y)
    press = false
    buttonTimer++

    if(mouseIsPressed){
        if(buttonTimer>100){
            if(mouseX<x+twidth+p && mouseX>x-twidth-p &&mouseY<y+twidth+p && mouseY>y-twidth-p){
                press=true
                buttonTimer=0
            }
        }
    }

    if(touchEnd==true){
        if(buttonTimer>100){
            if(mouseX<xCoord+twidth && mouseX>xCoord-twidth && mouseY<yCoord+twidth && mouseY>yCoord-twidth){
                press=true
                buttonTimer=0
            }
        }
    }

    return press
}


function nextButton(x, y, p=0) {
    xCoord = x
    yCoord = y
    twidth=60
    imageMode(CENTER)
    image(next, x, y, 100,100)
    if(mouseX<x+twidth && mouseX>x-twidth&&mouseY<y+twidth&&mouseY>y-twidth){
        image(selected, x, y, 100,100)
    }
    if(touchStart==true){
        image(selected, x, y, 100,100)
    }
    noStroke()
    press = false
    buttonTimer++

    if(mouseIsPressed){
        if(buttonTimer>100){
            if(mouseX<x+twidth+p && mouseX>x-twidth-p &&mouseY<y+twidth+p && mouseY>y-twidth-p){
                press=true
                buttonTimer=0
            }
        }
    }

    if(touchEnd==true){
        if(buttonTimer>100){
            if(mouseX<xCoord+twidth && mouseX>xCoord-twidth && mouseY<yCoord+twidth && mouseY>yCoord-twidth){
                press=true
                buttonTimer=0
            }
        }
    }
    return press
}

function shuffleArr(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function enteredRoom() {
      myData.room  = streamField.value()
      streamField.remove()
  }
  
function enteredName() {
    myData.name = nameField.value();
    nameField.remove()
    return true
}

function test2AAnswered() {
    myData.compAnswer.ans1 = test2AnswerAField.value();
    test2AnswerAField.remove()
}

function test2BAnswered() {
    myData.compAnswer.ans2 = test2AnswerBField.value();
    test2AnswerBField.remove()
}

function test2CAnswered() {
    myData.compAnswer.ans3 = test2AnswerCField.value();
    test2AnswerCField.remove()
}

function test2DAnswered() {
    myData.compAnswer.ans4 = test2AnswerDField.value();
    test2AnswerDField.remove()
}

// function gotFrontData(data, id) {
//     partner = JSON.parse(data);
//     partnerPresent = true
// }

class Friend {
    constructor(id) {
        this.id = id,
        this.data = {
            role:'',
            room: '',
            name: '',
            stage: 'title',
            testAnswer: {
                ans1:'',
                ans2:'',
                ans3:'',
                ans4:'',
                ans5:'',
                ans6:'',
            },
            compAnswer: {
                ans1:'',
                ans2:'',
                ans3:'',
                ans4:'',
            },
            x:0,
            y:0,
            mousePressed:false,
        }
        this.config = {
            streamName: '',
            story: {
                celebName: '',
                verb:'',
                adjective: '',
                place: '',
            },
            etchRole: '',
            testQuestion1: [],
            testQuestion2: [],
            testQuestion3: [],
            testQuestion4: [],
            testQuestion5: [],
            testQuestion6: [],
            compQuestion1: '',
            compQuestion2: '',
            compQuestion3: '',
            compQuestion4: '',
        }
    }
  }
  
  function gotDisconnect(lostID) {
    friends.splice(friends.findIndex(e => e.id === lostID),1);
  }

  let friends = [];

  let presentIDsCurrentLength = 0
  let presentIDsOldLength = 0
  let presentIDs = []

function gotBackData(data, id) {


    if(presentIDs.length===0){
        presentIDs.push(id)
        person = new Friend(id)
        friends.push(person)
        presentIDsOldLength = presentIDs.length

    }

    if (presentIDs.length>0){
        let existingID = presentIDs.includes(id)
        if(existingID==false){
            presentIDs.push(id)
            person = new Friend(id)
            friends.push(person)
            // friends.splice(friends.findIndex(e => e.id === lostID),1);
        }
    }

        let parsedData = JSON.parse(data);

        for (let i = 0; i < friends.length; i++){

        if (friends[i].id === id){
            friends[i].data.room = parsedData.data.room;
            friends[i].data.role = parsedData.data.role;
            friends[i].data.name = parsedData.data.name;
            friends[i].data.stage = parsedData.data.stage;
            friends[i].data.testAnswer.ans1 = parsedData.data.testAnswer.ans1;
            friends[i].data.testAnswer.ans2 = parsedData.data.testAnswer.ans2;
            friends[i].data.testAnswer.ans3 = parsedData.data.testAnswer.ans3;
            friends[i].data.testAnswer.ans4 = parsedData.data.testAnswer.ans4;
            friends[i].data.testAnswer.ans5 = parsedData.data.testAnswer.ans5;
            friends[i].data.testAnswer.ans6 = parsedData.data.testAnswer.ans6;
            friends[i].data.compAnswer.ans1 = parsedData.data.compAnswer.ans1;
            friends[i].data.compAnswer.ans2 = parsedData.data.compAnswer.ans2;
            friends[i].data.compAnswer.ans3 = parsedData.data.compAnswer.ans3;
            friends[i].data.compAnswer.ans4 = parsedData.data.compAnswer.ans4;
            friends[i].data.x = parsedData.data.x
            friends[i].data.y = parsedData.data.y
            friends[i].data.mousePressed = parsedData.data.mousePressed
            friends[i].config.story.celebName = parsedData.config.story.celebName,
            friends[i].config.story.verb = parsedData.config.story.verb,
            friends[i].config.story.adjective = parsedData.config.story.adjective,
            friends[i].config.story.place = parsedData.config.story.place,
            friends[i].config.etchRole= parsedData.config.etchRole,
            friends[i].config.testQuestion1= parsedData.config.testQuestion1
            friends[i].config.testQuestion2= parsedData.config.testQuestion2
            friends[i].config.testQuestion3= parsedData.config.testQuestion3
            friends[i].config.testQuestion4= parsedData.config.testQuestion4
            friends[i].config.testQuestion5= parsedData.config.testQuestion5
            friends[i].config.testQuestion6= parsedData.config.testQuestion6
            friends[i].config.compQuestion1= parsedData.config.compQuestion1
            friends[i].config.compQuestion2= parsedData.config.compQuestion2
            friends[i].config.compQuestion3= parsedData.config.compQuestion3
            friends[i].config.compQuestion4= parsedData.config.compQuestion4
        }
    }
}

function touchStarted() {
    touchStart=true
}

function touchEnded() {
    touchEnd=true
}

function backDataSend() {
    let backDatatoSend = {
        data: myData,
        config: config,
    };
    backStream.send(JSON.stringify(backDatatoSend));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }