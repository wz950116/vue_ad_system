var $$combiner = require('../../../lib/combiner.js').create();
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('a', {
        url: $$domain + '/headPage/adDemander/getStaticInfo',
        type: 'POST',
        data: {}
    });
    $$combiner.request(function (bdata) {
        fn(bdata.a);
    });
};
