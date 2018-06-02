/**
 * @Author: keshen <keshen>
 * @Date:   2016-11-29
 * @Email:  keshen@sohu-inc.com
 * @Project: ecology-ad-front
 * @Last modified by:   keshen
 * @Last modified time: 2016-11-29
 */


var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var _ = require('../../../lib/underscore.v1.8.3.js');
var $$assert = require('../../../lib/assert.js');

var model = new $$model({});

var cacheData = {
    agent: {},
    custTable: {}
};

_.extend(model, {
    getCacheData: function () {
        return cacheData;
    },
    /**
     * 获取基本信息和统计信息
     * 包含（除子客公司列表外的）所有信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    // getInfo: function (data, fn) {
    //     var params = data;
    //     $$app.getApi('/api/getAgentInfo.json', params, function (res) {
    //         model.trigger('getInfo', res);

    //         if (res.code == 200) {
    //             _.extend(cacheData.agent, res.data);
    //         }

    //         fn && fn(res);
    //     });
    // },
    /**
     * 获取子客列表
     * 适用举例：子客列表
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getSubCustomerList: function (data, fn) {
        var params = data;
        $$app.getApi('/api/getSubDemanderList.json', params, function (res) {
            model.trigger('getSubCustomerList', res);
            if (res.code == 200) {
                _.extend(cacheData.agent, res.data);
                if (res.data.list && _.isArray(res.data.list)) {
                    res.data.list.forEach(function (s) {
                        if (!cacheData.custTable[s.id]) {
                            cacheData.custTable[s.id] = {};
                        }
                        _.extend(cacheData.custTable[s.id], s);
                    });
                }
            }

            fn && fn(res);
        });
    },
    /**
     * 获取子客信息
     * 适用举例：左侧列表点击某一子客，主体显示子客信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getSubCustomerInfo: function (data, fn) {
        $$assert(data, {
            id: 's:n'
        });
        var params = data;
        $$app.getApi('/api/getSubDemanderInfo.json', params, function (res) {
            model.trigger('getSubCustomerInfo', res);
            fn && fn(params, res);
        });
    },
    /**
     * 搜索子客
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    searchSubCustomers: function (data, fn) {
        $$assert(data, {
            status: 'n',
            keyword: 's,r'
        });
        var params = data;
        $$app.getApi('/api/searchSubDemanders.json', params, function (res) {
            model.trigger('searchSubCustomers', res);
            fn && fn(res);
        });
    },
    /**
     * 新建子客（添加公司）
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    createSubCustomer: function (data, fn) {
        $$assert(data, {
            name: 's',
            license_number: 's',
            license_image: 's'
        });
        var params = data;
        $$app.getApi('/api/createSubDemander.json', params, function (res) {
            model.trigger('createSubCustomer', res);
            fn && fn(res);
        });
    },
    /**
     * 编辑子客（编辑公司）
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    editSubCustomer: function (data, fn) {
        $$assert(data, {
            businessLicenceCode: 's',
            company: 's',
            childDemanderId: 's',
            businessLicenceUrl: 's'
        });
        var params = data;
        $$app.getApi('/api/editSubCustomer.json', params, function (res) {
            model.trigger('editSubCustomer', res);
            fn && fn(res);
        });
    },
    /**
     * 查看子客信息（查看公司）
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    viewSubCustomer: function (data, fn) {
        $$assert(data, {
            childDemanderId: 's',
        });
        var params = data;
        $$app.getApi('/api/viewSubCustomer.json', params, function (res) {
            model.trigger('viewSubCustomer', res);
            fn && fn(res);
        });
    },
    /**
     * 上传子客资质图片
     * 需要：图片文件流
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    uploadLicenseImage: function (data, fn) {
        var params = data;
        $$app.getApi('/api/uploadLicenseImage.json', params, function (res) {
            model.trigger('uploadLicenseImage', res);
            fn && fn(res);
        });
    },
    /**
     * 发送配额验证码
     */
    sendQuotaVerification: function (fn) {
        $$app.getApi('/api/sendQuotaVerification.json', {}, function (res) {
            // model.trigger('sendQuotaVerification', fn);
            fn && fn(res);
        });
    },
    /**
     * 获取子客账号
     */
    getCustomerAccount: function (data, fn) {
        $$app.getApi('/api/getCustomerAccount.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 发送子客验证码
     */
    sendCustomerVerification: function (data, fn) {
        $$app.getApi('/api/sendCustomerVerification.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 提交子客表单
     */
    addSubConfirm: function (data, fn) {
        $$app.getApi('/api/addSubConfirm.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 单击首页状态链接改变左侧的下拉框和列表
     */
    changeComStatus: function (data, fn) {
        model.trigger('changeComStatus', data);
        fn && fn(data);
    },




    // --------------------------- V2更新--------------------------- //

    // 数据总览-基本数据
    getAgentInfo: function (params, fn) {
        $$app.getApi('/api/getAgentInfo.json', params, function (res) {
            model.trigger('getAgentInfo', res);
            fn && fn(res);
        })
    },

    // 数据总览-子客数据概览
    getChildInfo: function (params, fn) {
        $$app.getApi('/api/getChildInfo.json', params, function (res) {
            model.trigger('getChildInfo', res);
            fn && fn(res);
        })
    },

    // 数据总览-待上传创意单元
    getOrderIdeasToUpload: function (params, fn) {
        $$app.getApi('/api/getOrderIdeasToUpload.json', params, function (res) {
            model.trigger('getOrderIdeasToUpload', res);
            fn && fn(res);
        })
    },

    // 数据总览-查询
    getSearchResult: function (params, fn) {
        $$app.getApi('/api/getSearchResult.json', params, function (res) {
            model.trigger('getSearchResult', res);
            fn && fn(res);
        })
    },

    // 数据总览-日期
    dayByDay: function (params, fn) {
        $$app.getApi('/api/dayByDay.json', params, function (res) {
            model.trigger('dayByDay', res);
            fn && fn(res);
        })
    },

    // 首页导出子客概览数据
    exportChildData: function (fn) {
        $$app.getApi('/api/getChildInfoInExcel.json', {}, function (res) {
            model.trigger('exportChildData', res);
            fn && fn(res);
        })
    },

    // 首页导出待上传创意excel数据
    exportData: function (fn) {
        $$app.getApi('/api/getOrderExcel.json', {}, function (res) {
            model.trigger('exportData', res);
            fn && fn(res);
        })
    },

    // 代理商子客account
    getChildDetail: function (params, fn) {
        $$app.getApi('/api/getChildDetail.json', params, function (res) {
            model.trigger('getChildDetail', res);
            fn && fn(res);
        })
    },

    // 代理商子客修改配额
    addQuotaConfirm: function (data, fn) {
        $$app.getApi('/api/addQuotaConfirm.json', data, function (res) {
            fn && fn(res);
        });
    },

    //验证当前用户是否为白名单
    isDemanderWhiteList: function (params, fn) {
        $$app.getApi('/api/isDemanderWhiteList.json', params ,function (res) {
            model.trigger('isDemanderWhiteList', res);
            fn && fn(res);
        })
    }
});

module.exports = model;
