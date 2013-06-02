var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TitleScreen = (function (_super) {
    __extends(TitleScreen, _super);
    function TitleScreen(_x, _y, _parent, tType) {
        if (typeof _x === "undefined") { _x = 0; }
        if (typeof _y === "undefined") { _y = 0; }
        if (typeof _parent === "undefined") { _parent = Main.stage; }
        if (typeof tType === "undefined") { tType = null; }
        trace("TitleScreen inited");
        this.oContainer = new createjs.Container();
        Main.stage.addChild(this.oContainer);
        var _title = Assets.getAsset("gameTitle");
        _title.regX = _title.image.width / 2 | 0;
        _title.regY = _title.image.width / 2 | 0;
        _title.x = Data.stageWidth / 2;
        _title.y = -100;
        this.oContainer.addChild(_title);
        var _txStart = Assets.getAsset("txTouchToStart");
        _txStart.regX = _txStart.image.width / 2 | 0;
        _txStart.regY = _txStart.image.width / 2 | 0;
        _txStart.x = Data.stageWidth / 2;
        _txStart.y = 470;
        _txStart.alpha = 0;
        this.oContainer.addChild(_txStart);
        var _txAuthor = Assets.getAsset("txByJohn");
        _txAuthor.regX = _txAuthor.image.width / 2 | 0;
        _txAuthor.regY = _txAuthor.image.width / 2 | 0;
        _txAuthor.x = Data.stageWidth / 2;
        _txAuthor.y = 590;
        this.oContainer.addChild(_txAuthor);
        TweenLite.to(_title, .5, {
            y: 350
        });
        setTimeout(function () {
            doTween(_txStart);
        }, 2000);
function doTween(targ) {
            TweenLite.to(targ, .5, {
                alpha: 1,
                onComplete: function () {
                    TweenLite.to(targ, .5, {
                        alpha: 0,
                        onComplete: function () {
                            doTween(targ);
                        }
                    });
                }
            });
        }
        this.oContainer.addEventListener("click", handleClick);
function handleClick(e) {
            e.target.removeAllEventListeners();
            e.target.removeAllChildren();
            Main.startGame();
        }
    }
    return TitleScreen;
})(createjs.Bitmap);
//@ sourceMappingURL=TitleScreen.js.map
