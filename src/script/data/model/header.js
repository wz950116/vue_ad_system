/**
 * Created by ruiguo208494 on 2016/11/21.
 */
var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var under = require('../../../lib/underscore.v1.8.3.js');
var $$assert = require('../../../lib/assert.js');
var $$config = require('../../config.js');

var _ = under;
var model = new $$model({});

var cacheData = {
    demander: null,
    subCustomer: false
};

_.extend(model, {
    getCacheData: function () {
        return cacheData;
    },
    /**
     * 获取共用头部信息
     * @param cid 公司id 可选
     */
    getHeaderInfo: function (data, fn) {
        $$assert(data, {
            cid: 's,r'
        });

        if (cacheData.demander) {
            model.trigger('getHeaderInfo', cacheData.demander);
            fn && fn(cacheData.demander);
            return;
        }

        $$app.getApi('/api/getHeaderInfo.json', '', function (res) {
            model.trigger('getHeaderInfo', res);

            if (res.code == 200) {
                cacheData.demander = res;
            }

            fn && fn(res);
        });
    },
    /**
     * 获取公司信息
     * @param cid 公司id 可选
     */
    getCustomerInfo: function (data, fn) {
        $$assert(data, {
            cid: 's,r'
        });
        $$app.getApi('/api/getCustomerInfo.json', '', function (res) {
            model.trigger('getCustomerInfo', res);

            if (res.code == 200) {
                cacheData.subCustomer = {};
                _.extend(cacheData.subCustomer, res.data);
            }

            fn && fn(res);
        });
    },
    getCid: function (cid) {
        model.trigger('getCid', cid);
    },
    inTab: function () {
        model.trigger('inTab');
    },
    /**
     * 获取消息列表
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getMessageList: function (data, fn) {
        var params = data;
        $$assert(data, {
            status: 'n,r',
            limit: 'n',
            pageIndex: 'n'
        });
        $$app.getApi('/api/getMessageList.json', params, function (res) {
            model.trigger('getMessageList', res);

            if (res.code == 200) {
                cacheData.demander.planList = res.data.list;
            }

            fn && fn(res);
        });
    },
    /**
     * 获取未读信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getMessageNum: function (data, fn) {
        var params = data;
        $$app.getApi('/api/getMessageNum.json', params, function (res) {
            model.trigger('getMessageNum', res);

            fn && fn(res);
        });
    },
    /**
     * 搜索消息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    searchMessage: function (data, fn) {
        $$assert(data, {
            status: 'n',
            page_index: 'n',
            page_size: 'n'
        });
        var params = data;
        $$app.getApi('/api/searchMessage.json', params, function (res) {
            model.trigger('searchMessage', res);
            fn && fn(res);
        });
    },
    /**
     * 删除信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    deleteMessage: function (data, fn) {
        $$assert(data, {
            msgId: 'n:s',
            newStatus: 'n:s'

        });
        var params = data;
        $$app.getApi('/api/deleteMessage.json', params, function (res) {
            model.trigger('deleteMessage', res);
            fn && fn(res);
        });
    },
    logout: function () {
        var params = {};
        $$app.getApi('/api/logout.json', params, function (res) {
            model.trigger('logout', res);
            if (res.code === '200') {
                window.location = $$config.domainLogin + '/pcLogin?ru=' + encodeURIComponent(window.location.href);
            }
        });
    }
});

module.exports = model;
