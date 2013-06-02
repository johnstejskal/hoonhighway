var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(_x, _y, _parent, tType) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _parent === "undefined") { _parent = Main.stage; }
        if (typeof tType === "undefined") { tType = null; }
        var bitmap = Assets.getAsset("carRim");
        bitmap.regX = bitmap.image.width / 2 | 0;
        bitmap.regY = bitmap.image.width / 2 | 0;
        this._width = bitmap.image.width;
        this.oContainer = new createjs.Container();
        this.oContainer.addChild(bitmap);
        this.oContainer.x = _x;
        this.oContainer.y = _y;
        _parent.addChild(this.oContainer);
    }
    Wheel.prototype.update = function () {
        this.oContainer.rotation += Data.speed;
    };
    return Wheel;
})(createjs.Bitmap);
//@ sourceMappingURL=Wheel.js.map
