var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    if (params && params.status === 0) {
        delete params.status;
    }
    $$combiner.clear();
    $$combiner.push('a', {
        url: $$domain + '/headPage/agent/searchChildGuest',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        var data = bdata.a;
        data.data = data.data || {};
        data.data.list = data.data && data.data.list || [];
        fn(data);
    });
};
