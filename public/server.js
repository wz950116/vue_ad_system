var path = require('path');
var nodeServer = require('nodejs-server');
var opn = require('opn');

var root = path.join(__dirname, '..', "/dist");

var port = 5000;
var nserver = new nodeServer(root, port);


nserver.config({
    proxy: true
});


nserver.config({
    hot: true
});


nserver.config({
    allowExtension: [ '.woff', '.eot', '.cur', '.map', '.png', '.txt', '.swf' ]
});


nserver.config({
    proxyList: [
    {
        "rule": "^/api/(.*)",
        "remote": "http://adv.focus-dev.cn/api/$1",
        "proxyCookie": true
    },
    {
        "rule": "^/login/(.*)",
        "remote": "http://login.focustest.cn/login/$1",
        "proxyCookie": true
    },
    {
        "rule": "^/passport/(.*)",
        "remote": "http://login.focustest.cn/passport/$1",
        "proxyCookie": true
    },
    {
        "rule": "^/imgcode/(.*)",
        "remote": "http://login.focustest.cn/imgcode/$1",
        "proxyCookie": true
    },
    {
        "rule": "^/crossdomain.html",
        "remote": "http://login.focustest.cn/crossdomain.html",
        "proxyCookie": true
    },
    {
        "rule": "^/captcha/(.*)",
        "remote": "http://login.focustest.cn/captcha/$1",
        "proxyCookie": true
    }
]
});


nserver.config({
    allowExtension: [ '.woff' ]  // 开放文件通过
});

//服务器启动自动开启浏览器
var uri = 'http://127.0.0.1:' + port + "/index.html";
var autoOpenBrowser = true;

console.log('> Starting dev server...');
console.log('> Listening at ' + uri + '\n')
if (autoOpenBrowser) {
    opn(uri)
}

nserver.start();
var nconsole = new require('nodejs-console')('public/server.js');
nconsole.log('server running on port ' + port + '.');


