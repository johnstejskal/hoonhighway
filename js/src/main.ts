
//-----------------------------------------o
// ENTRY POINT
//-----------------------------------------o
$(document ).ready(function() {
    console.log( "All scripts ready" );
    Main.init();
});


module Main{
  export var stage;
  export var canvas;
    var update;

    var oCar;
    var oBg;
    var oUI;
    var oTitleScreen;

    var stageWidth:number;
    var stageHeight:number;
    export var levelMapCount:number = 0;
    //--------------------------------o
    //---gameplay attributes
    //--------------------------------o
    var rightYPos:number = 330;
    var leftYPos:number = 260;
    var  middleYPos:number = 295 ;
    var speedCount:number = 0;
    var speedTimer:number = 10;  //take off is 10, then switch when car is moving faster

    var obstacleInterval:number = 0;
    var maxObstacleTimer:number = 200;
    var minObstacleTimer:number = 50;
    var obstacleTimer:number = 200;

    var currentPos:string = "right"; //starting pos
    var lastPos:string; //starting pos



    var arrObstaclePool:Array;
    var arrCurrLane:Array;
   // var arrObstaclesInPlay:Array;
    var arrleftLane:Array;
    var arrRightLane:Array;

    var gameInPlay:Boolean = false;
    var objRef;
    var isChangineLanes:Boolean = false;
    var isColling:bool = false;
    var isCollisionRecover:bool = false;
    var speedPerc:number;
    var isItemCollected:bool = false;
    var isObstacleInPlay:bool = false;
    var isNitro:bool = false;
    var currObjectLane:string;


//------------------------------o
// Construct document
export function init()
{

    arrObstaclePool = [];
    arrObstaclePool.push("car2", "car3");

    arrleftLane = [];
    arrRightLane = [];
    arrCurrLane = [];

   //create the stage object from the canvas
    canvas = document.getElementById("demoCanvas");
     stage = new createjs.Stage("demoCanvas");

     stageWidth = canvas.width;
     stageHeight =  canvas.height;

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

   //load all required assets
    Assets.loadAssets();

}

export function constructGame()
{
    trace("Main: constructGame()") ;

    oBg = new Background();

    oTitleScreen = new TitleScreen();
    //---------------------------------------o
    //--- setup and populate objectPools
    //---------------------------------------o
    for(var i = 0; i < Assets.arrObstacles.length; i ++)
    {
        var obj = new createjs.Bitmap(Assets.arrObstacles[i]);
        obj.name = Assets.arrObstacles[i].name;
        obj.regX = 0;
        obj.regY = obj.image.height;

        if(obj.name.indexOf("obstacle")  > -1)
        ObjectPool.add(obj, ObjectPool.obstaclePool);
        else if(obj.name.indexOf("item")  > -1)
        ObjectPool.add(obj, ObjectPool.itemPool);

    }

    EventBus.addEventListener("evt_nitroEnd", nitroEnd);
    stage.update();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);
   // setTimeout(startGame, 1000);
}

//--------------------------------------------o
//--- Start Game (image load callback)
// --gets called when Assets manager finishes loading
//--------------------------------------------o
export function startGame()
{
    console.log("Main: startGame()");

    oCar = new Car();
    oCar.oContainer.x = 20;
    oCar.oContainer.y =  rightYPos;

    oUI = new UI();
    oCar.brakeLight(false);
     stage.onPress = function(e)
    {
      changeCarPos();
    };

     //createjs.Ticker.useRAF = true;

     gameInPlay = true;

    setTimeout(function(){initNextObstacle();}, 500)
}



//------------------------------------o
//--- Game Loop
//-- main game loop, updates all sub clips
//------------------------------------o
function gameLoop()
{
    stage.update();

     if(!gameInPlay)
     return;



     oUI.update();


        oBg.update();
        oCar.update();

        if(Data.speed < 3)
            Data.isBounceAllowed = true;
        else
            Data.isBounceAllowed = false;

        if(Data.speed < 5)
         speedTimer = 10;

        if(Data.speed < 10)
          speedTimer = 50;
        else
          speedTimer = 200;

        //increase speed at set interval
        if( speedCount >= speedTimer)
        {
            speedCount = 0;
            if(Data.speed <  Data.maxSpeed)
              Data.speed +=1;
            if( obstacleTimer > 50)
                obstacleTimer -= 5;

        }else{
            speedCount ++;
        }


    moveObjects();

}
 //---------------------------------------------o
