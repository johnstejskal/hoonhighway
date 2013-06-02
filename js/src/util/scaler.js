/**
 * Created with JetBrains WebStorm.
 * User: John
 * Date: 5/26/13
 * Time: 11:23 PM
 * To change this template use File | Settings | File Templates.
 */

window.addEventListener(
    'load',
    function ()
    {
        var canvas = document.getElementsByTagName('canvas')[0];
        var loader = document.getElementById('preloader')[0];

            if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
                ){
                fullscreenify(canvas);
            }
            else
            {
                return;
            }


        fullscreenify(canvas);
        fullscreenify(loader);
    },
    false
);

function fullscreenify(canvas) {
    var style = canvas.getAttribute('style') || '';
    window.addEventListener('resize', function () {resize(canvas);}, false);

    resize(canvas);

    function resize(canvas) {
        var scale = {x: 1, y: 1};
        scale.x = (window.innerWidth) / canvas.width;
        scale.y = (window.innerHeight) / canvas.height;
        if (scale.x < 1 || scale.y < 1) {
            scale = '1, 2';
        } else if (scale.x < scale.y) {
            scale = scale.x + ', ' + scale.x;
        } else {
            scale = scale.y + ', ' + scale.y;
        }
        canvas.setAttribute('style', style + ' ' + '-ms-transform-origin: left top; -webkit-transform-origin: left top; -moz-transform-origin: left top; -o-transform-origin: left top; transform-origin: left top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
    }
}
