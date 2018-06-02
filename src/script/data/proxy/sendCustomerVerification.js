var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('sendCustomerVerification', {
        url: $$domain + '/client/username/verify',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        fn(bdata);
    });
};
