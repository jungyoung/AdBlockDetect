/*Siwoo block*/
var AdBlockDetect = (function(window) {
    var global = {};
    global.config = {
        'version': '1.0.0',
        'adUrl': 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        'adBlock': false,
        'scriptId': 'adBlockDetect' + new Date().getMilliseconds()
    };

    var func = {};
    func.callScript = function(url, callback) {
        if (!url) {
            return;
        }
        var callbackFunc = function() {
            global.config.adBlock = (func.isAdObject()) ? false : true;
            callback();
            func.deleteScript(global.config.scriptId);
        }
        var script = document.createElement('script');
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    callbackFunc();
                }
            };
        } else {
            script.onload = callbackFunc;
        }
        script.onerror = callbackFunc;
        script.type = 'text/javascript';
        script.async = !0;
        script.id = global.config.scriptId;
        script.src = '//' + url;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(script, x);
    }
    func.deleteScript = function(id) {
        var deleteElement = document.getElementById(id)
        deleteElement.parentNode.removeChild(deleteElement);
    }
    func.addEvent = function(event, element, callback) {
        if (element.addEventListener) {
            element.addEventListener(event, callback, false);
        } else {
            element.attachEvent('on' + event, callback);
        }
    }
    func.isAdObject = function() {
        return (window.adsbygoogle) ? true : false;
    }

    var detect = {};
    detect.init = function(callback) {
        if (func.isAdObject()) {
            callback(global.config.adBlock);
        } else {
            func.callScript(global.config.adUrl, function() {
                callback(global.config.adBlock);
            });
        }
    }
    return window.AdBlockDetect || function(callback) {
        detect.init(callback);
    }
})(window);
