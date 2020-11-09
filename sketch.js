// primary variables
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;
var ground;

//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//the preload
function preload() {
  //monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  //banana
  bananaImage = loadImage("banana.png");

  //obstacle
  obstacleImage = loadImage("obstacle.png");

}


//the setup
function setup() {
  createCanvas(400, 400);

  //groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  //monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  //score
  score = 0;
  survivalTime = 0;

}

//draw
function draw() {
  //background
  background("white")

  //displays the survivalTime intValue
  stroke("black");
  fill("black");
  textSize(20);
  text("Score: " + score, 300, 30);

  //displays the survivalTime intValue
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time: " + survivalTime, 10, 30);

  //monkey
  monkey.collide(ground);

  //play
  if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);

    survivalTime = Math.ceil(frameCount / frameRate());

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -12;
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 3;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    obstacleGroup.setLifetimeEach(-1);

    food();
    obstacles();

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  if (gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    survivalTime.visible = false;

    stroke("red");
    fill("red");
    textSize(30);
    textSize("Game Over!", 110, 200);

    stroke("black");
    fill("black");
    text("Monkey is dead!", 100, 240);
  }
  drawSprites();
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
}