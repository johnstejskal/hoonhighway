var Assets;
(function (Assets) {
    Assets.arrGameObjects;
    Assets.arrRequiredAssets;
    Assets.assetsLength;
    Assets.arrObstacles;
    Assets.arrGameObjects = [];
    Assets.arrObstacles = [];
    Assets.arrRequiredAssets = [
        "obstacle_car2.png", 
        "item_gasCan.png", 
        "obstacle_car3.png", 
        "carRim.png", 
        "roadBG.jpg", 
        "cityScape.png", 
        "car1.png", 
        "pole.png", 
        "ss_smoke.png", 
        "distanceBG.png", 
        "petrolGaugeBacking.png", 
        "gaugeNeedle.png", 
        "obstacle_roadCone.png", 
        "shadow.png", 
        "item_nitro.png", 
        "bgBlur1.jpg", 
        "bgBlur2.jpg", 
        "bgBlur3.jpg", 
        "brakeLight.png", 
        "speechBubble.png", 
        "sky.jpg", 
        "txByJohn.png", 
        "txTouchToStart.png", 
        "gameTitle.png"
    ];
    function loadAssets() {
        var lgth = this.arrRequiredAssets.length;
        for(var i = 0; i < lgth; i++) {
            var fileName = this.arrRequiredAssets[i];
            var arrSplit = fileName.split('.');
            var img = new Image();
            img.name = arrSplit[0];
            img.src = "assets/" + fileName;
            img.onload = assetLoad;
        }
    }
    Assets.loadAssets = loadAssets;
    function assetLoad(e) {
        trace("asset loaded" + e.target.name);
        var image = e.target;
        var bitmap;
        bitmap = new createjs.Bitmap(image);
        bitmap.name = e.target.name;
        Assets.arrGameObjects.push(image);
        if(bitmap.name.indexOf("obstacle") > -1 || bitmap.name.indexOf("item") > -1) {
            Assets.arrObstacles.push(image);
        }
        var perc = (Assets.arrGameObjects.length / Assets.arrRequiredAssets.length) * 1;
        perc = perc * 80;
        $('#preloadBar').animate({
            width: perc
        }, 100);
        if(Assets.arrGameObjects.length == Assets.arrRequiredAssets.length) {
            Assets.assetsLength = Assets.arrGameObjects.length;
            document.getElementById('preloader').style.visibility = 'hidden';
            Main.constructGame();
        }
    }
    function getAsset(name) {
        var bitmap;
        for(var i = 0; i < Assets.arrGameObjects.length; i++) {
            if(name == Assets.arrGameObjects[i].name) {
                bitmap = new createjs.Bitmap(Assets.arrGameObjects[i]);
                return bitmap;
            }
        }
        return bitmap;
    }
    Assets.getAsset = getAsset;
})(Assets || (Assets = {}));
//@ sourceMappingURL=Assets.js.map
