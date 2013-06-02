/**
 * Created with JetBrains WebStorm.
 * User: John
 */


class TitleScreen extends createjs.Bitmap {


    public _width:Number;

    public oContainer;
  //  private _title;
  //  private _txStart;
   // private _txAuthor;


    constructor(_x:Number = 0, _y:Number = 0, _parent = Main.stage, tType:string = null)
    {
        trace("TitleScreen inited");


       this.oContainer = new createjs.Container();
       Main.stage.addChild(this.oContainer);

        var _title = Assets.getAsset("gameTitle");
        _title.regX =  _title.image.width/2|0;
        _title.regY =  _title.image.width/2|0;
        _title.x = Data.stageWidth/2;
        _title.y = -100;
       this.oContainer.addChild(_title);

       var _txStart = Assets.getAsset("txTouchToStart");
        _txStart.regX = _txStart.image.width/2|0;
        _txStart.regY = _txStart.image.width/2|0;
        _txStart.x = Data.stageWidth/2;
        _txStart.y = 470;
        _txStart.alpha = 0;
        this.oContainer.addChild(_txStart);

       var _txAuthor = Assets.getAsset("txByJohn");
        _txAuthor.regX = _txAuthor.image.width/2|0;
        _txAuthor.regY = _txAuthor.image.width/2|0;
        _txAuthor.x = Data.stageWidth/2;
        _txAuthor.y = 590;
        this.oContainer.addChild(_txAuthor);

      // var tween = createjs.Tween.get(_title)
          //  .to({y:350},1500,Ease.linear);
        TweenLite.to(_title,.5, {y:350});
//        var tween2 = createjs.Tween.get(txStart)
//            .to({alpha:1},300,Ease.linear).wait(50)
//            .to({alpha:0},300,Ease.linear).wait(50)
//            .to({alpha:1},300,Ease.linear).wait(50)

          setTimeout(function(){ doTween(_txStart) }, 2000)




         function doTween(targ)
         {
        TweenLite.to(targ,.5, {alpha:1, onComplete:function(){

                    TweenLite.to(targ,.5, {alpha:0, onComplete:function(){
                        doTween(targ);
                    }})
              }})
         }


         this.oContainer.addEventListener("click", handleClick);

        function handleClick(e)
        {

            e.target.removeAllEventListeners();
            e.target.removeAllChildren();
            // this.oContainer.removeAllChildren();

             Main.startGame();


        }

    }







}





