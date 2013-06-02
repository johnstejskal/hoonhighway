var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DistanceUI = (function (_super) {
    __extends(DistanceUI, _super);
    function DistanceUI(_x, _y, _parent) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _parent === "undefined") { _parent = Main.stage; }
        trace("UI inited:" + _parent);
        this.oContainer = new createjs.Container();
        this.oContainer.x = _x;
        this.oContainer.y = _y;
        _parent.addChild(this.oContainer);
        var bgImage = Assets.getAsset("distanceBG");
        this.oContainer.addChild(bgImage);
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
        EventBus.addEventListener(Data.EVENT_DISTANCE_TICK, this.updateDistance, this);
    }
    DistanceUI.prototype.update = function () {
        this.txPetrol.text = "petrol " + Data.petrol;
    };
    DistanceUI.prototype.updateDistance = function (scope) {
        var dist = String(Data.distance);
        var lngth = dist.length;
        for(var i = 1; i <= 6; i++) {
            var n = i;
            var txt = eval("this.tx" + n);
            if(i <= lngth) {
                txt.text = dist.charAt(lngth - i);
            } else {
                txt.text = 0;
            }
        }
    };
    return DistanceUI;
})(createjs.Bitmap);
//@ sourceMappingURL=DistanceUI.js.map
