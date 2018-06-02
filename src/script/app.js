var proxy = require('./proxy.js');
var request = require('lib-request');

var mock = false;

var app = {
    getApi: function (url, params, fn) {
        if (mock === true) {
            request.ajax({
                url: url,
                data: params,
                type: 'GET',
                complete: function (data) {
                    typeof fn === 'function' && fn(data);
                }
            });
        } else {
            proxy(url, params, fn);
        }
    }
};

module.exports = app;
