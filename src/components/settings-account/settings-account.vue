<template>
    <div class="account-wrap">
        <div class="account-info">
            <div class="info-title">
                <span class="info-title-text">账户信息</span>
            </div>
            <div class="info-content">
                <p>
                    <span class="w-92">公司名称:</span>
                    <span class=" m-l-30 company-name">{{infoContent.companyName}}</span>
                </p>
                <p><span class="w-92">账号类型:</span><span class="m-l-30 account-type">{{infoContent.accountType.label}}</span>
                </p>
                <p><span class="w-92">账号状态:</span><span class="m-l-30" v-bind:class="{ 'account-status': status.isActive }">{{status.text}}</span>
                </p>
                <p><span class="w-92">社会信用代码:</span><span class="m-l-30 society-code">{{infoContent.societyCode}}</span>
                </p>
                <p><span class="w-92">登录手机号:</span><span class="m-l-30 tel">{{infoContent.tel}}</span><a href="http://i.focus.cn/view/user/pw" target="_blank" class="modify-psd">修改密码</a>
                </p>
                <span class="reupload" v-if="status.isActive=='1'" v-on:click='reupload'>重新上传资料</span>
                <span class="reupload dis-reupload" v-if="status.isActive=='2'">重新上传资料</span>
            </div>
        </div>
        <div class="contact-info">
            <div class="info-title">
                <span class="info-title-text">联系信息</span>
            </div>
            <div class="info-content">
                <p><span class="w-92">联系人:</span><span class=" m-l-30 company-name" v-if="!edit">{{contactInfo.contact}}</span>
                    <input class="m-l-30 edit-input" v-if="edit" v-model="contactInfoModify.contact" v-on:blur="isNull(contactInfoModify.contact,'contact')" />
                    <span v-if="checkRule.contactError" class="error-info"><i class="error-icon"></i>请输入正确的联系人</span>
                    <span v-if="checkRule.contactRight" class="right-info"><i class="right-icon"></i></span>
                </p>
                <p><span class="w-92">电话:</span><span class="m-l-30 account-type" v-if="!edit">{{contactInfo.tel}}</span>
                    <input class="m-l-30 edit-input" v-if="edit" v-model="contactInfoModify.tel" v-on:blur="isPhone(contactInfoModify.tel)" />
                    <span v-if="checkRule.telError" class="error-info"><i class="error-icon"></i>请输入正确的电话</span>
                    <span v-if="checkRule.telRight" class="right-info"><i class="right-icon"></i></span>
                </p>
                <p><span class="w-92">QQ:</span><span class="m-l-30" v-if="!edit">{{contactInfo.QQ}}</span>
                    <input class="m-l-30 edit-input" v-if="edit" v-model="contactInfoModify.QQ" v-on:blur="isNull(contactInfoModify.QQ,'qq')" />
                    <span v-if="checkRule.qqError" class="error-info"><i class="error-icon"></i>请输入正确的QQ</span>
                    <span v-if="checkRule.qqRight" class="right-info"><i class="right-icon"></i></span>
                </p>
                <p><span class="w-92">邮箱:</span><span class="m-l-30 society-code" v-if="!edit">{{contactInfo.email}}</span>
                    <input class="m-l-30 edit-input" v-if="edit" v-model="contactInfoModify.email" v-on:blur="isEmail(contactInfoModify.email)" />
                    <span v-if="checkRule.mailError" class="error-info"><i class="error-icon"></i>请输入正确的邮箱</span>
                    <span v-if="checkRule.mailRight" class="right-info"><i class="right-icon"></i></span>
                </p>
                <p><span class="w-92">通讯地址:</span><span class="m-l-30 tel" v-if="!edit">{{contactInfo.address}}</span>
                    <input class="m-l-30 edit-input" v-if="edit" v-model="contactInfoModify.address" v-on:blur="isNull(contactInfoModify.address,'address')" />
                    <span v-if="checkRule.addressError" class="error-info"><i class="error-icon"></i>请输入正确的通讯地址</span>
                    <span v-if="checkRule.addressRight" class="right-info"><i class="right-icon"></i></span>
                </p>
                <span class="edit" v-on:click='editFn' v-bind:class="{ cancel: editText.isActive }" v-if="!edit">{{editText.text}}</span>
                <span class="cancel" v-on:click='cancel' v-if="edit">取消</span>
                <span class="preserve" v-on:click='preserveFn' v-if="edit">保存</span>
            </div>
        </div>
        <div class="contact-info" v-show="contactInfoShow">
            <div class="info-title">
                <span class="info-title-text">推广顾问</span>
            </div>
            <div class="info-content">
                <p v-show="submit" class="margin-0"><span class="w-92">添加推广码:</span>
                    <input type="text" class="promote" v-model="promoteCode" />
                    <span class="submit" v-on:click="submitFn">提交申请</span>
                </p>
                <p v-show="!submit"><span class="w-92">推广顾问:</span><span class=" m-l-30 company-name">{{promoteName}}</span>
                </p>
                <p v-show="!submit"><span class="w-92">联系电话:</span>
                    <span class=" m-l-30 company-name">{{promotePhone}}</span>
                </p>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <!--layer for upziliao-->
        <div class="layer" v-show="reUpInfoDialog.show">
            <div class="layer-box">
                <div class="header">新建公司<span v-on:click="closeCompany()" class="close"></span></div>
                <div class="form">
                    <form :model="reUpInfoDialog.companyForm">
                        <div class="form-item global-clearfix">
                            <span class="label">公司名称：</span>
                            <div class="input-box input-txt">
                                <input type="text" class="input-txt-box" placeholder="需要与营业执照上完全一致" v-model="reUpInfoDialog.companyForm.name" />
                            </div>
                            <span class="input-error" v-if="reUpInfoDialog.comError.name===1">请正确填写公司名称。</span>
                        </div>
                        <div class="form-item global-clearfix">
                            <span class="label">社会信用代码：</span>
                            <div class="input-box input-txt">
                                <input type="text" class="input-txt-box" placeholder="需要与营业执照上完全一致" v-model="reUpInfoDialog.companyForm.societyCreditCode" />
                            </div>
                            <span class="input-error" v-if="reUpInfoDialog.comError.societyCreditCode===1">请填写正确的营业执照注册号。</span>
                        </div>
                        <div class="form-item global-clearfix">
                            <span class="label">上传营业执照：</span>
                            <div class="uploadWrap">
                                <a id="selectFiles4" href="javascript:;" name="file" class="uploads" :class="{uploaded:uploaded}"></a>
                                <img :src="reUpInfoDialog.companyForm.pic" class="uploadImg">
                            </div>
                            <span class="input-error top" v-if="reUpInfoDialog.comError.pic===1">请上传正确的营业执照。</span>
                        </div>
                        <p class="uploadTip">请上传营业执照，支持jpg和png格式，文件需要小于1M。</p>
                        <div class="submit global-clearfix">
                            <a href="javascript:;" class="submit-btn-ok" v-on:click="submitCompany()">确认</a>
                            <a href="javascript:;" class="submit-btn-cancel" v-on:click="closeCompany()">取消</a>
                        </div>
                    </form>
                </div>
            </div>
            <div class="layer-bg"></div>
        </div>
    </div>
