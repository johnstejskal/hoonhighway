/**
 * Created with JetBrains WebStorm.
 * User: John
 * Date: 5/11/13
 * Time: 7:55 PM
 * To change this template use File | Settings | File Templates.
 */
//---------------------------------------------o
// Utilities
//---------------------------------------------o
function trace(output)
{
    console.log(output);
}

function moveToTop(mc)
{

    mc.parent.setChildIndex(mc, mc.parent.getNumChildren()-1);
}

function removeFromParent(mc)
{
    if(mc.parent != null)
    mc.parent.removeChild(mc);
}

