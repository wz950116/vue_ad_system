<template>
    <div class="info-wrapper contact">
        <h3 class="info-title">
            联系人信息
            <p class="tip">
                联系人信息将作为公司认证审核时的重要参考，我们会对您的个人隐私类信息进行保密。
            </p>
        </h3>
        <div class="info-content">
            <table class="info-table">
                <tr class="force-item" ref="itemContact">
                    <td class="name" valign="top">
                        联系人姓名：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.contactName}]">
                            <input class="contact-name" type="text" value="" v-model="form.contactName" maxlength="50" @blur="varifyConcat">
                            <p class="err-tip"></p>
                        </div>
                    </td>
                </tr>
                <tr class="force-item" ref="itemHomeAdd">
                    <td class="name" valign="top">联系地址：</td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.addressDetail}]">
                            <input class="address-text" type="text" value="" placeholder="请输入详细地址" v-model="form.addressDetail" @blur="varifyCity">
                            <p class="err-tip"></p>
                        </div>
                    </td>
                </tr>
                <tr class="force-item" ref="itemTel">
                    <td class="name" valign="top">
                        联系人手机号码：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.mobile}]">
                            <input class="contact-tel w295" type="text" value="" v-model="form.mobile" maxlength="11" @blur="varifyMobile">
                            <p class="err-tip">error</p>
                        </div>
                    </td>
                </tr>
                <tr class="force-item" ref="itemMail">
                    <td class="name" valign="top">
                        联系人邮箱：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.email}]">
                            <input class="contact-mail w295" type="text" value="" v-model="form.email" maxlength="50" @blur="varifyEmail">
                            <p class="err-tip">error</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="name" valign="top">
                        联系人QQ号：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.qq}]">
                            <input class="contact-qq w295" type="text" value="" v-model="form.qq" maxlength="50">
                            <p class="err-tip">error</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped>
    /*公共样式*/
    .info-wrapper{
        width: 870px;
        margin-bottom: 17px;
    }
    .info-wrapper .tip{
        display: inline-block;
        font-size: 12px;
        color: #999;
    }
    .info-wrapper .info-title{
        font-size: 16px;
        color: #333;
        border-bottom: 1px dashed #dfdfdf;
        line-height: 36px;
    }
    .info-wrapper .info-title:before{
        content: '';
        display: inline-block;
        width: 2px;
        height: 16px;
        margin-right: 5px;
        background: #e43;
        vertical-align: text-top;
    }
    .info-wrapper .info-title .tip{
        margin-left: 20px;
        font-size: 12px;
        color: #999;
    }
    .info-content{
        padding-top: 25px;
    }
    .info-table{
        width: 100%;
    }
    .info-table td{
        /*height: 40px;*/
        padding-bottom: 15px;
        line-height: 40px;
    }
    .info-table .name{
        width: 130px;
        font-size: 14px;
        color: #333;
        text-align: right;
    }
    .info-table .force-item .name::before{
        content: '*';
        display: inline-block;
        padding-right: 5px;
        color: #e43;
        vertical-align: middle;
    }
    /*输入栏*/
    .info-table input, .info-table .s-box{
        display: inline-block;
        height: 40px;
        /*padding: 0 22px 0 10px;*/
        box-sizing: border-box;
        border: 1px solid #dfdfdf;
        font-size: 14px;
        outline: none;
    }
    .info-table input{
        text-indent: 10px;
    }
    /*下拉菜单*/
    .info-table .s-box{
        position: relative;
        margin-right: 15px;
        background: #fff;
    }
    .info-table .s-box:hover .s-list{
        display: block;
    }
    .s-box .s-info{
        padding: 0 22px 0 10px;
        background: url('./images/select-arrow-d.png') no-repeat 92% center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .s-box .s-list{
        display: none;
        position: absolute;
        top: 39px;
        left: -1px;
        width: 100%;
        max-height: 195px;
        background: #fff;
        border: 1px solid #dfdfdf;
        border-top: none;
        z-index: 10;
        overflow: auto;
    }
    .s-box .s-list li{
        height: 40px;
        line-height: 40px;
        text-indent: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .s-box .s-list li:hover{
        background: #f7f7f7;
    }
    /*普通备注*/
    .info-table .tip{
        display: block;
        line-height: 30px;
    }
    /*错误提示*/
    .input-content.err .err-tip{
        display: inline-block;
    }
    .info-table .err-tip{
        display: none;
        height: 40px;
        min-width: 16px;
        padding-left: 30px;
        background: url('./images/icon-err.png') no-repeat 10px center;
        font-size: 12px;
        color: #e43;
        vertical-align: top;
    }
    .input-content.err input{
        background: #fdeceb;
        border-color: #e43;
    }
    .input-content.suc .err-tip{
        display: inline-block;
        background-image: url('./images/icon-suc.png');
    }
    .info-wrapper .hot{
        color: #e43;
    }
    /*联系人信息*/
    .info-table .company-name{
        width: 295px;
    }
    .id-box{
        float: left;
    }
    .id-box .s-box{
        width: 120px;
    }
    .id-text{
        width: 315px;
    }
    .address-detail-box .s-box{
        width: 140px;
    }
    .address-text{
        width: 457px;
    }
    .tel-check-btn{
        display: inline-block;
        width: 116px;
        height: 38px;
        margin-left: 12px;
        background: #f8f8f8;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
    }
    .tel-check-btn:hover{
        background-color: #eee;
    }
    .tel-check-btn.undo{
        background: #f8f8f8;
        color: #999;
        cursor: default;
    }
    .info-wrapper .w295{
        width: 295px;
    }
    .info-wrapper .w162{
        width: 162px;
    }
    /*图片上传*/
    .upload-box{
        overflow: hidden;
    }
    .upload-box .photo-show{
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }
    .upload-box .photo-show .photo-bak{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px dashed #dfdfdf;
        background: #f8f8f8;
        border-radius: 2px;
        line-height: 100px;
        text-align: center;
        font-size: 12px;
        color: #ccc;
    }
    .upload-box .photo-show .upload-img{
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }
    .upload-box .upload-info{
        float: left;
        padding-top: 5px;
    }
    .upload-box .upload-info .tip{
        width: 332px;
        line-height: 20px;
    }
    .upload-box .upload-info .upload-line{
        margin-top: 15px;
    }
    .upload-box .upload-info .upload-btn{
        display: inline-block;
        width: 116px;
        height: 38px;
        background: url('./images/icon-upload.png') #f8f8f8 no-repeat 10px center;
        border: 1px solid #dfdfdf;
        border-radius: 2px;
        text-indent: 45px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
    }
    .upload-box .upload-info .upload-btn:hover{
        background-color: #eee;
    }
    .upload-box .upload-info .upload-input{
        position: absolute;
        left: -10000000px;
        top: -10000000px;
        opacity: 0;
    }

</style>
<script>
    module.exports = {
            data: function () {
            return {
                //表单参数 - 错误状态
                formErrState: {
                    organizationName: false,
                    provinceId: false,
                    cityId: false,
                    addressDetail: false,
                    organizationCode: false,
                    licenceUrl: false,
                    authorizationUrl: false,
                    contactName: false,
                    cardType: false,
                    cardNo: false,
                    jobDescription: false,
                    mobile: false,
                    verifyCode: false,
                    email: false,
                    qq: false,
                    accountName: false,
                    introduction: false,
                    headUrl: false,
                    'document': false
                },
                //表单参数 - 初始化
                form: {
                    type: '',
                    organizationName: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    addressDetail: '',
                    organizationCode: '',
                    licenceUrl: '',
                    authorizationUrl: '',
                    contactName: '',
                    cardType: '',
                    cardNo: '',
                    jobDescription: '',
                    mobile: '',
                    verifyCode: '',
                    email: '',
                    qq: '',
                    accountName: '',
                    introduction: '',
                    headUrl: '',
                    'document': ''
                },
                mobileStatus: {
                    has: false,
                    value: ''
                },
                //必填项是否通过验证
                valid: true,
                //证件 - list
                idList: ['身份证','护照','港澳通行证','军官证'],
                //省 - list
                provinceList: [],
                //市 - list
                cityList: [],
                //县区 - list
                zoneList: [],
                //省 - 初始化
                curProvinceText: '',
                //市 - 初始化
                curCityText: '',
                //县区 - 初始化
                curZoneText: '',
                //证件 - 初始化
                curIdText: '',
                paperReg: /[a-zA-Z0-9]+/,
                getCodeText: '获取手机验证码',
                licenceUrlShow: '',
                authorizationUrlShow: ''
            }
        },
        props: {
            //表单类型
            type: ''
        },
        methods:{
            varifyConcat: function() {
                //联系人姓名
                if (this.form.contactName === '') {
                    this.valid = false;
                    this.formErrState.contactName = true;
                    this.$refs.itemContact.querySelector('.err-tip').innerHTML = '该项不能为空';
                } else {
                    this.formErrState.contactName = false;
                }
            },
            varifyCity: function() {
                //联系人地址
                if (this.form.addressDetail === '') {
                    this.valid = false;
                    this.formErrState.addressDetail = true;
                    this.$refs.itemHomeAdd.querySelector('.err-tip').innerHTML = '请输入地址信息';
                    //this.$refs.itemHomeAdd.querySelector('.err-tip').style.display = 'inline-block';

                } else {
                    this.formErrState.addressDetail = false;
                }

            },
            varifyMobile: function() {
                //手机
                if (!/^1[34578]\d{9}$/.test(this.form.mobile)) {
                    this.valid = false;
                    this.formErrState.mobile = true;
                    this.$refs.itemTel.querySelector('.err-tip').innerHTML = '请输入正确的手机号';
                } else {
                    this.formErrState.mobile = false;
                }
            },
            varifyEmail: function() {
                //邮箱
                if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.form.email)) {
                    this.valid = false;
                    this.formErrState.email = true;
                    this.$refs.itemMail.querySelector('.err-tip').innerHTML = '请输入正确的邮箱';
                } else {
                    this.formErrState.email = false;
                }

            },
            //验证必填项
            validate: function() {
                this.valid = true;
                this.varifyConcat();

                this.varifyCity();

                this.varifyMobile();

                this.varifyEmail();

                return this.valid;
            },
        },
    }
</script>
