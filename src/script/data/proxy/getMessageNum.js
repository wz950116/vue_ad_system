var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/message/getMessageNum',
        type: 'POST',
        data: {
            status: 0
        },
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};