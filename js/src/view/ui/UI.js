var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UI = (function (_super) {
    __extends(UI, _super);
    function UI() {
        trace("UI inited");
        this.oContainer = new createjs.Container();
        Main.stage.addChild(this.oContainer);
        this.oDistanceUI = new DistanceUI(530, 10, this.oContainer);
        this.oPetrolUI = new PetrolUI(20, 10, this.oContainer);
        this.fpsLabel = new createjs.Text("-- fps", "bold 14px Arial", "#FFF");
        this.oContainer.addChild(this.fpsLabel);
        this.fpsLabel.x = 10;
    }
    UI.prototype.update = function () {
        this.fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
    };
    return UI;
})(createjs.Bitmap);
//@ sourceMappingURL=UI.js.map
