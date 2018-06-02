var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var url = '';
    if (params.childId) {
        url = $$domain + '/headPageV2/agent/getChildDetail/overall';
    } else {
        url = $$domain + '/headPageV2/demander/getDetail/overall';
    }
    $$request.ajax({
        url: url,
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};