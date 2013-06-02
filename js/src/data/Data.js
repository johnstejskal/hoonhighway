var Data;
(function (Data) {
    Data.score = 0;
    Data.speed = 0;
    Data.maxSpeed = 20;
    Data.distance = 0;
    Data.petrol = 100;
    Data.maxPetrol = 100;
    Data.stageWidth = 800;
    Data.stageHeight = 500;
    Data.isBounceAllowed = true;
    Data.nitroDuration = 30;
    Data.arrMGMap = [
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        1, 
        1, 
        1, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        1, 
        1, 
        1, 
        1, 
        0, 
        0
    ];
    Data.arrLevelType = [
        1, 
        0, 
        0, 
        2, 
        0, 
        0, 
        1, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        2, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        2, 
        0, 
        0, 
        0, 
        0
    ];
    Data.arrLevelMap = [
        1, 
        1, 
        1, 
        2, 
        0, 
        0, 
        1, 
        2, 
        1, 
        2, 
        1, 
        1, 
        2, 
        2, 
        0, 
        1, 
        0, 
        2, 
        2, 
        1, 
        2, 
        1, 
        2, 
        1, 
        0, 
        2, 
        1, 
        1, 
        1, 
        2, 
        2, 
        2, 
        1, 
        2, 
        1
    ];
    Data.arrLevelMapLength = Data.arrLevelMap.length;
})(Data || (Data = {}));
//@ sourceMappingURL=Data.js.map