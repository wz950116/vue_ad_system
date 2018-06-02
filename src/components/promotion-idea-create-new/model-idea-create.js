var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');
var $$util = require('../../lib/util.js');

module.exports = {
    // 获取楼盘列表和位置信息
    getEstateListAndPosLimit: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/getEstateListAndPosLimit' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
    getEstateListAndPosLimitWithIdeaDetail: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/getEstateListAndPosLimitWithIdeaDetail' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
    // 新建广告创意
    createAdIdea: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/createAdIdea' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
    // 链接预览
    getAutoContent: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/getAutoContent' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
    // 新建cpm广告创意
    createCpmAdIdea: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/createCpmAdIdea' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
    editAdIdea: function(params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/editAdIdea' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function(data) {
                fn(data);
            }
        });
    },
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
