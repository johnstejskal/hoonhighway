/**
 * Created with JetBrains WebStorm.
 * User: John Stejskal
 * Date: 9/05/13
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */


class DistanceUI extends createjs.Bitmap {


    public _width:Number;

    public oContainer;


    public tx1:createjs.Text;
    public tx2:createjs.Text;
    public tx3:createjs.Text;
    public tx4:createjs.Text;
    public tx5:createjs.Text;
    public tx6:createjs.Text;
    public tx7:createjs.Text;


    private txPetrol:createjs.Text;
    constructor(_x:Number = 0, _y:Number = 0, _parent:Container = Main.stage)
    {

        trace("UI inited:"+_parent);
        this.oContainer = new createjs.Container();
        this.oContainer.x = _x;  this.oContainer.y = _y;
        _parent.addChild(this.oContainer);

        var bgImage = Assets.getAsset("distanceBG");
        this.oContainer.addChild(bgImage);
        /*
        for(var i = 1; i < 6; i++)
        {
            var ref = this.("tx"+i) ;
            ref = new createjs.Text("0", "bold 22px Arial", "#FFF");
            this.oContainer.addChild(ref);
            ref.tx1.x = 100 * i;
            ref.tx1.y = 5;
        } */


        this.tx1 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx1);
        this.tx1.x = 239;
        this.tx1.y = 5;

        this.tx2 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx2);
        this.tx2.x = 212;
        this.tx2.y = 5;

        this.tx3 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx3);
        this.tx3.x = 185;
        this.tx3.y = 5;

        this.tx4 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx4);
        this.tx4.x = 158;
        this.tx4.y = 5;

        this.tx5 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx5);
        this.tx5.x = 131;
        this.tx5.y = 5;

        this.tx6 = new createjs.Text("0", "bold 22px Arial", "#FFF");
        this.oContainer.addChild(this.tx6);
        this.tx6.x = 104;
        this.tx6.y = 5;
       // this.tx6.text = "8";

        EventBus.addEventListener(Data.EVENT_DISTANCE_TICK, this.updateDistance, this);
       // this.updateDistance(this);
    }

    public update()
    {

        this.txPetrol.text = "petrol "+Data.petrol;

    }


    public updateDistance(scope)
    {


        var dist:string = String(Data.distance);
        var lngth:number = dist.length;

        for(var i = 1; i <= 6; i++)
        {

          var n = i;
          var txt = eval("this.tx"+n);
          if(i <= lngth)
          txt.text = dist.charAt(lngth -i)
          else
           txt.text = 0;
        }

}

}





