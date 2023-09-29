var canvas
var backgroundImg,runnerAnimation,coinImg,obs1Img,obs2Img;
var runner
var coinS,runningS
var road
var coin
var gameoverImg,youwinImg,restartImg
var gameover,restart,youwin;
var PLAY = 1, END=0;
var gamestate = PLAY;
var score = 0
var back

function preload(){
backgroundImg = loadImage("cityy.png")
coinImg = loadImage("goldCoin.png")
obs1Img = loadImage("obstacle1.png")
obs2Img = loadImage("obstacle2.png")
road = loadImage("track.jpg")
gameoverImg = loadImage("GameOver.png")
youwinImg = loadImage("You win.png")
restartImg = loadImage("reset.png")

coinS = loadSound("Coin collection.mp3")
runningS = loadSound("Running.mp3")

runnerAnimation = loadAnimation("Runner1.png","Runner2.png","Runner3.png")
//skateAnimation = loadAnimation("Rskate1.png","Rskate2.png","Rskate3.png")
stuntAnimation = loadAnimation("Rstunt1.png","Rstunt2.png","Rstunt3.png")
}



function setup() {

canvas = createCanvas(windowWidth,windowHeight);

back = createSprite(windowWidth/2,windowHeight/2.9)
back.addImage(backgroundImg)
back.velocityX=-7

runner = createSprite(100,570,5,100);
runner.addAnimation("running", runnerAnimation);
runner.scale = 1;

coinG = createGroup()
obsG = createGroup()

gameover = createSprite(750,200,50,50)
gameover.addImage(gameoverImg)
gameover.scale = 1.5

restart = createSprite(750,450,505,50)
restart.addImage(restartImg)
restart.scale = .2



gameover.visible = false;
restart.visible = false;

score = 0;

edges = createEdgeSprites()


}

function draw() {
 

  
  background("white");
  if(gamestate===PLAY){
  
    if(back.x<0){
      back.x =windowWidth
    }

    if(keyDown("space") && runner.y>=windowHeight/2){
      runner.velocityY = -20
    }
    runner.velocityY +=1

    // keyisdown("g")

  if(keyIsDown("s")){
    runner.changeAnimation("stunt",stuntAnimation)
  }

  if(keyIsDown(UP_ARROW)&& runner.y >= windowHeight-200){
    runner.y -= 10
    
  }

  if(keyIsDown(RIGHT_ARROW)){
    runner.x +=10
    
  }
  if(keyDown(DOWN_ARROW)){
    runner.y += 10
     
  }

  if(runner.isTouching(coinG)){
    coinG.destroyEach();
    score = score+2
    coinS.play()
  }

  if (obsG.isTouching(runner)){
    gamestate = END;
    gameover.visible = true;
    restart.visible = true
  }

  if(mousePressedOver(restart)){
    reset();
  }









  coins();
  spawnObstacles();
}
  runner.collide(edges[3])
  runner.collide(edges[0])
  drawSprites();
  text("SCORE:"+score,500,55,100)
}


function coins(){
  if(World.frameCount%100===0){
    coin = createSprite(windowWidth,windowHeight-200);
    coin.addImage("moving",coinImg);
    coin.x = Math.round(random(100,1000));
    coin.y = Math.round(random(580,700))
    coin.velocityX = -4 
    coinG.add(coin);
    coin.scale = 0.1
}
}

function spawnObstacles(){
  if(World.frameCount%140===0){
    var obstacle = createSprite(windowWidth,windowHeight-200)
    obstacle.x = Math.round(random(100,1000))
    obstacle.y = Math.round(random(windowHeight- 150,windowHeight-50))

    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: obstacle.addImage(obs1Img)
              break;
      case 2: obstacle.addImage(obs2Img)
              break;
      default: break;
    }
    obstacle.scale = 0.04
    obstacle.velocityX= -4
    obstacle.lifetime = 150
    obsG.add(obstacle)
  }
}

function reset(){
 gamestate = PLAY
 gameover.visible = false
 restart.visible = false
 obsG.destroyEach();
 coinG.destroyEach();
 score = 0;
}