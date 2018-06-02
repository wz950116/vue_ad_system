/**
* @Author: guohao <guohao>
* @Date:   2016-11-29
* @Email:  guohao@sohu-inc.com
*/


var $$model = require('../../../lib/model.js');
var $$app = require('../../app.js');
var _ = require('../../../lib/underscore.v1.8.3.js');
var $$assert = require('../../../lib/assert.js');

var model = new $$model({});

_.extend(model, {
    /**
     * 选择广告资源
     * @param areaCode {string} 城市编号(单选)
     * @param platform {string} 平台(单选)
     * @param progamaCode {Array} 栏目(栏目多选)
     * @param screenIndex {Array} 屏次(多选)
     * @param startDate {string: YYYYMMDD} 投放的开始日期,必须传入(默认是明天)
     * @param endDate {string: YYYYMMDD}投放的结束日期,必须传入(默认是这个城市释放广告位的最后一天)
     * @param onlyAvailable {boolean:string} 是否只看所选日期范围内可预订广告位, true:是, false:显示所有
     * @return 包含两方面内容:1. 广告位详情(JSOnArray):广告位ID,名称,平均曝光量,价格(元/天),广告位状态(JSonArray),日期;2.已选资源数量(Integer)
     * 3.城市列表;4.平台菜单;5.一级栏目;6.屏次;7.开始和结束日期?
     */
    searchAdResource: function (data, fn) {
        var params = {
            cityCode: data.areaCode,
            platform: data.platform,
            progamaCode: data.progamaCode,
            firstLevel: data.firstLevel,
            screenIndex: data.screenIndex,
            startDate: data.startDate,
            endDate: data.endDate,
            onlyAvailable: data.onlyAvailable
        };
        $$assert(params, {
            cityCode: 'n',
            platform: 'n',
            progamaCode: [ 'n,r'],
            screenIndex: [ 'n,r'],
            firstLevel: 'n',
            startDate: 's',
            endDate: 's',
            onlyAvailable: 'b'
        });
        $$app.getApi('/api/searchAdResource.json', params, function (res) {
            model.trigger('searchAdResource', res);
            fn && fn(res);
        });
    },
    /**
     * 获取选择广告资源初始选项
     */
    getInitAdResourceSelect: function (data, fn) {
        $$app.getApi('/api/getInitAdResourceSelect.json', data, function (res) {
            model.trigger('getInitAdResourceSelect', res);
            fn && fn(res);
        });
    },
    /**
     * 根据一级栏目获取二级栏目
     * @param firstLevelCode {string} 一级栏目id
     */
    getSecondLevelProgamas: function (data, fn) {
        var params = {
            firstLevelCode: data.firstLevelCode
        };
        $$assert(params, {
            firstLevelCode: 's'
        });
        $$app.getApi('/api/getSecondLevelProgamas.json', params, function (res) {
            model.trigger('getSecondLevelProgamas', res);
            fn && fn(res);
        });
    },
    /**
     * 获取广告位详情
     * @param positionId 广告位id
     */
    getAdResourceDetail: function (data, fn) {
        var params = {
            positionId: data.positionId,
            cityCode: data.cityCode,
            startDate: data.startDate,
            endDate: data.endDate
        };
        $$assert(params, {
            cityCode: 'n',
            positionId: 'n',
            startDate: "s",
            endDate: "s"
        });
        $$app.getApi('/api/getAdResourceDetail.json', params, function (res) {
            model.trigger('getAdResourceDetail', res);
            fn && fn(res);
        });
    },
    /**
     * 添加广告资源到已选资源列表
     * @param positionId {string} 广告位id
     * @param startDate {string YYYYMMDD} 开始日期
     * @param endDate {string YYYYMMDD} 结束日期
     */
    addAdResource: function (data, fn) {
        var params = {
            cityCode: data.cityCode,
            orderName: data.orderName,
            positionId: data.positionId,
            dateList: data.dateList,
            planId: data.planId
        };
        /*$$assert(params, {
            cityCode: 'n',
            orderName: 's',
            positionId: 'n',
            dateList: 
            planId: 'n'
        });*/
        $$app.getApi('/api/addAdResource.json', params, function (res) {
            model.trigger('addAdResource', res);
            fn && fn(res);
        });
    },
    /**
     * 从已选资源列表移除广告资源
     * @param orderId {string} 订单id
     */
    delAdResource: function (data, fn) {
        var params = {
            orderIds: data.orderId
        };
        $$assert(params, {
            orderIds: ['n,r']
        });
        $$app.getApi('/api/delAdResource.json', params, function (res) {
            model.trigger('delAdResource', res);
            fn && fn(res);
        });
    },
    /**
     * 获取广告资源列表
     */
    getAdResourceList: function (fn) {
        $$app.getApi('/api/getAdResourceList.json', {}, function (res) {
            model.trigger('getAdResourceList', res);
            fn && fn(res);
        });
    },
    /**
     * 创建广告单元
     * @param orderId  {Array} 订单Id
     */
    createAdUnit: function (data, fn) {
        var params = {
            orderIds: data.orderId
        };
        $$assert(params, {
            orderIds: [ 'n,r']
        });
        $$app.getApi('/api/createAdUnit.json', params, function (res) {
            model.trigger('createAdUnit', res);
            fn && fn(res);
        });
    },
    /**
     * 获取支付验证码
     */
    getPayAuthCode: function (fn) {
        $$app.getApi('/api/getPayAuthCode.json', {}, function (res) {
            model.trigger('getPayAuthCode', res);
            fn && fn(res);
        });
    },
    /**
     * 确认支付
     */
    pay: function (data, fn) {
        var params = {
            orderIds: data.orderIds,
            token: data.token,
            useBalance: data.useBalance
        };
        $$assert(params, {
            orderIds: [ 'n,r'],
            token: 's',
            useBalance: 'n'
        });
        $$app.getApi('/api/pay.json', params, function (res) {
            model.trigger('pay', res);
            fn && fn(res);
        });
    },
    /**
     * 获取支付结果
     */
    getPayResult: function (data, fn) {
        var params = {
            flowNum: data.flowNum
        };
        $$assert(params, {
            flowNum: 's'
        });
        $$app.getApi('/api/getPayResult.json', params, function (res) {
            model.trigger('getPayResult', res);
            fn && fn(res);
        });
    },
    /**
     * 获取已支付资源列表
     * @param status  {string} 投放状态, 0表示"准备投放",1表示"投放中", 2表示"投放完成"
     */
    getPayedAdResourceList: function (data, fn) {
        var params = {
            status: data.status
        };
        $$assert(params, {
            status: 's'
        });
        $$app.getApi('/api/getPayedAdResourceList.json', params, function (res) {
            model.trigger('getPayedAdResourceList', res);
            fn && fn(res);
        });
    },
    /**
     * 取消已支付订单
     */
    cancelPayedOrder: function (data, fn) {
        var params = {
            orderId: data.orderId
        };
        $$assert(params, {
            orderId: 's'
        });
        $$app.getApi('/api/cancelPayedOrder.json', params, function (res) {
            model.trigger('cancelPayedOrder', res);
            fn && fn(res);
        });
    },
    /**
     * 获取公司列表
     */
    getCompanyList: function (fn) {
        $$app.getApi('/api/getCompanyList.json', {}, function (res) {
            model.trigger('getCompanyList', res);
            fn && fn(res);
        });
    },
    /**
     * 分配广告资源
     * @param startDate {string} 开始日期
     * @param endDate {string} 结束日期
     * @param companyId {string} 公司id
     * @param planId {string} 广告计划id
     * @param name {string} 广告单元名称
     * @param orderId {string} 订单id
     */
    releaseAdResource: function (data, fn) {
        var params = {
            startDate: data.startDate,
            endDate: data.endDate,
            companyId: data.companyId,
            planId: data.planId,
            name: data.name,
            orderId: data.orderId,
            dateList: data.dateList,
        };
 /*       $$assert(params, {
            startDate: 'n',
            endDate: 'n',
            companyId: 's',
            planId: 's',
            name: 's',
            orderId: 's',
            dateList: ['s','s']
        });*/
        $$app.getApi('/api/releaseAdResource.json', params, function (res) {
            model.trigger('releaseAdResource', res);
            fn && fn(res);
        });
    },
    /**
     * 取消已分配纪录
     * @param recordId {string} 纪录id
     */
    cancelReleasedAdResource: function (data, fn) {
        var params = {
            recordId: data.recordId
        };
        $$assert(params, {
            recordId: 's'
        });
        $$app.getApi('/api/cancelReleasedAdResource.json', params, function (res) {
            model.trigger('cancelReleasedAdResource', res);
            fn && fn(res);
        });
    },
    /**
     * 验证当前推广计划是否可以创建广告单元
     * @param planId {string} 推广计划id
     */
    verifyCurrentPlan: function (data, fn) {
        var params = {
            id: data.planId
        };
        $$assert(params, {
            id: 'n'
        });
        $$app.getApi('/api/verifyCurrentPlan.json', params, function (res) {
            model.trigger('verifyCurrentPlan', res);
            fn && fn(res);
        });
    },
    /**
     * 清空所有计划的订单
     */
    clearCurrentResource: function (fn) {
        $$app.getApi('/api/clearCurrentResource.json', {}, function (res) {
            model.trigger('clearCurrentResource', res);
            fn && fn(res);
        });
    },
    /**
     * 获取一级栏目
     */
    getFirstLevelProgamas: function (data, fn) {
        var params = {
            platformType: data.platformType
        };
        $$assert(params, {
            platformType: 'n'
        });
        $$app.getApi('/api/getFirstLevelProgamas.json', params, function (res) {
            model.trigger('getFirstLevelProgamas', res);
            fn && fn(res);
        });
    },
    /**
     * 获取屏次
     */
    getScreenIndice: function (data, fn) {
        var params = {
            platformType: data.platformType,
            oneLevelId: data.oneLevelId,
            twoLevelIds: data.twoLevelIds,
        };
        $$assert(params, {
            platformType: 'n',
            oneLevelId: 'n',
            twoLevelIds: [ 'n,r', 'f' ]
        });
        $$app.getApi('/api/getScreenIndice.json', params, function (res) {
            model.trigger('getScreenIndice', res);
            fn && fn(res);
        });
    },
    /**
     * 获取二级栏目
     */
    getSecondLevelProgamas: function (data, fn) {
        var params = {
            platformType: data.platformType,
            oneLevelId: data.oneLevelId
        };
        $$assert(params, {
            platformType: 'n',
            oneLevelId: 'n'
        });
        $$app.getApi('/api/getSecondLevelProgamas.json', params, function (res) {
            model.trigger('getSecondLevelProgamas', res);
            fn && fn(res);
        });
    },
    /**
     * 获取子客列表
     * 适用举例：子客列表
     */
    getChildGuestList: function (data, fn) {
        $$app.getApi('/api/getChildGuestList.json', {}, function (res) {
            model.trigger('getChildGuestList', res);
            fn && fn(res);
        });
    },
    /**
     * 获取子客下面的计划
     */
    getChildPlanList: function (data, fn) {
        var params = {
            child_id: data.child_id
        };
        $$assert(params, {
            child_id: 's'
        });
        $$app.getApi('/api/getChildPlanList.json', params, function (res) {
            model.trigger('getChildPlanList', res);
            fn && fn(res);
        });
    },
    /**
     * 获取取消分配计划
     */
    cancelDistribution: function (data, fn) {
        var params = {
            sub_order_id: data.sub_order_id
        };
        $$assert(params, {
            sub_order_id: 's'
        });
        $$app.getApi('/api/cancelDistribution.json', params, function (res) {
            model.trigger('cancelDistribution', res);
            fn && fn(res);
        });
    }
});

module.exports = model;