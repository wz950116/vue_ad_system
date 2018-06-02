var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');


module.exports = function(params, fn) {
    var routerPath = window.vueRouter.app._route;
    var cid = !!(routerPath.params.cid) ? '/' + routerPath.params.cid : '';
    $$request.ajax({
        url: $$domain + '/spreading/startPay' + cid,
        type: 'POST',
        data: params,
        withCredentials: true,
        contentType: 'application/json',
        complete: function(data) {
            var res = $$match(data, {
                code: '${code}',
                msg: '${msg}',
                data: {
                    list: '${data.list}',
                    availableMoney: '${data.availableMoney}',
                    totalPrice: '${data.totalCost}',
                    totalHotCost: '${data.totalHotCost}',
                    cashAvailableMoney: '${data.cashAvailableMoney}',
                    creditAvailableMoney: '${data.creditAvailableMoney}',
                    totalNotHotCost:'${data.totalNotHotCost}',
                    grantCost: '${data.grantCost}',
                    phoneNum: '${data.phoneNum}',
                    isChild: '${data.isChild}'
                }
            });
            fn(res);
        }
    });
};
