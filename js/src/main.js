$(document).ready(function () {
    console.log("All scripts ready");
    Main.init();
});
var Main;
(function (Main) {
    Main.stage;
    Main.canvas;
    var update;
    var oCar;
    var oBg;
    var oUI;
    var oTitleScreen;
    var stageWidth;
    var stageHeight;
    Main.levelMapCount = 0;
    var rightYPos = 330;
    var leftYPos = 260;
    var middleYPos = 295;
    var speedCount = 0;
    var speedTimer = 10;
    var obstacleInterval = 0;
    var maxObstacleTimer = 200;
    var minObstacleTimer = 50;
    var obstacleTimer = 200;
    var currentPos = "right";
    var lastPos;
    var arrObstaclePool;
    var arrCurrLane;
    var arrleftLane;
    var arrRightLane;
    var gameInPlay = false;
    var objRef;
    var isChangineLanes = false;
    var isColling = false;
    var isCollisionRecover = false;
    var speedPerc;
    var isItemCollected = false;
    var isObstacleInPlay = false;
    var isNitro = false;
    var currObjectLane;
    function init() {
        arrObstaclePool = [];
        arrObstaclePool.push("car2", "car3");
        arrleftLane = [];
        arrRightLane = [];
        arrCurrLane = [];
        Main.canvas = document.getElementById("demoCanvas");
        Main.stage = new createjs.Stage("demoCanvas");
        stageWidth = Main.canvas.width;
        stageHeight = Main.canvas.height;
        createjs.Touch.enable(Main.stage);
        Main.stage.enableMouseOver(10);
        Main.stage.mouseMoveOutside = true;
        Assets.loadAssets();
    }
    Main.init = init;
    function constructGame() {
        trace("Main: constructGame()");
        oBg = new Background();
        oTitleScreen = new TitleScreen();
        for(var i = 0; i < Assets.arrObstacles.length; i++) {
            var obj = new createjs.Bitmap(Assets.arrObstacles[i]);
            obj.name = Assets.arrObstacles[i].name;
            obj.regX = 0;
            obj.regY = obj.image.height;
            if(obj.name.indexOf("obstacle") > -1) {
                ObjectPool.add(obj, ObjectPool.obstaclePool);
            } else if(obj.name.indexOf("item") > -1) {
                ObjectPool.add(obj, ObjectPool.itemPool);
            }
        }
        EventBus.addEventListener(Data.EVENT_NITRO_END, nitroEnd);
        Main.stage.update();
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", gameLoop);
    }
    Main.constructGame = constructGame;
    function startGame() {
        console.log("Main: startGame()");
        oCar = new Car();
        oCar.oContainer.x = 20;
        oCar.oContainer.y = rightYPos;
        oUI = new UI();
        oCar.brakeLight(false);
        Main.stage.onPress = function (e) {
            changeCarPos();
        };
        gameInPlay = true;
        setTimeout(function () {
            initNextObstacle();
        }, 500);
    }
    Main.startGame = startGame;
    function gameLoop() {
        Main.stage.update();
        if(!gameInPlay) {
            return;
        }
        oUI.update();
        oBg.update();
        oCar.update();
        if(Data.speed < 3) {
            Data.isBounceAllowed = true;
        } else {
            Data.isBounceAllowed = false;
        }
        if(Data.speed < 5) {
            speedTimer = 10;
        }
        if(Data.speed < 10) {
            speedTimer = 50;
        } else {
            speedTimer = 200;
        }
        if(speedCount >= speedTimer) {
            speedCount = 0;
            if(Data.speed < Data.maxSpeed) {
                Data.speed += 1;
            }
            if(obstacleTimer > 50) {
                obstacleTimer -= 5;
            }
        } else {
            speedCount++;
        }
        moveObjects();
    }
    function initNextObstacle() {
        if(isNitro || arrCurrLane.length > 0) {
            return;
        }
        Main.levelMapCount++;
        if(Main.levelMapCount >= Data.arrLevelMapLength) {
            Main.levelMapCount = 0;
        }
        createObstacles(Data.arrLevelMap[Main.levelMapCount], Data.arrLevelType[Main.levelMapCount]);
    }
    function changeCarPos() {
        if(isColling || Data.speed < 2) {
            return;
        }
        oCar.showWheelSmoke();
        if(oCar.oContainer.y == rightYPos) {
            currentPos = "right";
        }
        if(oCar.oContainer.y == leftYPos) {
            currentPos = "left";
        }
        if(currentPos == "right") {
            oCar.oContainer.skewY = -4;
            if(arrRightLane.length > 0) {
                moveToTop(arrRightLane[0]);
            }
            currentPos = "changing";
            lastPos = "right";
            TweenLite.to(oCar.oContainer, .2, {
                scaleX: .9,
                y: middleYPos,
                onComplete: function () {
                    TweenLite.to(oCar.oContainer, .1, {
                        skewY: 0,
                        x: 20,
                        y: leftYPos,
                        scaleX: 0.8,
                        scaleY: 0.8,
                        onComplete: function () {
                            currentPos = "left";
                            isChangineLanes = false;
                            oCar.hideWheelSmoke();
                        }
                    });
                }
            });
        } else if(currentPos == "left") {
            oCar.oContainer.skewY = 2;
            currentPos = "changing";
            lastPos = "left";
            moveToTop(oCar.oContainer);
            if(arrRightLane.length > 0) {
                moveToTop(arrRightLane[0]);
            }
            TweenLite.to(oCar.oContainer, .1, {
                scaleX: .9,
                y: middleYPos,
                onComplete: function () {
                    TweenLite.to(oCar.oContainer, .2, {
                        skewY: 0,
                        x: 20,
                        y: rightYPos,
                        scaleX: 1,
                        scaleY: 1,
                        onComplete: function () {
                            currentPos = "right";
                            isChangineLanes = false;
                            oCar.hideWheelSmoke();
                        }
                    });
                }
            });
        } else {
            TweenLite.killTweensOf(oCar);
            if(lastPos == "left") {
                currentPos = "right";
            } else if(lastPos == "right") {
                currentPos = "left";
            }
            changeCarPos();
        }
    }
    function createObstacles(lane, type) {
        if(isNitro) {
            return;
        }
        if(lane == 0 || arrCurrLane.length < 0) {
            setTimeout(function () {
                initNextObstacle();
            }, 1000);
            return;
        }
        var rndmLane = lane - 1;
        var posYarr = [
            [
                385, 
                .8
            ], 
            [
                480, 
                1
            ]
        ];
        var cObj = new createjs.Container();
        var obj = ObjectPool.get(type);
        cObj.name = obj.name;
        cObj.addChild(obj);
        cObj.x = 1000;
        cObj.y = posYarr[rndmLane][0];
        cObj.scaleX = cObj.scaleY = posYarr[rndmLane][1];
        Main.stage.addChild(cObj);
        if(lane == 1) {
            arrleftLane.push(cObj);
            arrCurrLane = arrleftLane;
            currObjectLane = "left";
            moveToTop(oCar.oContainer);
        } else if(lane == 2) {
            arrRightLane.push(cObj);
            arrCurrLane = arrRightLane;
            currObjectLane = "right";
        }
    }
    function collect(item, ref) {
        switch(item) {
            case "item_gasCan":
                Data.petrol += 10;
                if(Data.petrol > Data.maxPetrol) {
                    Data.petrol = Data.maxPetrol;
                }
                EventBus.dispatch(Data.EVENT_PETROL_TICK);
                setTimeout(function () {
                    initNextObstacle();
                }, 500);
                break;
            case "item_nitro":
                oCar.doNitro();
                oBg.doSpeedBlur();
                isNitro = true;
                break;
        }
        removeFromParent(ref);
        isObstacleInPlay = false;
    }
    function collision(impactType) {
        if (typeof impactType === "undefined") { impactType = "major"; }
        if(isColling) {
            return;
        }
        isColling = true;
        objRef = arrCurrLane[0];
        Data.isBounceAllowed = false;
        TweenLite.killTweensOf(oCar.oContainer);
        if(impactType == "minor") {
            oCar.doCollision("minor");
            TweenLite.to(objRef, .5, {
                x: 130,
                y: -30,
                rotation: "-200",
                onComplete: function () {
                    objRef.rotation = 0;
                    removeFromParent(objRef);
                    arrCurrLane.splice(0, 1);
                    isColling = false;
                    oCar.resetCarBody();
                    setTimeout(function () {
                        initNextObstacle();
                    }, 500);
                }
            });
            Data.speed = 2;
        } else {
            Data.speed = 0;
            isCollisionRecover = true;
            gameInPlay = false;
            oCar.doCollision("major");
            TweenLite.to(objRef, .3, {
                x: "+=40",
                onComplete: function () {
                    var speechBubble = Assets.getAsset("speechBubble");
                    speechBubble.y = -270;
                    speechBubble.x = 110;
                    setTimeout(function () {
                        objRef.addChild(speechBubble);
                    }, 200);
                    setTimeout(function () {
                        removeFromParent(speechBubble);
                    }, 3000);
                }
            });
            TweenLite.to(oCar.oContainer, .1, {
                rotation: -5,
                y: "-=10",
                x: "-=50",
                onComplete: function () {
                    TweenLite.to(oCar.oContainer, .1, {
                        rotation: 0,
                        y: "+=10",
                        onComplete: function () {
                            setTimeout(function () {
                                resetCar(currObjectLane);
                                gameInPlay = true;
                            }, 700);
                        }
                    });
                }
            });
        }
    }
    function resetCar(lane) {
        if(lane == "left") {
            oCar.oContainer.y = rightYPos;
            currentPos = "right";
            oCar.oContainer.scaleX = 1;
            oCar.oContainer.scaleY = 1;
        } else {
            oCar.oContainer.y = leftYPos;
            currentPos = "left";
            oCar.oContainer.scaleX = 0.8;
            oCar.oContainer.scaleY = 0.8;
        }
        oCar.oContainer.x = 20;
        GameUtils.makeObjFlash(oCar.oContainer);
        setTimeout(function () {
            isColling = false;
            Data.isBounceAllowed = true;
            oCar.bounceCar();
        }, 1000);
    }
    function moveObjects() {
        objRef = arrCurrLane[0];
        if(objRef == null) {
            return;
        }
        objRef.x -= Data.speed;
        if(objRef.x < -250) {
            objRef.parent.removeChild(objRef);
            isObstacleInPlay = false;
            arrCurrLane.splice(0, 1);
            initNextObstacle();
        } else if(objRef.x < 250 && objRef.x > 30 && currentPos == currObjectLane) {
            switch(objRef.name) {
                case "item_gasCan":
                    arrCurrLane.splice(0, 1);
                    collect("item_gasCan", objRef);
                    break;
                case "item_nitro":
                    arrCurrLane.splice(0, 1);
                    collect("item_nitro", objRef);
                    break;
                case "obstacle_roadCone":
                    collision("minor");
                    break;
                default:
                    collision();
            }
        }
    }
    function nitroEnd() {
        isNitro = false;
        initNextObstacle();
    }
})(Main || (Main = {}));
//@ sourceMappingURL=main.js.map
