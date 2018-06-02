<template>
    <div class="layer" v-if="companyDialog">
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <div class="layer-box">
            <div class="header">{{companyFormTitle}}<span v-on:click="closeCompany()" class="close"></span></div>
            <div class="form">
                <form :model="companyForm">
                    <div class="form-item global-clearfix">
                        <span class="label">公司名称：</span>
                        <div class="input-box input-txt">
                            <input type="text" class="input-txt-box" placeholder="需要与营业执照上完全一致" v-model="companyForm.name" />
                            <span class="input-error">请正确填写公司名称。</span>
                        </div>
                    </div>
                    <div class="form-item global-clearfix">
                        <span class="label">营业执照注册号：</span>
                        <div class="input-box input-txt">
                            <input type="text" class="input-txt-box" placeholder="需要与营业执照上完全一致" v-model="companyForm.zhucehao" />
                            <span class="input-error" v-show="comError.zhucehao==1">请填写正确的营业执照注册号。</span>
                            <span class="input-error" v-show="comError.zhucehao==2">请填写15位或者18位的营业执照注册号。</span>
                        </div>
                    </div>
                    <div class="form-item global-clearfix">
                        <span class="label">上传营业执照：</span>
                        <div class="invoicePicWrap" :style="{'z-index': 1}">
                            <img :src="companyForm.pic" class="invoicePic">
                        </div>
                        <div class="invoicePicWrap flash-upload" >
                            <a id='selectFiles4' href="javascript:;" class="invoiceUpload" :class="{uploaded:uploaded}" style=""></a>
                        </div>
                        <span class="input-error top" v-show="comError.pic==1">请上传正确的营业执照。</span>
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
</template>
<style scoped>
    .uploadTip {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        margin-left: 115px;
    }

    .uploadImg {
        width: 200px;
        height: 100px;
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

    .uploadWrap {
        width: 200px;
        height: 100px;
        position: relative;
        float: left;
    }

    input {
        border: 0;
        outline: none;
    }

    .layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
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
        height: 400px;
        margin-left: -250px;
        margin-top: -200px;
        background: #fff;
        border: 1px solid #D5D5D5;
        z-index: 100;
        opacity: 1;
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

    .form {
        margin: 18px 20px;
    }

    .form-item {
        position: relative;
        margin-bottom: 18px;
        font-size: 14px;
        line-height: 1;
        color: #4A4A4A;
    }

    .form-item .label {
        float: left;
        width: 115px;
        height: 40px;
        line-height: 40px;
        color: #4a4a4a;
        text-align: right;
    }

    .form-item .input-img {
        width: 342px;
        height: 100px;
        border: 1px solid #D5D5D5;
        cursor: pointer;
        overflow: hidden;
        background: #F8F8F8 url('images/big_jiahao.png') no-repeat center center;
    }

    .form-item .input-img input {
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .form-item .upload-img {
        position: relative;
        margin-left: 115px;
        width: 184px;
        height: 100px;
        cursor: pointer;
    }

    .form-item .upload-img img {
        width: 100%;
        height: 100%;
    }

    .form-item .upload-img:hover .img-layer {
        display: -webkit-box;
    }

    .form-item .upload-img .img-layer {
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

    .form-item .upload-img .img-layer:before {
        content: '';
        display: inline-block;
        margin-right: 5px;
        width: 16px;
        height: 16px;
        background: url('images/update.png') no-repeat center center;
    }

    .invoiceUpload {
        display: inline-block;
        width: 200px;
        height: 100px;
        background: url('./images/add-img.png') no-repeat 0px 0px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .invoiceUploaded {
        filter: alpha(opacity=0);
        -moz-opacity: 0;
        opacity: 0;
    }

    .invoiceUploaded:hover {
        filter: alpha(opacity=90);
        -moz-opacity: 0.9;
        opacity: 0.9;
    }

    .invoicePicWrap {
        display: inline-block;
        width: 200px;
        height: 100px;
        position: relative;
        vertical-align: top;
        margin: 0 0;
    }

    .invoicePic {
        width: 200px;
        height: 100px;
    }

    .flash-upload {
        position: absolute;
        left: 114px;
        z-index: 2;
    }

    .form-item .tip {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        margin: 10px 0 0 90px;
    }

    .form-item .input-box {
        margin-left: 74px;
    }

    .form-item .input-txt {
        padding-left: 10px;
        height: 38px;
        font-size: 14px;
        color: #666;
        border: 1px solid #D5D5D5;
        overflow: hidden;
    }

    .form-item .input-txt-box {
        display: block;
        width: 333px;
        height: 38px;
    }

    .form-item .input-check {
        margin-bottom: 8px;
    }

    .form-item .input-select {
        margin-bottom: 8px;
    }

    .form-item .select-para {
        float: left;
        width: 248px;
        height: 38px;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
    }

    .form-item .select-para .select-value {
        display: inline-block;
        padding-left: 10px;
        width: 220px;
        line-height: 38px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .form-item .select-para .ico {
        display: inline-block;
        width: 17px;
        height: 38px;
        background: #eee;
        border-left: 1px solid #D5D5D5;
    }

    .form-item .select-para .ico-arrow {
        display: block;
        margin: 17px 6px;
        width: 0;
        height: 0;
        border-width: 4px 4px 0 4px;
        border-color: #999 #eee #eee #eee;
        border-style: solid;
    }

    .form-item .input-select .add-btn {
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

    .form-item .input-box .input-select-cnt {
        display: none;
    }

    .submit {
        margin-top: 27px;
    }

    .submit-btn-ok,
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

    .submit-btn-ok {
        background: #FF6246;
        color: #fff;
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
    .company-list .ico-layer {
        display: none;
        position: absolute;
        left: 40px;
        top: 8px;
        padding-right: 5px;
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        border-radius: 2px;
        font-size: 12px;
        letter-spacing: 0px;
    }
    .company-list .ico:hover + .ico-layer {
        display: block;
    }

    .company-list .ico-layer:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin: 5px 5px 0 -5px;
        border-width: 5px 5px 5px 0;
        border-style: solid;
        border-color: #fff #d0f1ad #fff #fff;
    }

    .company-list .company-status-1 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #FEC86F;
        color: #975F03
    }

    .company-list .company-status-1 .ico-layer:before {
        border-right-color: #FEC86F;
    }
    .company-list .company-status-2 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #d0f1ad;
        color: #346102;
    }

    .company-list .company-status-2 .ico-layer:before {
        border-right-color: #d0f1ad;
    }
    .company-list .company-status-3 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #FBCAC5;;
        color: #B71D0E;
    }

    .company-list .company-status-3 .ico-layer:before {
        border-right-color: #FBCAC5;
    }
</style>
<script>
var $$upload = require('../../lib/lib-upload');
var $$agent = require('../../script/data/model/agent.js');
var uploadUrl = require('../../lib/uploadurl.js');
var alert = require('../alert/alert');
module.exports = {
    data: function () {
        return {
            companyDialog: false,
            companyForm: {
                name: '',
                zhucehao: '',
                pic: '',
                isPic: false
            },
            comError: {
                name: 0,
                zhucehao: 0,
                pic: 0
            },
            alert: {
                show: false,
                message: '',
                status: 0
            },
            uploaded: false,
            addCompanyAjaxLimit: false,
            formType:1
        }
    },
    components: {
        alert: alert
    },
    watch: {
        companyDialog: function (newVal) {
            if (newVal === true) {
                setTimeout(this.uploadImg);
            }
        }
    },
    computed: {
        companyFormTitle: function () {
            if(this.formType === 1) {
                return '新建公司';
            } else if (this.formType === 2) {
                return '编辑公司';
            } else {
                return;
            }
        }
    },
    methods: {
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        closeCompany: function () {
            this.companyDialog = false;
        },
        submitCompany: function() {
            var self = this;
            if (this.addCompanyAjaxLimit) {
                return;
            }
            for (var key in this.comError) {
                this.comError[key] = 0;
            }
            if (this.companyForm.name.trim() == "") {
                this.comError.name = 1;
                this.alertShow(1, '请正确填写公司名称。');
                return;
            }
            if (this.companyForm.zhucehao.trim() == "") {
                this.comError.zhucehao = 1;
                this.alertShow(1, '请填写正确的营业执照注册号。');
                return;
            }
            if (this.companyForm.zhucehao.trim().length !== 15 && this.companyForm.zhucehao.trim().length !== 18) {
                this.comError.zhucehao = 2;
                this.alertShow(1, '请填写15位或者18位的营业执照注册号。');
                return;
            }
            if (this.companyForm.pic == "") {
                this.comError.pic = 1;
                this.alertShow(1, '请上传正确的营业执照。');
                return;
            }
            this.addCompanyAjaxLimit = true;
            if(this.formType === 1){
                $$agent.createSubCustomer({
                    name: this.companyForm.name,
                    license_number: this.companyForm.zhucehao,
                    license_image: this.companyForm.pic
                },function(res){
                    if(res.code == 200) {
                        if(res.data.updateResult === "1"){
                            self.alertShow(0, "添加成功！");
                            self.companyDialog = false;
                            self.addCompanyAjaxLimit = false;
                        } else {
                            self.alertShow(1, res.msg);
                        }
                    }
                });
            } else if (this.formType === 2) {
                $$agent.editSubCustomer({
                    childDemanderId: this.$parent.customer_id,
                    company: this.companyForm.name,
                    businessLicenceCode: this.companyForm.zhucehao,
                    businessLicenceUrl: this.companyForm.pic
                },function (res) {
                    if(res.code == 200){
                        if(res.data.updateResult === "1") {
                            self.alertShow(0, '修改成功');
                            self.companyDialog = false;
                            self.addCompanyAjaxLimit = false;
                        } else {
                            self.alertShow(1, res.msg);
                        }
                    }
                });
            }
        },
        uploadImg: function () {
            var self = this;
            $$upload({
                id: '#selectFiles4',
                uploadUrl: uploadUrl,
                fileName: 'file',
                min: 0,
                max: 1024 * 1024,
                type: '*',
                fn: function(res) {
                    if (res.code === -110) {
                        self.alertShow(1, '图片超过1M！');
                    } else if (res.code === 0) {
                        self.comError.pic = 0;
                        self.companyForm.pic = res.data.url;
                        self.companyForm.isPic = true;
                        self.uploaded = true;
                    } else {
                        self.alertShow(1, res.msg);
                    }
                }
            });
        }
    }
}
</script>