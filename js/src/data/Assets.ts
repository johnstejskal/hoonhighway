/**
 * Author: John Stejskal
 */


module Assets {


    export var arrGameObjects:Array;
    export var arrRequiredAssets:Array;
    export var assetsLength:number;
    export var arrObstacles:Array;




    arrGameObjects = [];
    arrObstacles = [];

    /* List all game objects reeded by the game. you could also use a server side script to get all images from a directoty
    but cannot be done purely with Javascript.
     */
    arrRequiredAssets =  ["obstacle_car2.png","item_gasCan.png","obstacle_car3.png","carRim.png","roadBG.jpg","cityScape.png","car1.png",
                          "pole.png", "ss_smoke.png", "distanceBG.png", "petrolGaugeBacking.png", "gaugeNeedle.png", "obstacle_roadCone.png",
                           "shadow.png", "item_nitro.png","bgBlur1.jpg", "bgBlur2.jpg", "bgBlur3.jpg", "brakeLight.png", "speechBubble.png",
                           "sky.jpg", "txByJohn.png", "txTouchToStart.png", "gameTitle.png"];

    //---------------------------o
    // Load all game assets
    // call this to start the asset loading process
    //----------------------------o
    export function loadAssets()
    {
        var lgth:Number = this.arrRequiredAssets.length;
        for(var i = 0; i < lgth; i++)
        {
            var fileName:String = this.arrRequiredAssets[i];
            var arrSplit:Array = fileName.split('.');
            var img = new Image();
            img.name = arrSplit[0];


            img.src = "assets/"+fileName;

            img.onload = assetLoad;
        }

    }

    //----------------------------o
    // Asset load handler
    //---------------------------o
    function assetLoad(e)
    {
        trace("asset loaded"+e.target.name);
        var image = e.target;
        var bitmap;
        bitmap = new createjs.Bitmap(image);
        bitmap.name = e.target.name;

        arrGameObjects.push(image);

       if(bitmap.name.indexOf("obstacle")  > -1 || bitmap.name.indexOf("item")  > -1)
        arrObstacles.push(image);

        var perc:number =  (arrGameObjects.length/arrRequiredAssets.length)*1;

        perc = perc * 80;

        //animate the DOM preloader with jQuery
        $('#preloadBar').animate({width:perc}, 100);



        //----------------------------o
        // When all the objects have loaded, remove preloader and construct game
        //-----------------------------o
        if(arrGameObjects.length == arrRequiredAssets.length) {
            assetsLength = arrGameObjects.length;
            document.getElementById('preloader').style.visibility = 'hidden';

            Main.constructGame();
        }


    }

    //-----------------------------------------o
    //-- public interface for retrieving assets
    // usage - Assets.getAsset(assetName)
    // can be used globally
    //-----------------------------------------o
    export function getAsset(name):createjs.Bitmap
    {

        var bitmap:createjs.Bitmap;
        for(var i = 0; i < arrGameObjects.length; i++)
        {
             if(name == arrGameObjects[i].name)
             {
              bitmap = new createjs.Bitmap(arrGameObjects[i]);
              return bitmap;

             }

        }
        return bitmap;

    }
}








