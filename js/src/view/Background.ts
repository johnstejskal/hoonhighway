/**
 * Created with JetBrains WebStorm.
 * User: John Stejskal
 * Date: 9/05/13
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */


class Background extends createjs.Bitmap {


   public _width:Number;

   public oContainer;

   private _oCityHolder;
   private _oRoadHolder;
   private _pole;

    public oContainer;


    //-----------------------------------o
    // Constructor
    //-----------------------------------o
    constructor(_x:Number = 0, _y:Number = 0, tType:string = null)
    {
       trace("Background inited");

        //create main container
        this.oContainer = new createjs.Container();
       Main.stage.addChild(this.oContainer);

        var sky = Assets.getAsset("sky");
        sky.scaleX = 10;//Data.stageWidth;
       sky.scaleY = 6;//Data.stageHeight;
         this.oContainer.addChild(sky);

         //create city layer
        this._oCityHolder = new createjs.Container();
        var cityL = Assets.getAsset("cityScape");
        this._oCityHolder.addChild(cityL);

        var cityR = Assets.getAsset("cityScape");
        cityR.x = cityL.image.width;
        this._oCityHolder.addChild(cityR);
        this.oContainer.addChild(this._oCityHolder);
        this._oCityHolder.y = 155;
        //create road layer
        this._oRoadHolder = new createjs.Container();
        var roadL = Assets.getAsset("roadBG");
        this._oRoadHolder.addChild(roadL);

        var roadR = Assets.getAsset("roadBG");
        roadR.x = roadL.image.width;
        this._oRoadHolder.addChild(roadR);
        this._oRoadHolder.y = Main.canvas.height - roadR.image.height;
        this.oContainer.addChild(this._oRoadHolder);


//        this._pole = Assets.getAsset("pole");
//        this._pole.x = Data.stageWidth;
//        this._pole.y= 90;
//        this.oContainer.addChild(this._pole);


    }


    public update()
    {
       this._oRoadHolder.x -= Data.speed;

       if( this._oRoadHolder.x < - Data.stageWidth)
       {
       this._oRoadHolder.x = 0;
       Data.distance ++;
       Data.petrol -= 1;

       EventBus.dispatch("evt_distance");


//        this._pole = Assets.getAsset("pole");
//        this._pole.x = Data.stageWidth;
//        this._pole.y= 90;
//        this.oContainer.addChild(this._pole);

       }

        this._oCityHolder.x -= .1 * Data.speed;
        if( this._oCityHolder.x < - Data.stageWidth)
            this._oCityHolder.x = 0;


    }

    public doSpeedBlur()
    {

        var oBlurContainer:createjs.Container = new createjs.Container();

        var blur1 = Assets.getAsset("bgBlur1");
         oBlurContainer.addChild(blur1);
        var blur2 = Assets.getAsset("bgBlur2");
        oBlurContainer.addChild(blur2);

        var blur3 = Assets.getAsset("bgBlur3");
        oBlurContainer.addChild(blur3);

        this.oContainer.addChild(oBlurContainer);
        oBlurContainer.y = -10;

        var count:number = 1;
        var imgTick:number = 1;


        var tween = createjs.Tween.get(oBlurContainer).wait(0)
            .to({alpha:0},5,Ease.linear)
            .to({alpha:1},1000,Ease.linear)


         var int=self.setInterval(function(){
          Data.distance+=1;
          EventBus.dispatch("evt_distance");

         if(imgTick > 3)
             imgTick = 1;

        if(imgTick == 1)
        moveToTop(blur1);
        else  if(imgTick == 2)
        moveToTop(blur2);
        else
        moveToTop(blur3);

            imgTick ++;
            count ++;

            if(count > Data.nitroDuration)
            {
                var tween = createjs.Tween.get(oBlurContainer)
                .to({alpha:0},300,Ease.linear)
                .call(function(){
                        removeFromParent(oBlurContainer)
                        clearInterval(int);

                    EventBus.dispatch("evt_nitroEnd");
                    }, null, null);

            }

        }, 60)
    }

}