</template>
<style scoped>
.uploadTip {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #999;
    margin-left: 115px;
}

.uploads {
    display: inline-block;
    width: 200px;
    height: 100px;
    background: url('./images/add-img.png') no-repeat 0px 0px;
    position: absolute;
    top: 0px;
    left: 0px;
}

.uploaded {
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    opacity: 0;
}

.uploaded:hover {
    filter: alpha(opacity=90);
    -moz-opacity: 0.9;
    opacity: 0.9;
}

.uploadImg {
    width: 200px;
    height: 100px;
}

.uploadWrap {
    width: 200px;
    height: 100px;
    position: relative;
    float: left;
}

.account-wrap {
    background-color: rgb(250, 250, 250);
    overflow: hidden;
    padding: 40px 90px 60px 40px;
}

.account-info {
    margin-bottom: 30px;
}

.contact-info {
    margin-bottom: 30px;
}

.info-title {
    height: 35px;
    border-bottom: 1px solid rgb(221, 221, 221);
    font-size: 0;
}

.info-title-text {
    display: inline-block;
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    border-left: 2px solid rgb(252, 99, 77);
    padding-left: 11px;
}

.info-content {
    margin-top: 42px;
    font-size: 0;
}

.info-content p {
    margin-bottom: 30px;
}

.info-content span {
    font-size: 14px;
}

