var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var url = "";
    var cid = vueRouter.app._route.params.cid;
    if (cid) {
        url = $$domain + '/finance/setInvoice/' + cid;
    } else {
        url = $$domain + '/finance/setInvoice';
    }
    var type = (params.type === 'normal') ? '0' : '1';
    var data = {
        "type": type,
        "title": params.invoiceHeader,
        "amount": params.invoiceMoney,
        "contactName": params.invoiceContacts,
        "contactAddr": params.invoiceAddress,
        "contactPhone": params.invoiceTel
    };
    $$request.ajax({
        url: url,
        type: 'POST',
        data: data,
        withCredentials: true,
        contentType: 'application/json',
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
