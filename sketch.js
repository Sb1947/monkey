
PLAY = 1
END = 0
var gamestate = PLAY

var monkey , monkey_running
var invisibleground
var banana_1 ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey  = createSprite(30,320,10,10)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  invisibleground = createSprite(200,400,600,100)
  invisibleground.velocityX = -4
  invisibleground.visible = false  
  
  FoodGroup = new Group()
  obstaclesGroup = new Group()

  survivalTime = 0
}


function draw() {
background("white")

  if (gamestate === PLAY)
  {
  if (invisibleground.x < 50){
      invisibleground.x = invisibleground.width/2;
    }
  createBanana()
  createObstacle()
  
  
 monkey.collide(invisibleground)
 if (keyDown("space") && monkey.y > 300){
   monkey.velocityY = -10
 }
  monkey.velocityY = monkey.velocityY + 1

  
 if (obstaclesGroup.isTouching(monkey)){
    gamestate = END
    }
  }
else if (gamestate === END)
  {
   obstaclesGroup.setVelocityXEach(0)
   obstaclesGroup.setLifetimeEach(-1)
   FoodGroup.setVelocityXEach(0)
   FoodGroup.setLifetimeEach(-1)
   monkey.velocityX = 0;
    monkey.velocityY = 0;
   invisibleground.velocityX = 0
  }
  drawSprites() 
if (FoodGroup.isTouching(monkey)){
  FoodGroup[0].destroy()
  survivalTime = survivalTime + 1 
}textSize(20)
text("Survival Time :" + survivalTime,160,20)
}
function createBanana()
{
  if (frameCount % 80 === 0)
  {
    banana_1 = createSprite(380,Math.round(random(200,300)),10,10)
    banana_1.addImage("banana",bananaImage)
    banana_1.lifetime = 100
    banana_1.velocityX = -4
    banana_1.scale = 0.1
    FoodGroup.add(banana_1)
  }
}

function createObstacle()
{
  if (frameCount % 300 === 0)
  {
    obstacle_1 = createSprite(380,340,10,10)
    obstacle_1.addImage("banana",obstacleImage)
    obstacle_1.lifetime = 100
    obstacle_1.velocityX = -8
    obstacle_1.scale = 0.1
    obstaclesGroup.add(obstacle_1)
  }
}



