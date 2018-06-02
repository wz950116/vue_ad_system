var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');
var $$util = require('../../lib/util.js');

module.exports = {
    // 获取计划列表
    getPlanList: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getPlanList' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取楼盘列表
    getEstateList: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getSpreadingContent' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取计划详情
    getAdPlanInfo: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getAdPlanInfo' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取平台信息
    getPlatFormList: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getPlatFormList' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取CPM资源列表
    getCPMResourceListByPlatForm: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getCPMResourceListByPlatForm' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 创建CPM订单
    createCpmOrder: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/addCpmOrder' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 修改CPM订单
    editCpmOrder: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/editCpmOrder' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取省市列表
    getProvinceList: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/provinceList' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取已购资源订单列表
    getAdResourceList: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getAdResourceList' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 删除已购资源
    delAdResource: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/delAdResource' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 开始支付
    startPay: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/startPay' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 支付
    pay: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/pay' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取cpm订单详情
    getCpmOrder: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getCpmOrder' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 链接预览
    getAutoContent: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/getAutoContent' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取支付结果
    getPayResult: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getPayResult' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 校验直播id等链接是否正确
    checkSupportType: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/checkSupportType' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 校验当前广告计划是否合法
    checkPlan: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/checkPlan' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 删除所有的cpd订单
    delUnPayedOrders: function (fn) {
        $$request.ajax({
            url: $$domain + '/spreading/delUnPayedOrders' + $$util.getCid(),
            type: 'POST',
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 获取广告出价底价
    getFloorPrice: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreading/getFloorPrice' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    },
    // 检验URL
    checkoutUrl: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/checkWebUrl' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        })
    }
};