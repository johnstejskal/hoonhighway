/**
 * Author: John Stejskal
 */


module Data {


   export var score:number = 0;
   export var speed:number = 0;
   export var maxSpeed:number = 20;
   export var distance:number = 0;
   export var petrol:number = 100;
   export var maxPetrol:number = 100;
   export var stageWidth:number = 800;
   export var stageHeight:number = 500;
   export var isBounceAllowed:bool = true;
   export var nitroDuration:number = 30;



   export var arrMGMap:Array =     [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0];
   export var arrLevelType:Array = [1,0,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0];
   export var arrLevelMap:Array =  [1,1,1,2,0,0,1,2,1,2,1,1,2,2,0,1,0,2,2,1,2,1,2,1,0,2,1,1,1,2,2,2,1,2,1];
   export var arrLevelMapLength:number = arrLevelMap.length;




}




