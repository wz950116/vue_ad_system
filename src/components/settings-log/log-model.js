var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');
module.exports = {
    getOperatorList: function (fn) {
        $$request.ajax({
            url: $$domain + '/operationHistory/index',
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    getTableList: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/operationHistory/details',
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    }
};