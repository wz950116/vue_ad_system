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
    demander: {},
    planTable: {},
    unitTable: {},
    ideaTable: {}
};

_.extend(model, {
    getCacheData: function () {
        return cacheData;
    },
    /**
     * 获取基本信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getInfo: function (data, fn) {
        var params = data;
        $$app.getApi('/api/getDemanderInfo.json', params, function (res) {
            model.trigger('getInfo', res);
            if (res.code == 200) {
                cacheData.demander.info = res.data;
            }

            fn && fn(res);
        });
    },
    /**
     * 获取统计数据
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {Boolean}       [description]
     */
    getStatisData: function (data, fn) {
        $$assert(data, {
            lastdays: 'n'
        });
        var params = data;
        $$app.getApi('/api/getDemanderStatis.json', params, function (res) {
            model.trigger('getStatisData', res);

            if (res.code == 200) {
                cacheData.demander.statis = res.data;
            }

            fn && fn(res);
        });
    },
    /**
     * 获取推广计划列表
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getAdPlanList: function (data, fn) {
        var params = data;
        $$app.getApi('/api/getAdPlanList.json', params, function (res) {
            model.trigger('getAdPlanList', res);
            if (res.code == 200) {
                cacheData.demander.planList = res.data.list;
            }

            fn && fn(res);
        });
    },
    /**
     * 搜索推广计划
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    searchAdPlans: function (data, fn) {
        $$assert(data, {
            status: 'n',
            keyword: 's,r',
            start_date: 's,r',
            end_date: 's,r',
            page_index: 'n',
            page_size: 'n'
        });
        $$assert(data, function (obj) {
            var keywordOK = !obj.hasOwnProperty('keyword') || (obj.keyword !== null && obj.keyword !== '');
            var startdateOK = !obj.hasOwnProperty('start_date') || (obj.start_date !== null && obj.start_date !== '');
            var enddateOK = !obj.hasOwnProperty('end_date') || (obj.end_date !== null && obj.end_date !== '');
            var result = {};
            if (!keywordOK) result.keyword = 'cannot be null or empty string';
            if (!startdateOK) result.start_date = 'cannot be null or empty string';
            if (!enddateOK) result.end_date = 'cannot be null or empty string';
            if (keywordOK && startdateOK && enddateOK) return true;
            return result;
        });
        var params = data;
        $$app.getApi('/api/searchAdPlans.json', params, function (res) {
            model.trigger('searchAdPlans', res);
            fn && fn(res);
        });
    },
    /**
     * 搜索广告单元
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    searchAdUnits: function (data, fn) {
        $$assert(data, {
            status: 'n,r',
            keyword: 's,r',
            start_date: 's,r',
            end_date: 's,r',
            page_index: 'n',
            page_size: 'n',
            plan_id: 'n:s,r'
        });
        $$assert(data, function (obj) {
            var statusOk = !obj.hasOwnProperty('status') || (obj.status !== null && obj.status !== '');
            var keywordOK = !obj.hasOwnProperty('keyword') || (obj.keyword !== null && obj.keyword !== '');
            var startdateOK = !obj.hasOwnProperty('start_date') || (obj.start_date !== null && obj.start_date !== '');
            var enddateOK = !obj.hasOwnProperty('end_date') || (obj.end_date !== null && obj.end_date !== '');
            var result = {};
            if (!statusOk) result.status = 'cannot be null or empty string';
            if (!keywordOK) result.keyword = 'cannot be null or empty string';
            if (!startdateOK) result.start_date = 'cannot be null or empty string';
            if (!enddateOK) result.end_date = 'cannot be null or empty string';
            if (keywordOK && startdateOK && enddateOK) return true;
            return result;
        });
        var params = data;
        $$app.getApi('/api/searchAdUnits.json', params, function (res) {
            model.trigger('searchAdUnits', res);
            fn && fn(res);
        });
    },
    /**
     * 搜索广告创意
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    searchAdIdeas: function (data, fn) {
        $$assert(data, {
            status: 'n,r',
            keyword: 's,r',
            start_date: 's,r',
            end_date: 's,r',
            page_index: 'n',
            page_size: 'n',
            plan_id: 's:n,r',
            unit_id: 's:n,r'
        });
        $$assert(data, function (obj) {
            var statusOk = !obj.hasOwnProperty('status') || (obj.status !== null && obj.status !== '');;
            var keywordOK = !obj.hasOwnProperty('keyword') || (obj.keyword !== null && obj.keyword !== '');
            var startdateOK = !obj.hasOwnProperty('start_date') || (obj.start_date !== null && obj.start_date !== '');
            var enddateOK = !obj.hasOwnProperty('end_date') || (obj.end_date !== null && obj.end_date !== '');
            var result = {};
            if (!statusOk) result.status = 'cannot be null or empty string';
            if (!keywordOK) result.keyword = 'cannot be null or empty string';
            if (!startdateOK) result.start_date = 'cannot be null or empty string';
            if (!enddateOK) result.end_date = 'cannot be null or empty string';
            if (keywordOK && startdateOK && enddateOK) return true;
            return result;
        });
        var params = data;
        $$app.getApi('/api/searchAdIdeas.json', params, function (res) {
            model.trigger('searchAdIdeas', res);
            fn && fn(res);
        });
    },
    /**
     * 获取一个推广计划的信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getAdPlanInfo: function (data, fn) {
        $$assert(data, {
            id: 'n:s'
        });
        var params = data;
        $$app.getApi('/api/getAdPlanInfo.json', params, function (res) {
            model.trigger('getAdPlanInfo', res);
            if (res.code == 200) {
                cacheData.planTable[params.id] = res.data;
                if (res.data && _.isArray(res.data.units)) {
                    res.data.units.forEach(function (u) {
                        if (!cacheData.unitTable[u.id]) {
                            cacheData.unitTable[u.id] = {};
                        }
                        cacheData.unitTable[u.id].planId = params.id;
                        _.extend(cacheData.unitTable[u.id], u);
                    });
                }
            }

            fn && fn(res);
        });
    },
    /**
     * 获取一个广告单元的信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getAdUnitInfo: function (data, fn) {
        $$assert(data, {
            id: 'n:s'
        });
        var params = data;
        $$app.getApi('/api/getAdUnitInfo.json', params, function (res) {
            model.trigger('getAdUnitInfo', res);

            if (res.code == 200) {
                if (!cacheData.unitTable[params.id]) {
                    cacheData.unitTable[params.id] = {};
                }
                _.extend(cacheData.unitTable[params.id], res.data);
            }

            fn && fn(res);
        });
    },
    /**
     * 创建推广计划
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    createAdPlan: function (data, fn) {
        $$assert(data, {
            name: 's',
            budget: 'n',
            desc: 's'
        });
        var params = data;
        _.extend({}, params);
        $$app.getApi('/api/createAdPlan.json', params, function (res) {
            model.trigger('createAdPlan', res);
            fn && fn(res);
        });
    },
    /**
     * 创建广告创意
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    createAdIdea: function (data, fn) {
        $$assert(data, {
            order_id: 'n:s',
            creator_id: 'n:s',
            desc: 's,r',
            idea_type: 'n',
            link_type: 'n',
            link: 's',
            md5: 's,r',
            width: 'n:s,r',
            height: 'n:s,r',
            file_size: 'n:s,r',
            file_type: 's,r',
            estate_id: "n,r"
        });
        var params = data;
        $$app.getApi('/api/createAdIdea.json', params, function (res) {
            model.trigger('createAdIdea', res);
            fn && fn(res);
        });
    },
    /**
     * 上传创意图片
     * 需要：广告单元ID、图片文件流
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    uploadIdeaImage: function (data, fn) {
        var params = data;
        $$app.getApi('/api/uploadIdeaImage.json', params, function (res) {
            model.trigger('uploadIdeaImage', res);
            fn && fn(res);
        });
    },
    /**
     * 创建广告单元
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    createAdUnit: function (data, fn) {
        var params = data;
        $$app.getApi('/api/createAdUnit.json', params, function (res) {
            model.trigger('createAdUnit', res);
            fn && fn(res);
        });
    },
    /**
     * 获取楼盘列表
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    getLoupanList: function (data, fn) {
        var params = data;
        $$app.getApi('/api/getDemanderLoupanList.json', params, function (res) {
            model.trigger('getLoupanList', res);
            fn && fn(res);
        });
    },
    /**
     * 删除当前推广计划
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    deleteCurrentAdPlan: function (data, fn) {
        $$assert(data, {
            id: 'n:s'
        });
        var params = data;
        $$app.getApi('/api/deleteAdPlan.json', params, function (res) {
            model.trigger('deleteCurrentAdPlan', res);
            fn && fn(res);
        });
    },
    /**
     * 停止广告单元
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    deleteAdUnit: function (data, fn) {
        $$assert(data, {
            id: 'n:s'
        });
        var params = data;
        $$app.getApi('/api/deleteAdUnit.json', params, function (res) {
            model.trigger('deleteAdUnit', res);
            fn && fn(res);
        });
    },
    /**
     * 删除广告创意
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    deleteAdIdeas: function (data, fn) {
        $$assert(data, {
            order_id: 'n:s',
            list: ['n:s']
        });
        var params = data;
        $$app.getApi('/api/deleteAdIdeas.json', params, function (res) {
            model.trigger('deleteAdIdeas', res);
            fn && fn(res);
        });
    },
    /**
     * 导出广告创意
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    exportIdeaList: function (data, fn) {
        $$assert(data, {
            list: ['n:s']
        });
        var params = data;
        $$app.getApi('/api/exportIdeaList.json', params, function (res) {
            model.trigger('exportIdeaList', res);
            fn && fn(res);
        });
    },
    /**
     * 导出推广计划
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    exportPlanList: function (data, fn) {
        $$assert(data, {
            list: ['n:s']
        });
        var params = data;
        $$app.getApi('/api/exportPlanList.json', params, function (res) {
            model.trigger('exportPlanList', res);
            fn && fn(res);
        });
    },
    /**
     * 导出广告单元
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    exportUnitList: function (data, fn) {
        $$assert(data, {
            list: ['n:s']
        });
        var params = data;
        $$app.getApi('/api/exportUnitList.json', params, function (res) {
            model.trigger('exportUnitList', res);
            fn && fn(res);
        });
    },
    /**
     * 编辑推广计划的基本信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    editAdPlanInfo: function (data, fn) {
        $$assert(data, {
            id: 'n:s',
            name: 's',
            budget: 'n',
            desc: 's'
        });
        var params = data;
        $$app.getApi('/api/editAdPlanInfo.json', params, function (res) {
            model.trigger('editAdPlanInfo', res);

            if (res.code == 200) {
                if (!cacheData.planTable[params.id]) {
                    cacheData.planTable[params.id] = {};
                }
                _.extend(cacheData.planTable[params.id], params);
            }

            fn && fn(res);
        });
    },
    /**
     * 编辑广告单元的基本信息
     * @param  {[type]}   data [description]
     * @param  {Function} fn   [description]
     * @return {[type]}        [description]
     */
    editAdUnitInfo: function (data, fn) {
        $$assert(data, {
            id: 'n:s',
            name: 's'
        });
        var params = data;
        $$app.getApi('/api/editAdUnitInfo.json', params, function (res) {
            model.trigger('editAdUnitInfo', res);

            if (res.code == 200) {
                if (!cacheData.unitTable[params.id]) {
                    cacheData.unitTable[params.id] = {};
                }
                _.extend(cacheData.unitTable[params.id], params);
            }

            fn && fn(res);
        });
    },
    /**
     * 设置广告创意的投放状态
     * @param {[type]}   data [description]
     * @param {Function} fn   [description]
     */
    setAdIdeaReleaseState: function (data, fn) {
        $$assert(data, {
            id: 'n:s',
            status: 'n'
        });
        var params = data;
        $$app.getApi('/api/setAdIdeaReleaseStatus.json', params, function (res) {
            model.trigger('setAdIdeaReleaseState', res);
            fn && fn(res);
        });
    },
    /**
     * 选择广告资源
     * @param areaCode 城市编号(单选)
     * @param platform 平台(单选)
     * @param progamaCode 栏目(栏目多选)
     * @param screenIndex 屏次(多选)
     * @param startDate 投放的开始日期,必须传入(默认是明天)
     * @param endDate 投放的结束日期,必须传入(默认是这个城市释放广告位的最后一天)
     * @param onlyAvailable 是否只看所选日期范围内可预订广告位, true:是, false:显示所有
     * @return 包含两方面内容:1. 广告位详情(JSOnArray):广告位ID,名称,平均曝光量,价格(元/天),广告位状态(JSonArray),日期;2.已选资源数量(Integer)
     * 3.城市列表;4.平台菜单;5.一级栏目;6.屏次;7.开始和结束日期?
     * TODO: 默认条件: 所在城市,PC上的所有广告位,按照 ID 排序,不分页;
     */
    searchAdResource: function (data, fn) {
        var params = data;
        $$app.getApi('/api/searchAdResource.json', params, function (res) {
            model.trigger('searchAdResource', res);
            fn && fn(res);
        });
    },
    launchCreate: function (data) {
        model.trigger('launchCreate', data);
    },
    updateBreads: function () {
        model.trigger('updateBreads');
    },
    changeTab: function () {
        model.trigger('changeTab');
    },
    controlNewUnit: function (data, fn) {
        model.trigger('controlNewUnit', data);
        fn && fn(data);
    },
    /**
     * 单击首页状态链接改变广告单元的下拉框和列表
     */
    changeUnitStatus: function (data, fn) {
        model.trigger('changeUnitStatus', data);
        fn && fn(data);
    }
});

module.exports = model;