.account-status {
    color: red;
}

.m-l-30 {
    margin-left: 30px;
}

.w-92 {
    width: 92px;
    display: inline-block;
    text-align: right;
}

.modify-psd {
    cursor: pointer;
    margin-left: 38px;
    padding: 6px 12px;
    font-size: 14px;
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(213, 213, 213);
    color: #333333;
}

.reupload {
    cursor: pointer;
    padding: 11px 10px 13px;
    font-size: 14px;
    background-color: rgb(252, 99, 77);
    border: 1px solid rgb(233, 83, 62);
    color: #fff;
    display: inline-block;
}

.dis-reupload {
    background: #999;
    border: 1px solid #999;
    font-size: #333;
    cursor: auto;
}

.edit {
    cursor: pointer;
    padding: 11px 38px 13px;
    font-size: 14px;
    background-color: rgb(252, 99, 77);
    border: 1px solid rgb(233, 83, 62);
    color: #fff;
    display: inline-block;
}

.cancel {
    cursor: pointer;
    padding: 11px 38px 13px;
    font-size: 14px;
    background-color: rgb(252, 99, 77);
    border: 1px solid rgb(233, 83, 62);
    color: #fff;
    display: inline-block;
}

.promote {
    width: 198px;
    font-size: 14px;
    height: 14px;
    padding: 12px 0;
    border: 1px solid rgb(213, 213, 213);
    margin-left: 31px;
}

.submit {
    background-color: rgb(252, 99, 77);
    color: #fff;
    font-size: 14px;
    padding: 12px 25px 14px;
    margin-left: 20px;
    cursor: pointer;
}

.edit-input {
    width: 224px;
    font-size: 14px;
    padding: 4px 5px;
    border: rgb(213, 213, 213) 1px solid;
}

.preserve {
    margin-left: 15px;
    cursor: pointer;
    padding: 11px 38px 13px;
    font-size: 14px;
    background-color: rgb(252, 99, 77);
    border: 1px solid rgb(233, 83, 62);
    color: #fff;
    display: inline-block;
}

.cancel {
    background-color: #f6f6f6;
    color: #333333;
    border-color: #d5d5d5;
}

.margin-0 {
    margin-bottom: 0!important;
}

.success {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 176px;
    height: 58px;
    border: rgb(204, 204, 204) 1px solid;
    background-color: rgb(255, 255, 255);
    margin-top: -30px;
    margin-left: -89px;
    font-size: 0;
}

.success-text {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    width: 143px;
    background: url('./images/ok.png') no-repeat 0px center;
    margin-left: 18px;
    text-indent: 31px;
}

.fail {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 244px;
    height: 58px;
    border: rgb(204, 204, 204) 1px solid;
    background-color: rgb(255, 255, 255);
    margin-top: -30px;
    margin-left: -123px;
    font-size: 0;
}

.fail-text {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    display: inline-block;
    width: 196px;
    background: url('./images/fail.png') no-repeat 0px center;
    margin-left: 25px;
    text-indent: 31px;
}

.font-14 {
    font-size: 14px;
}

.layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1999;
    display: block;
}

.layer-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #333;
    opacity: 0.5;
    z-index: 10;
}

.layer-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background: #fff;
    border: 1px solid #D5D5D5;
    z-index: 100;
}

.layer-box .header {
    padding-left: 20px;
    height: 48px;
    line-height: 48px;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #d5d5d5;
    text-align: left;
}

.layer-box .close {
    content: '';
    display: block;
    float: right;
    margin: 18px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    background: url('images/guanbi.png') no-repeat center center;
}

.layer .form {
    margin: 18px 20px;
}

.layer .form-item {
    position: relative;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 1;
    color: #4A4A4A;
}

.layer .form-item .label {
    float: left;
    width: 115px;
    height: 40px;
    line-height: 40px;
    color: #4a4a4a;
    text-align: right;
}

.layer .form-item .input-img {
    width: 342px;
    height: 100px;
    border: 1px solid #D5D5D5;
    cursor: pointer;
    overflow: hidden;
    background: #F8F8F8 url('images/big_jiahao.png') no-repeat center center;
}

