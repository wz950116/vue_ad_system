// 这个文件主要是注入到浏览器，监听webpack-hot-middleware传过来的事件，如reload action，用于代码热更新等。
require('eventsource-polyfill')  // 兼容ie
var hotClient = require('webpack-hot-middleware/client?noInfo=true&path=/__webpack_hmr&timeout=10000&reload=true')
hotClient.subscribe(function(event) {
	if (event.action === 'reload') {
		window.location.reload();
	}
})