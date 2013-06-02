/**
 * Created with JetBrains WebStorm.
 * User: John
 */


class Wheel extends createjs.Bitmap {


    public _width:Number;

    public oContainer;

    //------------------------------o
    // constructor
    //------------------------------o
    constructor(_x:Number = 0, _y:Number = 0, _parent = Main.stage, tType:string = null)
    {

        var bitmap = Assets.getAsset("carRim");
        bitmap.regX = bitmap.image.width/2|0;
        bitmap.regY = bitmap.image.width/2|0;

        this._width = bitmap.image.width;
        this.oContainer = new createjs.Container();
        this.oContainer.addChild(bitmap);
        this.oContainer.x = _x;
        this.oContainer.y = _y;
        _parent.addChild(this.oContainer);

    }

    public update()
    {
       this.oContainer.rotation += Data.speed;

    }

}





