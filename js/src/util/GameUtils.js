var GameUtils;
(function (GameUtils) {
    GameUtils.test = 10;
    function makeObjFlash(targ, speed, time) {
        if (typeof speed === "undefined") { speed = 50; }
        if (typeof time === "undefined") { time = 1; }
        var tween = createjs.Tween.get(targ).wait(100).to({
            alpha: 0
        }, speed, Ease.linear).wait(speed).to({
            alpha: 1
        }, speed, Ease.linear).wait(speed).to({
            alpha: 0
        }, speed, Ease.linear).wait(speed).to({
            alpha: 1
        }, speed, Ease.linear).wait(speed).to({
            alpha: 0
        }, speed, Ease.linear).wait(speed).to({
            alpha: 1
        }, speed, Ease.linear);
    }
    GameUtils.makeObjFlash = makeObjFlash;
})(GameUtils || (GameUtils = {}));
//@ sourceMappingURL=GameUtils.js.map
