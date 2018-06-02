var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    $$request.ajax({
        url: '//house-sv-base.focus.cn/city/province',
        type: 'GET',
        data: params,
        withCredentials: false,
        contentType: 'application/json',
        complete: function (data) {
            fn(data);
        }
    });
};
