/**
 * Created with JetBrains WebStorm.
 * User: John Stejskal
 * Date: 9/05/13
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */


class PetrolUI extends createjs.Bitmap {


    public _width:Number;

    public oContainer;
    public _needleImage;
  //  public tx1:createjs.Text;
    constructor(_x:Number = 0, _y:Number = 0, _parent = Main.stage)
    {
        trace("PetrolUI inited");
        this.oContainer = new createjs.Container();
        this.oContainer.x = _x;  this.oContainer.y = _y;
        _parent.addChild(this.oContainer);

        var bgImage = Assets.getAsset("petrolGaugeBacking");
        this.oContainer.addChild(bgImage);

        this._needleImage = Assets.getAsset("gaugeNeedle");
        this._needleImage.regY = this._needleImage.image.height;
        this._needleImage.x = 75; this._needleImage.y = 85;
        this._needleImage.rotation = 58;
        this.oContainer.addChild(this._needleImage);


//        this.tx1 = new createjs.Text("0", "bold 22px Arial", "#FFF");
//        this.oContainer.addChild(this.tx1);
//        this.tx1.x = 239;
//        this.tx1.y = 5;


        EventBus.addEventListener(Data.EVENT_PETROL_TICK, this.update, this);
        EventBus.addEventListener(Data.EVENT_DISTANCE_TICK, this.update, this);

    }

    public update()
    {
        if(Data.petrol <= 0)
        return;

      //  this.tx1.text = "petrol "+Data.petrol;
     //   this._needleImage.rotation = 58 -(Data.maxPetrol-Data.petrol);

        var tween = createjs.Tween.get(this._needleImage)
            .to({rotation:58 -(Data.maxPetrol-Data.petrol)},100,Ease.linear)

    }


    public updateDistance(scope)
    {









}

}





