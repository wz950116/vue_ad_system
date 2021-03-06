var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    $$combiner.clear();
    $$combiner.push('viewSubCustomer', {
        url: $$domain + '/client/view',
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (data) {
        fn(data.viewSubCustomer);
    });
};
