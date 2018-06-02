/**
 * Created by ruiguo208494 on 2016/11/21.
 */

var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var under = require('../../../lib/underscore.v1.8.3.js');
var $$assert = require('../../../lib/assert.js');

var _ = under;
var model = new $$model({});

_.extend(model, {

    /**
     * 提交用户信息
     *
     */
    submitAccInfo: function (data, fn) {
        var opt = _.extend({}, data);
        $$app.getApi('/api/submitAccInfo.json', opt, function (res) {
            model.trigger('submitAccInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 清session
     */
    clearSession: function (fn) {
        $$app.getApi('/api/clearSession.json', function (res) {
            model.trigger('clearSession', res);
            fn && fn(res);
        });
    },
    chooseType: function (id) {
        model.trigger('chooseType', id);
    },

    getAuditStatus: function (code) {
        model.trigger('getAuditStatus', code);
    },

    /**
     * 登录获取用户信息
     */
    getLoginInfo: function (fn) {
        $$app.getApi('/api/getLoginInfo.json', function (res) {
            model.trigger('getLoginInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 是否从提交页过去
     */
    isSubmit: function (submitOk) {
        model.trigger('isSubmit', submitOk);
    },
    getQualificationHeader: function (data) {
        model.trigger('getQualificationHeader', data);
    },
    accept: function (params,fn) {
        $$app.getApi('/api/accept.json', params, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 获取对应城市站url
     */
    getCityIndex: function (params,fn) {
        $$app.getApi('/api/getCityIndex.json',params, function (res) {
            model.trigger('getCityIndex', res);
            fn && fn(res);
        });
    }

});

module.exports = model;
