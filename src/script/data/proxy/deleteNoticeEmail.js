var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;


module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/notification/settings/email/del/' + cid;
    } else {
        url = $$domain + '/notification/settings/email/del';
    }
    $$combiner.clear();
    $$combiner.push('delEmail', {
        url: url,
        type: 'POST',
        data: params,
        contentType: 'application/json'
    });
    $$combiner.request(function (bdata) {
        fn(bdata.delEmail);
    });
};
