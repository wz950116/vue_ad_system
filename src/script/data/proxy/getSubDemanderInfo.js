var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var _ = require('../../../lib/underscore.v1.8.3.js');


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('a', {
        url: $$domain + '/headPageV2/agent/getInfo',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        _.extend(bdata.a, params);
        fn(bdata.a);
    });
};
