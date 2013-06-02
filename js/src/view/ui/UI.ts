/**
 * Created with JetBrains WebStorm.
 * User: John Stejskal
 * Date: 9/05/13
 * Time: 3:42 PM
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="lib/defintelytyped/easeljs/easeljs.d.ts" />

class UI extends createjs.Bitmap {


    public _width:Number;

    public oContainer;
    private oDistanceUI:DistanceUI;
    private oPetrolUI:PetrolUI;


    private fpsLabel:createjs.Text;

    private txPetrol:createjs.Text;
    constructor()
    {
        trace("UI inited");
        this.oContainer = new createjs.Container();
        Main.stage.addChild(this.oContainer);


        this.oDistanceUI = new DistanceUI(530, 10, this.oContainer);
        this.oPetrolUI = new PetrolUI(20, 10, this.oContainer);

         // add a text object to output the current FPS:
        this.fpsLabel = new createjs.Text("-- fps", "bold 14px Arial", "#FFF");
        this.oContainer.addChild(this.fpsLabel);
        this.fpsLabel.x = 10;



    }

    public update()
    {
        this.fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";

    }

}