.layer .form-item .input-img input {
    width: 100%;
    height: 100%;
    opacity: 0;
}

.layer .form-item .upload-img {
    position: relative;
    margin-left: 115px;
    width: 184px;
    height: 100px;
    cursor: pointer;
}

.layer .form-item .upload-img img {
    width: 100%;
    height: 100%;
}

.layer .form-item .upload-img:hover .img-layer {
    display: -webkit-box;
}

.layer .form-item .upload-img .img-layer {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    background: rgba(51, 51, 51, 0.5);
}

.layer .form-item .upload-img .img-layer:before {
    content: '';
    display: inline-block;
    margin-right: 5px;
    width: 16px;
    height: 16px;
    background: url('images/update.png') no-repeat center center;
}

.layer .form-item .tip {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #999;
    margin: 10px 0 0 115px;
}

.layer .form-item .input-box {
    margin-left: 74px;
}

.layer .form-item .input-txt {
    position: relative;
    height: 38px;
    font-size: 14px;
    color: #666;
    border: 1px solid #D5D5D5;
    overflow: hidden;
}

.layer .form-item .input-txt-box {
    display: block;
    width: 100%;
    height: 38px;
    padding-left: 10px;
}

.layer .form-item .input-check {
    margin-bottom: 8px;
}

.layer .form-item .input-select {
    margin-bottom: 8px;
}

.layer .form-item .select-para {
    float: left;
    width: 248px;
    height: 38px;
    background: #F6F6F6;
    border: 1px solid #D5D5D5;
}