//--- initNextObstacle
//-- Gets called when one last object leaves the canvas
//---------------------------------------------o
 function initNextObstacle()
 {
     if(isNitro || arrCurrLane.length > 0)
     return;



     levelMapCount ++;

     if(levelMapCount >= Data.arrLevelMapLength)
     levelMapCount = 0;

     createObstacles(Data.arrLevelMap[levelMapCount], Data.arrLevelType[levelMapCount]);

 }

//-------------------------------------------------o
//--- Change Car Pos
//-- Animates the car betweenLanes, z-index updates
//-------------------------------------------------o
function changeCarPos()
{
   if(isColling || Data.speed <2)
   return;

    oCar.showWheelSmoke();

    //**temporary bug fix here
    //**sometimes car doesnt change lanes
    if(oCar.oContainer.y == rightYPos)
    currentPos = "right";
    if(oCar.oContainer.y == leftYPos)
       currentPos = "left";


    if( currentPos == "right")
    {
       oCar.oContainer.skewY =-4 ;
      if( arrRightLane.length > 0) moveToTop( arrRightLane[0]);
        currentPos = "changing";
        lastPos = "right";
       TweenLite.to(oCar.oContainer,.2, {scaleX:.9,y:middleYPos, onComplete:function(){
           TweenLite.to(oCar.oContainer,.1, {skewY:0,x:20, y:leftYPos, scaleX:0.8, scaleY:0.8, onComplete:function(){currentPos = "left"; isChangineLanes = false; oCar.hideWheelSmoke();}})
       }});

    }
    else if(currentPos == "left")
    {
        oCar.oContainer.skewY =2 ;
        currentPos = "changing";
        lastPos = "left";
        moveToTop(oCar.oContainer);
        if(arrRightLane.length > 0) moveToTop(arrRightLane[0]);
        TweenLite.to(oCar.oContainer,.1, {scaleX:.9,y:middleYPos, onComplete:function(){
            TweenLite.to(oCar.oContainer,.2, {skewY:0,x:20, y:rightYPos, scaleX:1, scaleY:1, onComplete:function(){currentPos = "right"; isChangineLanes = false; oCar.hideWheelSmoke();}})
        }});

    }
    else     //changing
    {
        TweenLite.killTweensOf(oCar);
        if(lastPos == "left")
           currentPos = "right";
        else if(lastPos == "right")
          currentPos = "left";

        changeCarPos();

    }

}

//---------------------------------------------o
//--- Create Obstacles
//-- accepts params for what lane, and what type
//---------------------------------------------o
function createObstacles(lane:number, type:number)
{
   if(isNitro)
   return;

   if(lane == 0 || arrCurrLane.length < 0){
   setTimeout(function(){initNextObstacle()}, 1000);
   return;
   }

    var rndmLane:number = lane - 1;//Math.round(Math.random());

    var posYarr:Array = [[385,.8], [480, 1]];

    var cObj = new createjs.Container();
    var obj = ObjectPool.get(type);
    cObj.name = obj.name;
    cObj.addChild(obj);
    cObj.x = 1000;
    cObj.y = posYarr[rndmLane][0];
    cObj.scaleX = cObj.scaleY = posYarr[rndmLane][1];

   stage.addChild(cObj);
    //left Lane
   if(lane == 1){
       arrleftLane.push(cObj);
       arrCurrLane = arrleftLane;
       currObjectLane = "left";
       moveToTop(oCar.oContainer);
   }
   //right lane
   else if(lane == 2){
       arrRightLane.push(cObj);
       arrCurrLane = arrRightLane;
       currObjectLane = "right";

   }


}

