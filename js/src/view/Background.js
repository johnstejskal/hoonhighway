var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(_x, _y, tType) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof tType === "undefined") { tType = null; }
        trace("Background inited");
        this.oContainer = new createjs.Container();
        Main.stage.addChild(this.oContainer);
        var sky = Assets.getAsset("sky");
        sky.scaleX = 10;
        sky.scaleY = 6;
        this.oContainer.addChild(sky);
        this._oCityHolder = new createjs.Container();
        var cityL = Assets.getAsset("cityScape");
        this._oCityHolder.addChild(cityL);
        var cityR = Assets.getAsset("cityScape");
        cityR.x = cityL.image.width;
        this._oCityHolder.addChild(cityR);
        this.oContainer.addChild(this._oCityHolder);
        this._oCityHolder.y = 155;
        this._oRoadHolder = new createjs.Container();
        var roadL = Assets.getAsset("roadBG");
        this._oRoadHolder.addChild(roadL);
        var roadR = Assets.getAsset("roadBG");
        roadR.x = roadL.image.width;
        this._oRoadHolder.addChild(roadR);
        this._oRoadHolder.y = Main.canvas.height - roadR.image.height;
        this.oContainer.addChild(this._oRoadHolder);
    }
    Background.prototype.update = function () {
        this._oRoadHolder.x -= Data.speed;
        if(this._oRoadHolder.x < -Data.stageWidth) {
            this._oRoadHolder.x = 0;
            Data.distance++;
            Data.petrol -= 1;
            EventBus.dispatch(Data.EVENT_DISTANCE_TICK);
        }
        this._oCityHolder.x -= .1 * Data.speed;
        if(this._oCityHolder.x < -Data.stageWidth) {
            this._oCityHolder.x = 0;
        }
    };
    Background.prototype.doSpeedBlur = function () {
        var oBlurContainer = new createjs.Container();
        var blur1 = Assets.getAsset("bgBlur1");
        oBlurContainer.addChild(blur1);
        var blur2 = Assets.getAsset("bgBlur2");
        oBlurContainer.addChild(blur2);
        var blur3 = Assets.getAsset("bgBlur3");
        oBlurContainer.addChild(blur3);
        this.oContainer.addChild(oBlurContainer);
        oBlurContainer.y = -10;
        var count = 1;
        var imgTick = 1;
        var tween = createjs.Tween.get(oBlurContainer).wait(0).to({
            alpha: 0
        }, 5, Ease.linear).to({
            alpha: 1
        }, 1000, Ease.linear);
        var int = self.setInterval(function () {
            Data.distance += 1;
            EventBus.dispatch(Data.EVENT_DISTANCE_TICK);
            if(imgTick > 3) {
                imgTick = 1;
            }
            if(imgTick == 1) {
                moveToTop(blur1);
            } else if(imgTick == 2) {
                moveToTop(blur2);
            } else {
                moveToTop(blur3);
            }
            imgTick++;
            count++;
            if(count > Data.nitroDuration) {
                var tween = createjs.Tween.get(oBlurContainer).to({
                    alpha: 0
                }, 300, Ease.linear).call(function () {
                    removeFromParent(oBlurContainer);
                    clearInterval(int);
                    EventBus.dispatch(Data.EVENT_NITRO_END);
                }, null, null);
            }
        }, 60);
    };
    return Background;
})(createjs.Bitmap);
//@ sourceMappingURL=Background.js.map
