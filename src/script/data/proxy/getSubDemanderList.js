var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/headPageV2/agent/getInfo',
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};