.layer .form-item .select-para .select-value {
    display: inline-block;
    padding-left: 10px;
    width: 220px;
    line-height: 38px;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.layer .form-item .select-para .ico {
    display: inline-block;
    width: 17px;
    height: 38px;
    background: #eee;
    border-left: 1px solid #D5D5D5;
}

.layer .form-item .select-para .ico-arrow {
    display: block;
    margin: 17px 6px;
    width: 0;
    height: 0;
    border-width: 4px 4px 0 4px;
    border-color: #999 #eee #eee #eee;
    border-style: solid;
}

.layer .form-item .input-select .add-btn {
    display: block;
    margin-left: 270px;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color: #4A4A4A;
    text-align: center;
    background: #F6F6F6;
    border: 1px solid #D5D5D5;
    border-radius: 2px;
}

.layer .form-item .input-box .input-select-cnt {
    display: none;
}

.layer .submit {
    margin-top: 27px;
    background-color: #fff;
}

.layer .submit-btn-ok,
.submit-btn-cancel {
    float: right;
    margin-left: 20px;
    padding: 10px 26px;
    font-size: 14px;
    color: #4A4A4A;
    background: #F6F6F6;
    border: 1px solid #D5D5D5;
    border-radius: 2px;
}

.layer .submit-btn-ok {
    background: #FF6246;
    color: #fff;
}

.layer .input-error {
    position: absolute;
    left: 115px;
    top: 42px;
    color: red;
    font-size: 12px;
}

.layer .input-error.top {
    position: absolute;
    left: 115px;
    top: 137px;
    color: red;
    font-size: 12px;
}

.re-upload {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

.error-info {
    color: #e43;
}

.error-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('./images/error-icon.png') no-repeat;
    vertical-align: -4px;
    margin-right: 8px;
    margin-left: 8px;
}

.right-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('./images/right-icon.png') no-repeat;
    vertical-align: -4px;
    margin-left: 8px;
}
</style>
<script>
var _ = require('../../lib/underscore.v1.8.3.js');
var $$settingsModel = require('../../script/data/model/settings.js');
var alert = require('../alert/alert');
var $user = require('../../script/data/model/user.js');
var $$upload = require('../../lib/upload.js');
var uploadUrl = require('../../lib/uploadurl.js');
var companyId = "";
module.exports = {
    data: function() {
        return {
            cid: "",
            res: false,
            status: {
                isActive: '1',
                text: "未认证"
            },
            contactInfo: {
                contact: "",
                tel: "",
                QQ: "",
                email: "",
                address: ""
            },
            contactInfoModify: {
                contact: "",
                tel: "",
                QQ: "",
                email: "",
                address: ""
            },
            infoContent: {
                companyName: "",
                accountType: {
                    label: "",
                    value: ""
                },
                societyCode: "",
                tel: "",
                status: ""
            },
            edit: false,
            submit: true,
            editText: {
                text: "编辑",
                isActive: false
            },
            promoteCode: "",
            promoteName: "",
            promotePhone: "",

            reUpInfoDialog: {
                show: false,
                companyForm: {
                    name: '',
                    societyCreditCode: '',
                    pic: '',
                    isPic: false
                },
                comError: {
                    name: 0,
                    societyCreditCode: 0,
                    pic: 0
                }
            },
            alert: {
                show: false,
                message: '',
                status: 0
            },
            checkRule: {
                contactError: false,
                contactRight: false,
                addressError: false,
                addressRight: false,
                mailError: false,
                mailRight: false,
                telError: false,
                telRight: false,
                qqError: false,
                qqRight: false
            },
            accountTypeChn: {
                '0': '直客',
                '1': '代理商',
                '2': '子客'
            },
            uploaded: false,
            contactInfoShow: true,
            firstRefresh: true
        }
    },
    components: {
        alert: alert
    },
    created: function() {
        if (!!(this.$route.params.cid)) {
            companyId = this.$route.params.cid;
        } else {
            companyId = '';
        }
    },
    activated: function() {
        var data = $user.getCurrentInfo().data;
        if (!this.firstRefresh) {
            this.getInfo();
        }
        if (vueRouter.app._route.params.cid || parseInt(data.userType) === 2) {
            this.contactInfoShow = false;
        }
    },
    beforeMount: function() {
        this.getInfo();
        this.firstRefresh = false;
    },
    methods: {
        getInfo: function() {
            var _this = this;
            $$settingsModel.getAccountInfo(_this.wrapCid({}), function(res) {
                if (res.code !== '200') {
                    return;
                }
                _this.contactInfo = {
                    contact: res.data.contactManName,
                    tel: res.data.contactMobile,
                    QQ: res.data.contactQq,
                    email: res.data.contactMail,
                    address: res.data.contactAddress
                };
                _this.contactInfoModify = _.extend({}, _this.contactInfo);

                _this.infoContent = {
                    companyName: res.data.companyName,
                    accountType: {
                        label: _this.accountTypeChn[res.data.accountType],
                        value: parseInt(res.data.accountType)
                    },
                    societyCode: res.data.societyCreditCode,
                    tel: res.data.logMobile,
                    status: res.data.status
                };
                if (parseInt(res.data.status) === 2) {
                    _this.status.text = "审核已通过";
                    _this.status.isActive = 0;
                } else if (parseInt(res.data.status) === 1) {
                    _this.status.text = "正在审核中";
                    _this.status.isActive = 1;
                } else if (parseInt(res.data.status) === 3) {
                    _this.status.text = "审核未通过";
                    _this.status.isActive = 1;
                }
                if (JSON.parse(res.data.salesInfo).salesmanName) {
                    _this.promoteName = JSON.parse(res.data.salesInfo).salesmanName;
                    _this.promotePhone = JSON.parse(res.data.salesInfo).salesmanPhone;
                    _this.submit = false;
                }
            });
        },
        wrapCid: function(data) {
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        },
        toastShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        reupload: function() {
            var _self = this;
            _self.reUpInfoDialog.show = true;
            $$upload($('#selectFiles4'), uploadUrl, function(res) {
                if (parseInt(res) === -110) {
                    self.toastShow(1, '图片超过1M！');
                } else if (JSON.parse(res).code === 0) {
                    _self.reUpInfoDialog.companyForm.pic = JSON.parse(res).data.url;
                    _self.reUpInfoDialog.companyForm.isPic = true;
                    _self.uploaded = true;
                } else {
                    _self.toastShow(1, JSON.parse(res).msg);
                }
            });
        },
        editFn: function(status) {
            var _self = this;
            _self.edit = true;
            _self.editText.isActive = true;
            _.extend(_self.contactInfoModify, _self.contactInfo);
        },
        submitFn: function() {
            var _self = this;
            if (_self.promoteCode === '') {
                _self.toastShow(1, '推广码不能为空');
                return;
            }
            $$settingsModel.on('addPromotionCode', function(res) {
                if (res.code === '200') {
                    _self.toastShow(0, '信息提交成功。');
                    _self.promoteName = res.data.salesmanName;
                    _self.promotePhone = res.data.salesmanPhone;
                    _self.submit = false;
                } else {
                    if (res.code === '300') {
                        _self.toastShow(1, '推广码不正确,请重试！');
                        return;
                    }else {
                        _self.toastShow(1, '信息提交失败,请重试！');
                        return;
                    }
                    
                }
            });
            $$settingsModel.addPromotionCode(_self.wrapCid({
                'salesCode': _self.promoteCode
            }));

        },
        preserveFn: function() {
            var _self = this;
            if (this.checkRule.contactError || this.checkRule.telError || this.checkRule.qqError || this.checkRule.mailError || this.checkRule.addressError) {
                return;
            } else {
                $$settingsModel.on('setContactInfo', function(res) {
                    if (res.code !== '200') {
                        return;
                    }
                    _self.edit = false;
                    _self.editText.isActive = false;
                    _.extend(_self.contactInfo, _self.contactInfoModify);
                    for (keys in _self.checkRule) {
                        _self.checkRule[keys] = false;
                    }
                    _self.toastShow(0, '保存成功');
                });
                $$settingsModel.setContactInfo(_self.wrapCid({
                    contactName: _self.contactInfoModify.contact,
                    mobile: _self.contactInfoModify.tel,
                    qq: _self.contactInfoModify.QQ,
                    email: _self.contactInfoModify.email,
                    address: _self.contactInfoModify.address
                }));
            }
        },
        cancel: function() {
            var _self = this;
            _self.edit = false;
            _self.editText.isActive = false;
            for (var item in _self.checkRule) {
                _self.checkRule[item] = false;
            }
        },
        submitCompany: function() {
            var _this = this;
            var checkOk = true;
            for (var key in _this.reUpInfoDialog.comError) {
                _this.reUpInfoDialog.comError[key] = 0;
            }
            if (_this.reUpInfoDialog.companyForm.name === "") {
                _this.reUpInfoDialog.comError.name = 1;
                return;
            }
            if (_this.reUpInfoDialog.companyForm.societyCreditCode === "") {
                _this.reUpInfoDialog.comError.societyCreditCode = 1;
                return;
            }
            if (_this.reUpInfoDialog.companyForm.pic === "") {
                _this.reUpInfoDialog.comError.pic = 1;
                return;
            }
            var data = {
                company: _this.reUpInfoDialog.companyForm.name,
                businessLicenceCode: _this.reUpInfoDialog.companyForm.societyCreditCode,
                areaCode: null,
                businessLicenceUrl: _this.reUpInfoDialog.companyForm.pic
            };

            if (checkOk === false) {
                return;
            }
            $$settingsModel.reUpdateAccountInfo(_this.wrapCid(data), function(res) {
                _this.reUpInfoDialog.show = false;
                if (res.code === '200') {
                    _this.infoContent.companyName = _this.reUpInfoDialog.companyForm.name;
                    _this.infoContent.societyCode = _this.reUpInfoDialog.companyForm.societyCreditCode;
                    _this.toastShow(0, '上传资料成功');
                    _this.status.isActive = '2';
                    _this.status.text = "审核中";

                } else {
                    _this.toastShow(1, '上传资料失败,请重试！');
                }
            });
        },
        closeCompany: function() {
            this.reUpInfoDialog.show = false;
        },
        isNull: function(info, type) {
            if (info == '') {
                this.checkRule[type + 'Error'] = true;
                this.checkRule[type + 'Right'] = false;
            } else {
                this.checkRule[type + 'Error'] = false;
                this.checkRule[type + 'Right'] = true;
            }
        },
        isEmail: function(str) {
            var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (reg.test(str)) {
                this.checkRule.mailError = false;
                this.checkRule.mailRight = true;
            } else {
                this.checkRule.mailError = true;
                this.checkRule.mailRight = false;
            }
        },
        isPhone: function(str) {
            var reg = /^1[3|4|5|7|8]\d{9}$/;
            if (reg.test(str)) {
                this.checkRule.telError = false;
                this.checkRule.telRight = true;
            } else {
                this.checkRule.telError = true;
                this.checkRule.telRight = false;
            }
        },
    }
};
</script>
