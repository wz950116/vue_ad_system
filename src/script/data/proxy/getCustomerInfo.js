var $$combiner = require('../../../lib/combiner.js');
var $$match = require('../../../lib/match.js');
var $$domain = require('../../config.js').domain;
var $$request = require('lib-request');

module.exports = function (params, fn) {
    var routerPath = window.vueRouter.app._route;
    var cid = !!(routerPath.params.cid) ? '/' + routerPath.params.cid : '';
    $$request.ajax({
        url: $$domain + '/spreading/getDemanderInfo' + cid,
        type: 'POST',
        withCredentials: true,
        contentType: 'application/json',
        complete: function (data) {
            if (data.code === "200") {
                data.data.companyName = data.data.name || '';
                data.data.dataList = [];
                data.data.dataList.push({ name: '账户余额', value: data.data.balance || 0, uint: '元'});
                data.data.dataList.push({name: '今日账户消耗', value: data.data.today_cost || 0, uint: '元'});
                data.data.dataList.push({name: '今日曝光', value: data.data.today_exposure || 0, uint: '次'});
                data.data.dataList.push({name: '今日点击', value: data.data.today_click || 0, uint: '次'});
            }   
            fn(data);
        }
    });
};
