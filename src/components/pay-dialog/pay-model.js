var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');
var $$combiner = require('../../../lib/combiner.js');

module.exports = {
    /**
     * 获取充值结果
     */
    getChargeResult: function (params, fn) {
        var url = "";
        var cid = vueRouter.app._route.params.cid;
        if (cid) {
            url = $$domain + '/spreading/getPayResult/' + cid;
        } else {
            url = $$domain + '/spreading/getPayResult';
        }
        $$combiner.clear();
        $$combiner.push('getChargeResult', {
            url: url,
            type: 'POST',
            data: params,
            contentType: 'application/json'
        });
        $$combiner.request(function (bdata) {
            fn(bdata);
        });
    }
};