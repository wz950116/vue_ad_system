var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/spreading/getPayResult',
        type: 'POST',
        data: params,
        contentType: 'application/json',
        withCredentials: true,
        complete: function (data) {
            fn(data);
        }
    });
};
