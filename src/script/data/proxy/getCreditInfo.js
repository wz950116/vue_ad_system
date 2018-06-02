var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function(params, fn) {
    $$request.ajax({
        url: $$domain + '/credit/getCreditInfo',
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function(data) {
            fn(data);
        }
    });
};
