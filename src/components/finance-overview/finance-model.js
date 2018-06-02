var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');

module.exports = {
    /**
     * 获取充值优惠
     */
    getDiscount: function (data, fn) {
        $$request.ajax({
            url: $$domain + '/finance/otherAmount',
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            data: data,
            complete: function (data) {
                fn(data);
            }
        });
    }
};