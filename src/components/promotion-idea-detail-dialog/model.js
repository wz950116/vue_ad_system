var $$domain = require('../../script/config.js').domain;
var $$request = require('lib-request');
var $$util = require('../../lib/util.js');


module.exports = {
    // 获取创意详细信息
    getIdeaDetails: function (params, fn) {
        $$request.ajax({
            url: $$domain + '/spreadManage/getIdeaDetails' + $$util.getCid(),
            type: 'POST',
            data: params,
            withCredentials: true,
            contentType: 'application/json',
            complete: function (data) {
                fn(data);
            }
        });
    }
};