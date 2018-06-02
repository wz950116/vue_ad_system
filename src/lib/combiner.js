var $$request = require('lib-request');

var $$filter = require('./filter.js');

var apiList = [];

var combiner = {
    clear: function (apiList) {
        apiList.length = 0;
    },
    push: function (apiList, name, params) {
        apiList.push({ name: name, params: params || {} });
    },
    request: function (apiList, fn) {
        var response = {};

        var check = function () {
            var i;
            for (i = 0; i < apiList.length; i++) {
                if (apiList[i].load === false) {
                    return;
                }
            }
            fn(response);
        };

        var ajax = function (api) {
            api.load = false;
            $$request.ajax({
                url: api.params.url,
                type: api.params.type,
                data: api.params.data,
                contentType: api.params.contentType,
                withCredentials: typeof api.params.withCredentials === 'undefined' ? true : api.params.withCredentials,
                complete: function (data) {
                    $$filter(data, api.params.url);
                    api.load = true;
                    response[api.name] = data || {};
                    check();
                }
            });
        };

        var i, api;
        for (i = 0; i < apiList.length; i++) {
            api = apiList[i];
            ajax(api);
        }
        if (apiList.length === 0) {
            check();
        }
    }
};


var factory = {
    create: function () {
        var apiList = [];
        var ncombiner = {
            clear: function () {
                combiner.clear(apiList);
            },
            push: function (name, params) {
                combiner.push(apiList, name, params);
            },
            request: function (fn) {
                combiner.request(apiList, fn);
            }
        };
        return ncombiner;
    },
    clear: function () {
        combiner.clear(apiList);
    },
    push: function (name, params) {
        combiner.push(apiList, name, params);
    },
    request: function (fn) {
        combiner.request(apiList, fn);
    }
};

module.exports = factory;
