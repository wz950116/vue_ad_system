var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    $$request.ajax({
        url: $$domain + '/spreadManage/getChildGuestList',
        type: 'POST',
        data: '',
        contentType: 'application/json',
        withCredentials: true,
        complete: function (data) {
            data.data.list = data.data;
            fn(data);
        }
    });
};
