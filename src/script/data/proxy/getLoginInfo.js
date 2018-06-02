var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').getDomain;

module.exports = function(fn) {
    $$combiner.clear();
    $$combiner.push('getLoginInfo', {
        url: $$domain('adv') + '/api/demander/info/header',
        type: 'POST',
        contentType: 'application/json'
    });
    $$combiner.request(function(bdata) {
        fn(bdata.getLoginInfo);
    });
};
