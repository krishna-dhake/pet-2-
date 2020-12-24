var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
//var food, dogFoodImg;
var button1,button2;
var foodobj;

foodS=20;

function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
 // milkImg = loadImage("milk.png");
   milkImg = loadImage("dogfood.png");


}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  //foodobj=new food();

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  //foodStock-=1;
  

  milk = createSprite(140,435,15,15);
  milk.addImage(milkImg);
  milk.scale = 0.05;

  milk1 = createSprite(210,285,40,40);
  milk1.addImage(milkImg);
  milk1.scale = 0.08;
  milk1.visible = false;

  button1 = createButton("Feed The Dog");
  button1.position(700,95);
  button1.mousePressed(feedDog);

  button2 = createButton("Add Food");
  button2.position(800,95);
  button2.mousePressed(addFood);
  
}


function draw() {  
  background("green")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 50;

}
fedTime = database.ref("fedTime");
  fedTime.on("value"),
  function(data)
  {
    lastFed = data.val();
  }
  
textSize(20);
  fill("black");
  if(lastFed>=12)
  {
    text("Last Feed : " + lastFed%12 + "PM",350,30);
  }
  else if(lastFed === 0)
  {
    text("Last Feed : 12AM",350,30);
  }
  else
  {
    text("Last Feed : " + lastFed + "AM",350,30);
  }


  drawSprites();
  textSize(17);
  fill("black");
  text("Press up arrow key to feed food to the Dog ",50,50);
  fill("black");
  text("food Remaining "+foodS,170,440);
  foodobj.display();

}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock();
}

//function writeStock(x){

  //if(x<=0){
  //  x = 0;
 // }else{
  //  x=x-1
  //}

  //database.ref('/').update({
 //   food:x
  //})
//}

function addFood()
{
  database.ref("/").update
  (
    {
      Food : foodS + 1
    }
  )
}

function feedDog()
{
  dog.addImage(dog2img);
  foodObj.deductFoodStock()
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  //foodObj.getFedTime(lastFed);

  database.ref("/").update
  (
    {
      Food : foodObj.getFoodStock(),
      fedTime : hour()
    }
  )
}