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
     * 获取财物预览信息
     * @param cid 公司id 可选uploadResPic
     */
    getFinanceOverviewInfo: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/getFinanceOverviewInfo.json', opt, function(res) {
            // model.trigger('getFinanceOverviewInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 充值
     * @param cid 公司id 可选
     * @param money 充值金额 必填
     */
    setFinanceRecharge: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            amount: 's'
        });
        $$app.getApi('/api/setFinanceRecharge.json', data, function(res) {
            fn && fn(res);
        });
    },
    setRepayment: function(data, fn) {
        //assert
        $$assert(data, {
            amount: 's'
        });
        $$app.getApi('/api/setRepayment.json', data, function(res) {
            fn && fn(res);
        });
    },
    /**
     * 获取财物详情列表
     * @param cid 公司id 可选
     * @param datePicks 日期时间段 时间戳数组
     */
    getFinanceDetailList: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            datePick1: 's,r',
            datePick2: 's,r',
            pageIndex: 'n',
            pageSize: 'n'
        });

        data.pageIndex = '' + data.pageIndex;
        data.pageSize = '' + data.pageSize;
        var opt = _.extend({
            // datePicks: ['1480562081', '1480562086']//时间戳区间
        }, data);
        $$app.getApi('/api/getFinanceDetailList.json', opt, function(res) {
            model.trigger('getFinanceDetailList', res);
            fn && fn(res);
        });
    },
    getCreditInfo: function(data, fn) {

        $$app.getApi('/api/getCreditInfo.json', {}, function(res) {
            model.trigger('getCreditInfo', res);
            fn && fn(res);
        });
    },
    getCreditShow: function(data, fn) {

        $$app.getApi('/api/getCreditShow.json', {}, function(res) {
            model.trigger('getCreditShow', res);
            fn && fn(res);
        });
    },
    getTaskInfo: function(data, fn) {
        $$app.getApi('/api/getTaskInfo.json', {}, function(res) {
            model.trigger('getTaskInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 获取财物发票列表
     * @param cid 公司id 可选
     * @param datePicks 日期时间段 时间戳数组
     */
    getFananceInvoiceList: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            datePick1: 's,r',
            datePick2: 's,r',
            pageIndex: 'n',
            pageSize: 'n',
            status: 's,r'
        });
        data.pageIndex = '' + data.pageIndex;
        data.pageSize = '' + data.pageSize;
        var opt = _.extend({
            /*datePicks: ['1480562081', '1480562086']//时间戳区间*/
        }, data);
        $$app.getApi('/api/getFananceInvoiceList.json', opt, function(res) {
            model.trigger('getFananceInvoiceList', res);
            fn && fn(res);
        });
    },
    /**
     * 提交发票信息
     * @param cid 公司id 可选
     * @param invoiceHeader 发票抬头
     * @param invoiceMoney 发票金额
     * @param invoiceContacts 联系人
     * @param invoiceAddress 联系地址
     * @param invoiceTel 电话
     */
    setInvoiceInfo: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            "invoiceHeader": 's',
            "invoiceMoney": 's',
            "invoiceContacts": 's',
            "invoiceAddress": 's',
            "invoiceTel": 's'
        });
        var opt = _.extend({
            //todo
        }, data);
        $$app.getApi('/api/setInvoiceInfo.json', opt, function(res) {
            model.trigger('setInvoiceInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 获取上次发票信息get
     * @param cid 公司id 可选
     */
    getLastInvoiceInfo: function(data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/getLastInvoiceInfo.json', opt, function(res) {
            model.trigger('getLastInvoiceInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 上传资源图片
     * @param cid 公司id 可选
     * @param picFile input file(暂定)
     */
    uploadResPic: function(data, fn) {
        //assert
        // $$assert(data, {
        //     cid: 's,r',
        //     picFile: 'o'//需讨论上传图片input 的 file
        // });
        var opt = _.extend({
            //input file value
        }, data);
        $$app.getApi('/api/uploadResPic.json', opt, function(res) {
            model.trigger('uploadResPic', res);
            fn && fn(res);
        });
    },
    /**
     * 设置纳税人信息
     * @param cid 公司id 可选
     * @param companyName 公司名
     * @param bankAccount 银行账户
     * @param openBank 开户银行
     * @param taxManId 纳税人Id
     * @param companyAddress 公司地址
     * @param companyTel 公司电话
     */
    setTaxManInfo: function(data, fn) {
        $$app.getApi('/api/setTaxManInfo.json', data, function(res) {
            model.trigger('setTaxManInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 获取可开金额
     */
    getInvoiceCount: function(fn) {
        $$app.getApi('/api/getInvoiceCount.json', {}, function(res) {
            fn && fn(res);
        });
    },
    /**
     * 获取充值结果
     */
    getChargeResult: function(data, fn) {
        $$app.getApi('/api/getChargeResult.json', data, function(res) {
            fn && fn(res);
        });
    },
    /**
     * 上传线下充值凭证
     */
    addRecharge: function(data, fn) {
        $$app.getApi('/api/addRecharge.json', data, function(res) {
            fn && fn(res);
        });
    }
});

module.exports = model;
