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
    // 账号设置页
    /**
     * 获取账号信息
     * @param cid 公司id 可选
     */
    getAccountInfo: function (data, fn) {
        var opt = _.extend({}, data);
        $$app.getApi('/api/getAccountInfo.json', opt, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 重新上传资料
     * @param cid 公司id 可选
     * @param companyName 公司名
     * @param societyCreditCode 社会信用码
     * @param ImgUrl 图片地址
     */
    reUpdateAccountInfo: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            companyName: 's',
            societyCreditCode: 's',
            ImgUrl: 's'
        });
        $$app.getApi('/api/reUpdateAccountInfo.json', data, function (res) {
            model.trigger('reUpdateAccountInfo', res);
            fn && fn(res);
        });
    },
    /**
     * 编辑联系人信息
     * @param cid 公司id 可选
     * @param contact 联系人姓名
     * @param tel 联系人电话
     * @param QQ
     * @param email 邮箱
     * @param address 地址
     */
    setContactInfo: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            contact: 's',
            tel: 's',
            QQ: 's',
            email: 's',
            address: 's'
        });
        $$app.getApi('/api/setContactInfo.json', data, function (res) {
            model.trigger('setContactInfo', res);
            fn && fn(res);
        });
    },
    // 编辑账号信息（暂不做）
    /**
     * 添加推广码
     * @param cid 公司id 可选
     * @param promotionCode 推广码
     */
    addPromotionCode: function (data, fn) {
        $$app.getApi('/api/addPromotionCode.json', data, function (res) {
            model.trigger('addPromotionCode', res);
            fn && fn(res);
        });
    },
    // 楼盘管理页
    /**
     * 获取楼盘列表
     * @param cid 公司id 可选
     */
    getEstateList: function (data, fn) {
        $$app.getApi('/api/getEstateList.json', data, function (res) {
            model.trigger('getEstateList', res);
            fn && fn(res);
        });
    },
    /**
     * 添加楼盘
     * @param cid 公司id 可选
     */
    addEstate: function (data, fn) {
        //assert
        $$assert(data, { //此处还没设计稿，先别调用
            cid: 's,r',
            resourceName: 's'
        });
        var opt = _.extend({
            // "resourceName": "eqweq"//公司 名称（必填）
        }, data);
        $$app.getApi('/api/addEstate.json', opt, function (res) {
            model.trigger('addEstate', res);
            fn && fn(res);
        });
    },
    /**
     * 添加楼盘dialog
     * @param cid 公司id 可选
     */
    addEstateDialog: function (data) {
        // $$app.getApi('/api/addEstate.json', opt, function (res) {
        //     model.trigger('addEstate', res);
        //     fn && fn(res);
        // });
        //
        // $$app.getApi('/api/isWhite.json', data, function (res) {
        //     model.trigger('isWhite', res);
        //     fn && fn(res);
        // });

        model.trigger('addEstateDialog', data);
    },
    // todo:重新上传

    /**
     * 判断是否是白名单
     * @param cid 公司id 可选
     */
    isWhiteList: function (data,fn) {
        $$app.getApi('/api/isWhite.json', data, function (res) {
            model.trigger('isWhite', res);
            fn && fn(res);
        });
    },


    // 资质管理页
    /**
     * 获取资质列表
     * @param cid 公司id 可选
     */
    getQualificationList: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r'
            /*,
             pageIndex: 'n',
             pageSize: 'n'*/
            ,
            qualificationType: 'n'
        });
        /*data.pageIndex = '' + data.pageIndex;
         data.pageSize = '' + data.pageSize;*/
        var opt = _.extend({}, data);
        $$app.getApi('/api/getQualificationList.json', opt, function (res) {
            model.trigger('getQualificationList', res);
            fn && fn(res);
        });
    },
    /**
     * 删除资质
     * @param cid 公司id 可选
     * @param qId 资质Id string
     */
    deleteQualification: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            qualificationId: 'n'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/deleteQualification.json', opt, function (res) {
            model.trigger('deleteQualification', res);
            fn && fn(res);
        });
    },
    /**
     * 添加资质
     * @param cid 公司id 可选
     * @param qImgUrl 资质图片地址
     * @param qDes 资质描述
     */
    addQualification: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            qImgUrl: 's',
            qDes: 's'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/addQualification.json', opt, function (res) {
            model.trigger('addQualification', res);
            fn && fn(res);
        });
    },
    /**
     * 上传资质图片
     * @param cid 公司id 可选
     * @param file 资质图片file
     */
    uploadQualificationPic: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            file: 's' //此处有调整暂定string ，可能会变成input file
        });
        var opt = _.extend({
            //input file value
        }, data);
        $$app.getApi('/api/uploadQualificationPic.json', opt, function (res) {
            model.trigger('uploadQualificationPic', res);
            fn && fn(res);
        });
    },
    /**
     * 获取通知渠道列表
     * @param cid 公司id 可选
     */
    getNoticeStyleList: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/getNoticeStyleList.json', opt, function (res) {
            model.trigger('getNoticeStyleList', res);
            fn && fn(res);
        });
    },
    /**
     * 获取手机邮箱列表
     * @param cid 公司id 可选
     */
    getNoticeContactList: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r'
        });
        var opt = _.extend({}, data);
        $$app.getApi('/api/getNoticeContactList.json', opt, function (res) {
            model.trigger('getNoticeContactList', res);
            fn && fn(res);
        });
    },
    /**
     * 设置通知渠道
     * @param cid 公司id 可选
     * @param noticeList 通知渠道数组
     * @param noticeList.noticeTypeTxt 通知种类文案
     * @param noticeList.noticeTypeCode 通知种类码
     * @param noticeList.noticeName 通知名称
     * @param noticeList.webInMail 是否通知站内邮箱
     * @param noticeList.email 是否邮箱
     * @param noticeList.sms 是否短信
     */
    setNoticeStyle: function (data, fn) {
        $$app.getApi('/api/setNoticeStyle.json', data, function (res) {
            model.trigger('setNoticeStyle', res);
            fn && fn(res);
        });
    },
    /**
     * 添加邮箱
     * @param cid 公司id 可选
     * @param email 邮箱
     */
    addNoticeEmail: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            email: 's'
        });
        var opt = _.extend({
            // "email": ""必填
        }, data);
        $$app.getApi('/api/addNoticeEmail.json', opt, function (res) {
            model.trigger('addNoticeEmail', res);
            fn && fn(res);
        });
    },
    /*
     * 获取添加手机用的短信验证码
     * @param mobile 手机
     */
    getSmsCheckCode: function (data, fn) {
        $$assert(data, {
            mobile: 's'
        });

        $$app.getApi('/api/getSmsCheckCode.json', {
            mobile: '' + data.mobile
        }, function (res) {
            model.trigger('getSmsCheckCode', res);
            fn && fn(res);
        });
    },
    /**
     * 添加手机
     * @param cid 公司id 可选
     * @param mobile 手机
     */
    addNoticeMobile: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            mobile: 's',
            smsCheckCode: 's'
        });
        var opt = _.extend({
            // "mobile": ""必填
        }, data);
        $$app.getApi('/api/addNoticeMobile.json', opt, function (res) {
            model.trigger('addNoticeMobile', res);
            fn && fn(res);
        });
    },
    /**
     * 删除邮箱
     * @param cid 公司id 可选
     * @param email 邮箱
     */
    deleteNoticeEmail: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            email: 's'
        });
        var opt = _.extend({
            // "email": ""必填
        }, data);
        $$app.getApi('/api/deleteNoticeEmail.json', opt, function (res) {
            model.trigger('deleteNoticeEmail', res);
            fn && fn(res);
        });
    },
    /**
     * 删除手机
     * @param cid 公司id 可选
     * @param mobile 手机
     */
    deleteNoticeMobile: function (data, fn) {
        //assert
        $$assert(data, {
            cid: 's,r',
            mobile: 's'
        });
        var opt = _.extend({
            // "mobile": ""必填
        }, data);
        $$app.getApi('/api/deleteNoticeMobile.json', opt, function (res) {
            model.trigger('deleteNoticeMobile', res);
            fn && fn(res);
        });
    },
    /**
     * 搜索楼盘
     */
    searchEstate: function (data, fn) {
        $$app.getApi('/api/searchEstate.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 提交审核
     */
    submitCheck: function (data, fn) {
        $$app.getApi('/api/submitCheck.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 提交审核
     */
    submitClue: function (data, fn) {
        $$app.getApi('/api/submitClue.json', data, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 刷新楼盘管理列表
     */
    refreshList: function () {
        model.trigger('refreshList', {});
    },
    /**
     * 添加协助者
     */
    addCollaborator: function (param, fn) {
        $$app.getApi('/api/addCollaborator.json', param, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 获取协助者列表
     */
    getList: function (param, fn) {
        $$app.getApi('/api/getList.json', param, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 删除协作者
     */
    del: function (param, fn) {
        $$app.getApi('/api/del.json', param, function (res) {
            fn && fn(res);
        });
    },
    /**
     * 确认授权
     */
    confirmAuth: function (param, fn) {
        $$app.getApi('/api/confirmAuth.json', param, function (res) {
            fn && fn(res);
        });
    }


});

module.exports = model;
