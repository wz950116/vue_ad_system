var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/finance/getUninvoicedValue/' + cid;
    } else {
        url = $$domain + '/finance/getUninvoicedValue';
    }
    $$combiner.clear();
    $$combiner.push('business', {
        url: url,
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        fn(bdata);
    });
};
