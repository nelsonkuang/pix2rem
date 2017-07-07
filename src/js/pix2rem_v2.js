(function () {
    function setMeta() {
        var isMobile = {
            UCBrowser: function () {
                return navigator.userAgent.match(/UCBrowser/i);
            },
            MicroMessenger: function () {
                return navigator.userAgent.match(/MicroMessenger/i);
            },
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iPad: function () {
                return navigator.userAgent.match(/iPad/i);
            },
            iPhone: function () {
                return navigator.userAgent.match(/iPhone/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPod|iPad/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        var windowW = window.innerWidth > window.screen.width ? window.innerWidth : window.screen.width,
            dpr = window.devicePixelRatio,
            rootEl = document.querySelector('html'),
            viewportEl = document.querySelector('meta[name=viewport]');
        var scale = 1 / dpr;
        if (isMobile.any()) {
            if (isMobile.iPhone()) {
                windowW = window.screen.width * dpr;
            }
            rootEl.style.fontSize = windowW / 10 + 'px';
            rootEl.setAttribute('data-dpr', dpr);
            viewportEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        } else {
            rootEl.style.fontSize = '75px';
            rootEl.setAttribute('data-dpr', 1);
            viewportEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
        }
    }
    setMeta();

    window.onresize = function () {
        setMeta();
    };
})();
