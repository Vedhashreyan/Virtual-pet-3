//Create variables here
var dog,happydog,database,foodS,foodStock;
var dogImg1,dogImg2;
var button1 , button2;
var fedTime;
var readState,gameState;
var food;
var c;
var br,brImg,b,r;
var lr,lrImg,l,i;
var gr,grImg,g,a;
var wr,wrImg,w,s;
var vs,vsImg,v,h;
var d1,d1Img,d2,d2Img,pl,n,d3,d4,d5,d6;
var rect1,rect2,rect3,rect4;

function preload()
{
  //load images here
  dogImg1= loadImage("dogImg.png");
  dogImg2= loadImage("dogImg1.png");
  brImg  = loadImage("Bed Room.png");
  lrImg  = loadImage("Living Room.png");
  grImg  = loadImage("Garden.png");
  wrImg  = loadImage("Wash Room.png");
  vsImg  = loadImage("dogVaccination.png");
  d1Img  = loadImage("running.png");
  d2Img  = loadImage("runningLeft.png");

  
}




function setup() {
  database=firebase.database();
  canvas = createCanvas(950,600);
  dog = createSprite(850,250,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  food= new Food();
  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  });
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  


  var button1 = createButton('Feed the dog ');
  button1.position(1000, 200);
  button1.mousePressed(feedDog);

  var button2=createButton('Add food');
  button2.position(1000,310);
  button2.mousePressed(addFood);

  var br=createButton('Bed Room');
  br.position(370,60);
  
  var lr=createButton('Living Room');
  lr.position(470,60);

  var gr=createButton('Garden');
  gr.position(580,60);

  var wr=createButton('Wash Room');
  wr.position(660,60);

  var vs=createButton('Vaccination schedule');
  vs.position(765,60);

  var pl=createButton('Dogs playing');
  pl.position(925,60);

  





  br.mousePressed(function(){
    var r=createSprite(450,250,1000,1000);
    r.shapeColor="red";
    var b=createSprite(450,250,20,20);
    b.addImage(brImg);
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
  })

  lr.mousePressed(function(){
    var i=createSprite(450,250,1000,1000);
    i.shapeColor="yellow";
    var l=createSprite(450,250,20,20);
    l.addImage(lrImg);
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
  })

  gr.mousePressed(function(){
    var a=createSprite(450,250,1000,1000);
    a.shapeColor="lightblue";
    var g=createSprite(450,250,20,20);
    g.addImage(grImg);
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
    
  })

  wr.mousePressed(function(){
    var s=createSprite(450,250,1000,1000);
    s.shapeColor="orange";
    var w=createSprite(450,250,20,20);
    w.addImage(wrImg);
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
  })
  
  vs.mousePressed(function(){
    var h=createSprite(450,250,1000,1000);
    h.shapeColor="blue";
    var v=createSprite(450,300,20,20);
    v.addImage(vsImg);
    v.scale=0.75
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
  })
  
  
  pl.mousePressed(function(){
    var n=createSprite(450,250,1000,1000);
    n.shapeColor="lightgreen";
    var d1=createSprite(150,50,20,20);
    d1.addImage(d1Img);
    d1.velocityX=1;
    d1.velocityY=1;
    d1.scale=0.1;

    var d2=createSprite(650,50,20,20);
    d2.addImage(d2Img);
    d2.velocityX=-1;
    d2.velocityY=1;
    d2.scale=0.1;

    var d3=createSprite(250,150,20,20);
    d3.addImage(d1Img);
    d3.velocityX=1;
    d3.velocityY=2;
    d3.scale=0.1;

    var d4=createSprite(350,450,20,20);
    d4.addImage(d2Img);
    d4.velocityX=-1;
    d4.velocityY=1;
    d4.scale=0.1;

    var d5=createSprite(630,200,20,20);
    d5.addImage(d1Img);
    d5.velocityX=1;
    d5.velocityY=1.3;
    d5.scale=0.1;

    var d6=createSprite(276,360,20,20);
    d6.addImage(d2Img);
    d6.velocityX=-1;
    d6.velocityY=0.9;
    d6.scale=0.1;

    var d7=createSprite(230,400,20,20);
    d7.addImage(d1Img);
    d7.velocityX=1;
    d7.velocityY=-1.3;
    d7.scale=0.1;

    var d8=createSprite(48,360,20,20);
    d8.addImage(d1Img);
    d8.velocityX=1;
    d8.velocityY=-0.9;
    d8.scale=0.1;

    var d9=createSprite(800,500,20,20);
    d9.addImage(d2Img);
    d9.velocityX=-1
    d9.velocityY=-1.3;
    d9.scale=0.1;

    var d10=createSprite(18,60,20,20);
    d10.addImage(d1Img);
    d10.velocityX=1;
    d10.velocityY=0.9;
    d10.scale=0.1;
   
   
    button1.hide();
    button2.hide();
    input.hide();
    c.hide();
    createEdgeSprites();
    d1.bounceOff(edges);
  })

  var c=createButton('Continue');
  c.position(1150,150);
 

  var input = createInput("Name your dog here");
  input.position(1050,100);
  
  c.mousePressed(function(){
    input.hide();
    c.hide();

    var name = input.value();
    
    
    var greeting = createElement('h3');
    greeting.html("Your dog " + name + " is here , feed him" )
    greeting.position(1000, 350)
  });
  
}


function draw() { 
  currentTime = hour();
  background("cyan") 
  // dog.display();
  food.display();
  drawSprites();
  textSize(20);
  fill(46,139,87);
  text("Food Remaining: "+foodS,20,100);

 
  
  if(fedTime>=12)
        {
        
        fill("green");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 20,70);
        }
        else if(fedTime==0)
        {
        
            fill("green");
            textSize(15); 
             text("Last Fed : 12 AM",20,70);
        }
        else
        {
        
            fill("green");
            textSize(15); 
            text("Last Fed : "+ fedTime + " AM", 20,70);
        }
 
   
       
      


}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);
  
   foodS--
   database.ref('/').update({
   Food:foodS
  })
  fedTime=hour();
  }

function addFood(){
  dog.addImage(dogImg1);
foodS++
database.ref('/').update({
  Food:foodS
})
}









