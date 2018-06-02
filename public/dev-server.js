var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var express = require('express');
var opn = require('opn');
var path = require('path');
var port = 5000;

var HotMiddleWareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
    Object.keys(webpackConfig.entry).forEach(function(name) {
        webpackConfig.entry[name] = [HotMiddleWareConfig].concat(webpackConfig.entry[name])
    })
}

// ------------------------ middleware ------------------------ //

// proxy
var proxyMiddleware = require('http-proxy-middleware');

// compiler
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    quiet: true,
    stats: {
        colors: true,
        chunks: false
    }
});

// hmr
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
});

// ------------------------ use ------------------------ //

var app = express();

// proxyList
var proxyList = {
    '/api': {
        target: 'http://adv.focus-dev.cn',
        changeOrigin: true
    },
    '/login': {
        target: 'http://login.focustest.cn',
        changeOrigin: true
    },
    '/passport': {
        target: 'http://login.focustest.cn',
        changeOrigin: true
    },
    '/imgcode': {
        target: 'http://login.focustest.cn',
        changeOrigin: true
    },
    '/crossdomain.html': {
        target: 'http://login.focustest.cn',
        changeOrigin: true
    }
};

Object.keys(proxyList).forEach(function(context) {
    app.use(proxyMiddleware(context, proxyList[context]))
});

// 记录当前路由 防止刷新后404
app.use(require('connect-history-api-fallback')());

// 挂载编译结果
app.use(devMiddleware);

// 挂载热重载中间件
app.use(hotMiddleware);


// 静态资源的路径
var staticPath = path.posix.join('/', 'static')
app.use(staticPath, express.static('./static'))

var uri = 'http://shengtai-admin-adv.focus-dev.cn:' + port;
var autoOpenBrowser = true;

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}


