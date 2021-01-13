//Create variables here
var dog, dogImg, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  //fetch foodstock
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  //create dog
  dog = createSprite(250, 250 ,100, 100);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }; 

  drawSprites();
  //add styles here
  textSize(20);
  fill(255);
  stroke(10);

  text("Note: Press the UP_ARROW Key to feed Drago Milk!", 20, 400);
  text("Milk Cartons Available:" + foodS, 110, 450);

}

//functino to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
}