//---------------------------------------------o
//--- Collect Item
//-- Handler for collecting of items
//---------------------------------------------o
function collect(item:string, ref)
 {
      switch(item)
      {
          case "item_gasCan":
          Data.petrol += 10;
          if(Data.petrol > Data.maxPetrol)
          Data.petrol = Data.maxPetrol;
          EventBus.dispatch("evt_petrol");

          setTimeout(function(){initNextObstacle()}, 500);
          break;

          case "item_nitro":
          oCar.doNitro();
          oBg.doSpeedBlur();
          isNitro = true;
          break;
      }

          removeFromParent(ref);
          isObstacleInPlay = false;


 }


//---------------------------------------------o
//--- Collision
//-- Manages afterMath of a collision
//---------------------------------------------o
function collision(impactType:string = "major")
{
    if(isColling)
    return;

    isColling = true;

    objRef = arrCurrLane[0];

    Data.isBounceAllowed = false;

    TweenLite.killTweensOf(oCar.oContainer);

    if(impactType == "minor")
    {
        oCar.doCollision("minor");

        TweenLite.to(objRef,.5, {x:130, y:-30, rotation:"-200", onComplete:function(){
          objRef.rotation = 0;
          removeFromParent(objRef);
          arrCurrLane.splice(0, 1);
          isColling = false;
          oCar.resetCarBody();
          setTimeout(function(){initNextObstacle()}, 500);

      }});
      Data.speed = 2;

    }
    else
    {

        Data.speed = 0;
        isCollisionRecover = true;
        gameInPlay = false;
        oCar.doCollision("major");
      TweenLite.to(objRef,.3, {x:"+=40", onComplete:function(){

          var speechBubble = Assets.getAsset("speechBubble");
          speechBubble.y = -270;  speechBubble.x = 110;
          setTimeout(function(){objRef.addChild(speechBubble);},200);
          setTimeout(function(){removeFromParent(speechBubble)},3000);

      }});

        TweenLite.to(oCar.oContainer,.1, {rotation:-5, y:"-=10", x:"-=50", onComplete:function(){
            TweenLite.to(oCar.oContainer,.1, {rotation:0, y:"+=10",onComplete:function(){

                setTimeout(function(){
                    resetCar(currObjectLane);
                    gameInPlay = true;
                }, 700)
            }})
        }})
    }

}

    //---------------------------------------------o
    //--- Reset Car
    //-- Resets the car position after a collision
    //---------------------------------------------o
    function resetCar(lane:string)
    {
       if(lane == "left"){
       oCar.oContainer.y = rightYPos;
       currentPos = "right";
       oCar.oContainer.scaleX = 1;
       oCar.oContainer.scaleY = 1;

       }else{
       oCar.oContainer.y = leftYPos;
       currentPos = "left";
       oCar.oContainer.scaleX = 0.8;
       oCar.oContainer.scaleY = 0.8;
       }
        oCar.oContainer.x = 20;
       GameUtils.makeObjFlash(oCar.oContainer);

        setTimeout(function(){isColling = false; Data.isBounceAllowed = true; oCar.bounceCar()}, 1000)
    }

    //-----------------------------------o
    //--- Move Objects
    //-----------------------------------o
    function moveObjects()
    {
        objRef = arrCurrLane[0];

        if(objRef == null)
            return;

        objRef.x -= Data.speed;
        if( objRef.x < -250){
            objRef.parent.removeChild(objRef);
            isObstacleInPlay = false;
            arrCurrLane.splice(0, 1);
            initNextObstacle();
        }else if( objRef.x < 250 &&  objRef.x > 30 && currentPos == currObjectLane)

        {

            switch(objRef.name)
            {
                case "item_gasCan":
                    arrCurrLane.splice(0, 1);
                    collect("item_gasCan", objRef);
                    break;

                case "item_nitro":
                arrCurrLane.splice(0, 1);
                collect("item_nitro", objRef);
                break;

                case "obstacle_roadCone":
                    collision("minor");
                    break;

                default:
                    collision();

            }

        }
    }//close moveObjects()

    function nitroEnd()
    {
        isNitro = false;
        initNextObstacle();
    }

}

