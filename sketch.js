var dog, happyDog, database;
var foodS, foodStock;
var dog1;

function preload()
{
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog1 = createSprite(250,250,20,20);
  dog1.addImage("dog",dog);
  dog1.scale = 0.3
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog1.addImage(happyDog)
  }

  drawSprites();
  //add styles here

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x = 0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}