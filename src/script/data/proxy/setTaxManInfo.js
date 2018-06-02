var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/finance/setTaxpayerInfo/' + cid;
    } else {
        url = $$domain + '/finance/setTaxpayerInfo';
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
                data: {
                    list: '${data.data}'
                }
            });
            fn(res);
        }
    });
};
