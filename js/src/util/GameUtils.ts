/**
 * Created with JetBrains WebStorm.
 * User: John
 * Date: 5/22/13
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

module GameUtils
{

    //TODO Optimize flash method, change tweening system.

    export var test:number = 10;
    export function makeObjFlash(targ, speed = 50, time = 1)
    {
        var tween = createjs.Tween.get(targ).wait(100)
            .to({alpha:0},speed,Ease.linear)
            .wait(speed)
            .to({alpha:1},speed,Ease.linear)
            .wait(speed)
            .to({alpha:0},speed,Ease.linear)
            .wait(speed)
            .to({alpha:1},speed,Ease.linear)
            .wait(speed)
            .to({alpha:0},speed,Ease.linear)
            .wait(speed)
            .to({alpha:1},speed,Ease.linear)
           //.call(function(){trace("finished tween")});
    }





}