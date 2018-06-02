var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');
var $$util = require('../../../lib/util.js');


module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/spreading/searchAdResource' + $$util.getCid(),
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};
