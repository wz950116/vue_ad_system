var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function (params, fn) {
    var newParams = {
        id: parseInt(params.orderId)
    };
    $$request.ajax({
        url: $$domain + '/spreadManage/deleteAdUnit',
        type: 'POST',
        data: newParams,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};
