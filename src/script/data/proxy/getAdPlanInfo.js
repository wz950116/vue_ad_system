var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var routerPath = window.vueRouter.app._route;
    var cid = !!(routerPath.params.cid) ? '/' + routerPath.params.cid : '';
    $$combiner.clear();
    $$combiner.push('getAdPlanInfo', {
        url: $$domain + '/spreading/getAdPlanInfo' + cid,
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        fn(bdata.getAdPlanInfo);
    });
};
