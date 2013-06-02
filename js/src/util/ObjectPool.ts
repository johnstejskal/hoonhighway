/**
 * Created with JetBrains WebStorm.
 * User: John
 * Date: 5/22/13
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

module ObjectPool
{
    export var obstaclePool:Array;
    obstaclePool = [];

    export var itemPool:Array;
    itemPool = [];

    export function add(obj, pool:Array)
    {
         //add item to object pool
        pool.push(obj)

    }

    export function get(type:number):Bitmap
    {
        var bm:Bitmap;
        if(type == 0)
        bm = obstaclePool[Math.ceil(Math.random()*obstaclePool.length-1)];
        else if(type == 1)
        bm = itemPool[0];
        else if(type == 2)
        bm = itemPool[1];

        return bm
    }
}