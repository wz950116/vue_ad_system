var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var sendUrl = "";
    if (params.childId) {
        // 代理商子客
        sendUrl = $$domain + '/headPageV2/agent/getChildDetail/dayByDay';
    } else {
        // 直客
        sendUrl = $$domain + '/headPageV2/demander/getDetail/dayByDay';
    }
    $$request.ajax({
        url: sendUrl,
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};