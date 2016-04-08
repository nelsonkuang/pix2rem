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
        var screenW = window.screen.width,
        dpr = window.devicePixelRatio;
        if (isMobile.UCBrowser() || (isMobile.MicroMessenger() && !isMobile.iPhone())) {//UC
            if (screenW > 610) {
                document.querySelector('html').style.fontSize = screenW / dpr / 10 + 'px';
            } else {
                document.querySelector('html').style.fontSize = screenW / 10 + 'px';
            }
            if (!isMobile.any()) {
                document.querySelector('html').style.fontSize = 75 + 'px';
            }
        } else if (isMobile.iPhone()) { //iphone
            document.querySelector('html').style.fontSize = screenW / 10 + 'px';

        } else if (isMobile.iPad()) {//ipad
            document.querySelector('html').style.fontSize = 75 + 'px';

        } else if (isMobile.any()) {
            if (screenW / 10 > 70) {//Mobile QQ 
                document.querySelector('html').style.fontSize = screenW / dpr / 10 + 'px';
            } else {
                document.querySelector('html').style.fontSize = screenW / 10 + 'px';
            }
        } else {
            if (window.innerWidth <= 750) {
                document.querySelector('html').style.fontSize = window.innerWidth / 10 + 'px';
            }
            else
                document.querySelector('html').style.fontSize = 75 + 'px';
        }
    }
    setMeta();

    window.onresize = function () {
        setMeta();
    };
})();
