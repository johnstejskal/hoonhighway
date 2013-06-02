var ObjectPool;
(function (ObjectPool) {
    ObjectPool.obstaclePool;
    ObjectPool.obstaclePool = [];
    ObjectPool.itemPool;
    ObjectPool.itemPool = [];
    function add(obj, pool) {
        pool.push(obj);
    }
    ObjectPool.add = add;
    function get(type) {
        var bm;
        if(type == 0) {
            bm = ObjectPool.obstaclePool[Math.ceil(Math.random() * ObjectPool.obstaclePool.length - 1)];
        } else if(type == 1) {
            bm = ObjectPool.itemPool[0];
        } else if(type == 2) {
            bm = ObjectPool.itemPool[1];
        }
        return bm;
    }
    ObjectPool.get = get;
})(ObjectPool || (ObjectPool = {}));
//@ sourceMappingURL=ObjectPool.js.map
