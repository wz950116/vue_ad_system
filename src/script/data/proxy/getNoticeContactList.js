var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/notification/settings/list/' + cid;
    } else {
        url = $$domain + '/notification/settings/list';
    }
    $$combiner.clear();
    $$combiner.push('noticeInfo', {
        url: url,
        type: 'POST',
        data: params
    });
    $$combiner.request(function (bdata) {
        fn(bdata.noticeInfo);
    });
};
