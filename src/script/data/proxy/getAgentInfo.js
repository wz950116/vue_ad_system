var $$request = require('lib-request');
var $$domain = require('../../config.js').domain;

module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/headPageV2/agent/getInfo',
        type: 'POST',
        params: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};
