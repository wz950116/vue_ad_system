var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/demander/info/salescode/submit/' + cid;
    } else {
        url = $$domain + '/demander/info/salescode/submit';
    }
    $$combiner.clear();
    $$combiner.push('addPromotionCode', {
        url: url,
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        fn(bdata.addPromotionCode);
    });
};
