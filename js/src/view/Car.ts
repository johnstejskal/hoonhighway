/**
 * Created with JetBrains WebStorm.
 * User: John
 * To change this template use File | Settings | File Templates.
 */

class Car extends createjs.Bitmap {


    public oBackWheel:Wheel;
    public oFrontWheel:Wheel;

    private _framesSmoke:createjs.BitmapAnimation;
    public oFrontWheel:Wheel;
    private _cBody;
    private _imgShadow;
    private _imgbrakeLight;

    private bounceTween;
    public oContainer;

    //-----------------------------------o
    // Constructor
    //-----------------------------------o
    constructor(_x:Number = 0, _y:Number = 0, tType:string = null)
    {
        this.oContainer = new createjs.Container();
        this._cBody = new createjs.Container();


        //car shadow
        this._imgShadow = Assets.getAsset("shadow");
        this._imgShadow.y = 135;
        this._imgShadow.x = -10;

        this.oContainer.addChild(this._imgShadow);

        //back wheel
        this.oBackWheel = new Wheel(59, 111, this.oContainer);
        this.oContainer.addChild(this.oBackWheel);
        this.oContainer.x = 500;

        //front wheel
        this.oFrontWheel = new Wheel(235, 111, this.oContainer);
        this.oContainer.addChild(this.oFrontWheel);
        this.oContainer.x = 500;

        //car body
        var _imgBody = Assets.getAsset("car1");
        this._cBody.addChild(_imgBody);

        this._imgbrakeLight = Assets.getAsset("brakeLight");
        this._imgbrakeLight.x = -33; this._imgbrakeLight.y = 10;
        this._cBody.addChild(this._imgbrakeLight);

        this.oContainer.addChild(this._cBody);

        Main.stage.addChild(this.oContainer);
        var ssSmoke = Assets.getAsset("ss_smoke");

        var spriteSheetIdle = new createjs.SpriteSheet({
            images: [ssSmoke.image],
            frames: { width: 78, height: 131, regX: 0, regY: 0 },
            animations: {
                idle: [0, 3, "idle", 1]
            }
        });

        this._framesSmoke = new createjs.BitmapAnimation(spriteSheetIdle);

        this. _framesSmoke.name = "wheelSmoke";
        this. _framesSmoke.x = 5;
        this. _framesSmoke.y = 15;
       //  this._framesSmoke.vX = 1;

        this.bounceTween = createjs.Tween;

       this.oContainer.addChild(this._framesSmoke);
       this.hideWheelSmoke();

       this.bounceCar();


    }

    public brakeLight(value:bool)
    {
        this._imgbrakeLight.visible = value;
    }

     public showWheelSmoke()
    {
      if(Data.speed < 5)
      return;

     this._framesSmoke.visible = true;
     this._framesSmoke.gotoAndPlay("wheelSmoke");
    }

    public hideWheelSmoke()
    {
        this._framesSmoke.gotoAndStop(0);
        this._framesSmoke.visible = false;
    }

    public update()
    {
        this.oBackWheel.update();
        this.oFrontWheel.update();

    }

    public bounceCar()
    {
        if(!Data.isBounceAllowed)
        return;

            this.bounceTween.get(this._cBody).wait(40)
            .to({y:1},50,Ease.linear)
            .wait(40)
            .to({y:0},50,Ease.linear)
            .call(this.bounceCar,null,this);
    }

    public doNitro()
    {
        EventBus.addEventListener(Data.EVENT_NITRO_END, this.resetCarBody, this);
       // this._imgShadow.visible = false;
        this.bounceTween.get(this._cBody)
            .to({rotation:-1},300,Ease.linear)


    }


    //------------------------------o
    // collision animation
    //------------------------------o
    public doCollision(impactType:string = "major")
    {

        if(impactType == "minor")
        {
        this.brakeLight(true);
        this.bounceTween.get(this._cBody)
        .to({rotation:1},200,Ease.linear)
        }else
        {
            this.bounceTween.get(this._cBody)
                .to({rotation:-2},60,Ease.linear)
                .to({rotation:0},60,Ease.linear)
                .wait(100)
                .to({rotation:2},60,Ease.linear)
                .to({rotation:0},60,Ease.linear)

        }

    }

    //------------------------------o
    // reset car
    // reset rotations and other
    //------------------------------o
    public resetCarBody()
    {

        EventBus.removeEventListener(Data.EVENT_NITRO_END, this.resetCarBody, this);
        this.bounceTween.get(this._cBody)
            .to({rotation:0},200,Ease.linear)

        this.brakeLight(false);
    }

}





