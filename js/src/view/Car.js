var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(_x, _y, tType) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof tType === "undefined") { tType = null; }
        this.oContainer = new createjs.Container();
        this._cBody = new createjs.Container();
        this._imgShadow = Assets.getAsset("shadow");
        this._imgShadow.y = 135;
        this._imgShadow.x = -10;
        this.oContainer.addChild(this._imgShadow);
        this.oBackWheel = new Wheel(59, 111, this.oContainer);
        this.oContainer.addChild(this.oBackWheel);
        this.oContainer.x = 500;
        this.oFrontWheel = new Wheel(235, 111, this.oContainer);
        this.oContainer.addChild(this.oFrontWheel);
        this.oContainer.x = 500;
        var _imgBody = Assets.getAsset("car1");
        this._cBody.addChild(_imgBody);
        this._imgbrakeLight = Assets.getAsset("brakeLight");
        this._imgbrakeLight.x = -33;
        this._imgbrakeLight.y = 10;
        this._cBody.addChild(this._imgbrakeLight);
        this.oContainer.addChild(this._cBody);
        Main.stage.addChild(this.oContainer);
        var ssSmoke = Assets.getAsset("ss_smoke");
        var spriteSheetIdle = new createjs.SpriteSheet({
            images: [
                ssSmoke.image
            ],
            frames: {
                width: 78,
                height: 131,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [
                    0, 
                    3, 
                    "idle", 
                    1
                ]
            }
        });
        this._framesSmoke = new createjs.BitmapAnimation(spriteSheetIdle);
        this._framesSmoke.name = "wheelSmoke";
        this._framesSmoke.x = 5;
        this._framesSmoke.y = 15;
        this.bounceTween = createjs.Tween;
        this.oContainer.addChild(this._framesSmoke);
        this.hideWheelSmoke();
        this.bounceCar();
    }
    Car.prototype.brakeLight = function (value) {
        this._imgbrakeLight.visible = value;
    };
    Car.prototype.showWheelSmoke = function () {
        if(Data.speed < 5) {
            return;
        }
        this._framesSmoke.visible = true;
        this._framesSmoke.gotoAndPlay("wheelSmoke");
    };
    Car.prototype.hideWheelSmoke = function () {
        this._framesSmoke.gotoAndStop(0);
        this._framesSmoke.visible = false;
    };
    Car.prototype.update = function () {
        this.oBackWheel.update();
        this.oFrontWheel.update();
    };
    Car.prototype.bounceCar = function () {
        if(!Data.isBounceAllowed) {
            return;
        }
        this.bounceTween.get(this._cBody).wait(40).to({
            y: 1
        }, 50, Ease.linear).wait(40).to({
            y: 0
        }, 50, Ease.linear).call(this.bounceCar, null, this);
    };
    Car.prototype.doNitro = function () {
        EventBus.addEventListener(Data.EVENT_NITRO_END, this.resetCarBody, this);
        this.bounceTween.get(this._cBody).to({
            rotation: -1
        }, 300, Ease.linear);
    };
    Car.prototype.doCollision = function (impactType) {
        if (typeof impactType === "undefined") { impactType = "major"; }
        if(impactType == "minor") {
            this.brakeLight(true);
            this.bounceTween.get(this._cBody).to({
                rotation: 1
            }, 200, Ease.linear);
        } else {
            this.bounceTween.get(this._cBody).to({
                rotation: -2
            }, 60, Ease.linear).to({
                rotation: 0
            }, 60, Ease.linear).wait(100).to({
                rotation: 2
            }, 60, Ease.linear).to({
                rotation: 0
            }, 60, Ease.linear);
        }
    };
    Car.prototype.resetCarBody = function () {
        EventBus.removeEventListener(Data.EVENT_NITRO_END, this.resetCarBody, this);
        this.bounceTween.get(this._cBody).to({
            rotation: 0
        }, 200, Ease.linear);
        this.brakeLight(false);
    };
    return Car;
})(createjs.Bitmap);
//@ sourceMappingURL=Car.js.map
