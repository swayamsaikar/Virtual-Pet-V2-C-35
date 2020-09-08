//variables

//database variables
var database;
var foodStorage;
var FoodValue = 0;

var fedTime;
var lastFed = 0;

//for my dog app
var dog;
var happyDog;

var dogImage;
var happyDogImage;

var milkImage;
var milk;

var hungryDog;
var satisfiedDog;

//buttons
var addFood;
var FeedDog;


function preload() {
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
  milkImage = loadImage("Milk.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1400, 800);

  foodStorage = database.ref('Food');
  foodStorage.on("value", function (data) {
    FoodValue = data.val();
    console.log(data)
  })

  fedTime = database.ref('Food');
  fedTime.on("value", function (Y) {
    lastFed = Y.val();
    console.log("The Last Feeding of the Dog is: " + data);
  })

  //for UI

  dog = createSprite(1200, 450, 100, 100);
  dog.addImage("dogimg", dogImage);
  dog.scale = 0.4;

  milk = createSprite(830, 480, 10, 10);
  milk.addImage("milkImg", milkImage);
  milk.scale = 0.4;

  hungryDog = createElement('h1');
  hungryDog.html("Hungry Dog");
  hungryDog.position(1400, 645);
  hungryDog.style('font-size', '50px');

  //Functionality Code

  addFood = createButton("Add Food");
  addFood.position(500, 410);
  addFood.size(200, 50);
  addFood.style('font-size', '21px');
  addFood.style('border', '1px solid black');
  addFood.style('text-align', 'center');
  addFood.style('color', 'black');


  FeedDog = createButton("Feed The Dog");
  FeedDog.position(730, 410);
  FeedDog.size(200, 50);
  FeedDog.style('font-size', '21px');
  FeedDog.style('border', '1px solid black');
  FeedDog.style('text-align', 'center');
  FeedDog.style('color', 'black');

  addFood.mousePressed(function () {
    addDogFood(FoodValue);
    console.log(FoodValue);
  });

  FeedDog.mousePressed(function () {

    FeedDogFood(FoodValue);
    console.log("We Feed the Dog " + FoodValue);
    dog.visible = false;

    happyDog = createSprite(1150, 450, 100, 100);
    happyDog.addImage("dogimh", happyDogImage);
    happyDog.scale = 0.4;

    hungryDog.hide();

    satisfiedDog = createElement('h1');
    satisfiedDog.html("Happy Dog");
    satisfiedDog.position(1420, 645);
    satisfiedDog.style('font-size', '50px');

  });

}

function draw() {
  background(46, 139, 87);
  lastFeedTime(lastFed);

  //here also added styles
  textSize(50);
  fill("white");
  strokeWeight(2);
  stroke("black");
  textStyle(NORMAL);
  textFont("ariel")

  text("Note : Press The Feed Button To Feed The 🍼 to Dog !", 50, 270);
  text("Food Remaining: " + FoodValue, 200, 500);

  drawSprites();

  //add styles here
  textFont('Helvetica');
  textSize(50);
  fill("black");
  strokeWeight(1);
  text("Welcome To Virtual Pet App", 400, 100);

  textSize(50);
  text(" => ", 650, 500);
  text(" => ", 920, 500);

  textFont("georgia");
  text("Milk", 790, 670)

}

//Adding 1 Food Value
function addDogFood(x) {
  x = x + 1;

  database.ref('/').update({
    Food: x
  });
}

//subracting the Food value
function FeedDogFood(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x--;
  }
  database.ref('/').update({
    Food: x
  });
}

function lastFeedTime(x) {
  fill(255, 255, 255);
  textFont("ariel");
  textSize(50);

  if (x >= 12) {
    text("Last Feed: " + x % 12 + " PM", 200, 620);
  } else if (x == 0) {
    text("Last Feed: 12 AM", 200, 620);

  } else {
    text("Last Feed: " + x + " AM", 200, 620);
  }
  database.ref('/').update({
    FeedTime: x
  })
}