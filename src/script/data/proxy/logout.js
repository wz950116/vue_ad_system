var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('a', {
        url: $$domain + '/user/logout',
        type: 'POST',
        data: params
    });
    $$combiner.request(function (bdata) {
        fn(bdata.a);
    });
};
