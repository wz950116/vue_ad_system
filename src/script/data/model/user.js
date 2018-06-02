/**
 * Created by wangwei on 2016/11/21.
 */
var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var under = require('../../../lib/underscore.v1.8.3.js');
var userInfo = {};

var _ = under;
var model = new $$model({});

_.extend(model, {
    getUserInfo: function (fn) {
        $$app.getApi('/api/getInfo.json', '', function (obj) {
            model.trigger('getUserInfo', obj);
            fn && fn(obj);
        });
    },
    disableTab: function (roles) {
        model.trigger('disableTab', roles);
    },
    setCurrentInfo: function (data) {
        userInfo = data;
    },
    getCurrentInfo: function () {
        return userInfo;
    }
});

module.exports = model;
