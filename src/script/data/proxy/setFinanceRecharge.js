var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/finance/setFinanceRecharge/' + cid;
    } else {
        url = $$domain + '/finance/setFinanceRecharge';
    }
    $$request.ajax({
        url: url,
        type: 'POST',
        data: params,
        contentType: 'application/json',
        withCredentials: true,
        complete: function (data) {
            var res = $$match(data, {
                code: '${code}',
                msg: '${msg}',
                data: '${data}'
            });
            fn(res);
        }
    });
};
