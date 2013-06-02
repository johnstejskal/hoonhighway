var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PetrolUI = (function (_super) {
    __extends(PetrolUI, _super);
    function PetrolUI(_x, _y, _parent) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _parent === "undefined") { _parent = Main.stage; }
        trace("PetrolUI inited");
        this.oContainer = new createjs.Container();
        this.oContainer.x = _x;
        this.oContainer.y = _y;
        _parent.addChild(this.oContainer);
        var bgImage = Assets.getAsset("petrolGaugeBacking");
        this.oContainer.addChild(bgImage);
        this._needleImage = Assets.getAsset("gaugeNeedle");
        this._needleImage.regY = this._needleImage.image.height;
        this._needleImage.x = 75;
        this._needleImage.y = 85;
        this._needleImage.rotation = 58;
        this.oContainer.addChild(this._needleImage);
        EventBus.addEventListener("evt_petrol", this.update, this);
        EventBus.addEventListener("evt_distance", this.update, this);
    }
    PetrolUI.prototype.update = function () {
        if(Data.petrol <= 0) {
            return;
        }
        var tween = createjs.Tween.get(this._needleImage).to({
            rotation: 58 - (Data.maxPetrol - Data.petrol)
        }, 100, Ease.linear);
    };
    PetrolUI.prototype.updateDistance = function (scope) {
    };
    return PetrolUI;
})(createjs.Bitmap);
//@ sourceMappingURL=PetrolUI.js.map
