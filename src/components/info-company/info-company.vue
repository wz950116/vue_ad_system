<template>
    <div class="info-wrapper company">
        <h3 class="info-title">
            公司信息
            <p class="tip">
                公司信息所提交的资料仅用于您在平台进行认证审核所用，我们会对隐私类资料进行保密。
            </p>
        </h3>
        <div class="info-content">
            <table class="info-table">
                <tr class="force-item" ref="itemCompany">
                    <td class="name" valign="top">
                        公司名称：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.organizationName}]">
                            <input class="w295" type="text" value="" v-model="form.organizationName"
                                   @blur="varifyOrgName" maxlength="100">
                            <p class="err-tip">error</p>
                        </div>
                        <p class="tip">
                            请与营业执照名称保持一致
                        </p>
                    </td>
                </tr>
                <tr class="force-item" ref="itemAddress">
                    <td class="name" valign="top">
                        公司地址：
                    </td>
                    <td class="info">
                        <div class="address-detail-box">
                            <div class="s-box">
                                <div class="s-info">
                                    {{ curProvinceText === '' ? '省/市' : curProvinceText }}
                                </div>
                                <ul class="s-list" v-if="provinceList.length > 0">
                                    <li v-for="(item, index) in provinceList" :key="index"
                                        @click="queryAreaInfoFn('city', item.provinceName, item.provinceId)">
                                        {{item.provinceName}}
                                    </li>
                                </ul>
                            </div>
                            <div class="s-box">
                                <div class="s-info">
                                    {{ curCityText === '' ? '市/地区' : curCityText }}
                                </div>
                                <ul class="s-list" v-if="cityList.length > 0">
                                    <li v-for="(item, index) in cityList" :key="index"
                                        @click="queryAreaInfoFn('zone', item.cityName, item.cityId)">{{item.cityName}}
                                    </li>
                                </ul>
                            </div>
                            <p class="err-tip">error</p>
                        </div>
                    </td>
                </tr>
                <tr class="force-item" ref="itemZCCode">
                    <td class="name" valign="top">
                        营业执照注册号：
                    </td>
                    <td class="info">
                        <div :class="['input-content', {err: formErrState.organizationCode}]">
                            <input class="w295" type="text" value="" v-model="form.organizationCode"
                                   @blur="varifyOrgCode">
                            <p class="err-tip">error</p>
                        </div>
                        <p class="tip">
                            请输入15位营业执照注册号或18位统一社会信用代码。
                        </p>
                    </td>
                </tr>
                <tr class="force-item" ref="itemZzSM">
                    <td class="name" valign="top">
                        营业执照扫描件：
                    </td>

                    <td class="upload-box">
                        <div class="qulification">
                            <div v-if="form.licenceUrl" class="qulification-img-wrap">
                                <img class="qulification-img" :src="this.form.licenceUrl"
                                     v-bind:style="{filter: 'blur('+filterSize+'px)'}">
                            </div>
                            <div class="m-l-20">
                                <p class="qulification-img-tip">
                                    上传公司营业执照文件，一次只能上传一个文件。要求格式为：jpeg、png、jpg格式，且大小小于2.5M。</p>
                                <p class="upload-error" v-show="showError">{{showErrorText}}</p>
                                <a id="selectFilesInput" href="javascript:;" class="qulification-upload">
                                </a>
                            </div>
                            <p class="err-tip">error</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <!-- {{form}} -->
    </div>
</template>
<style scoped>

    /*公共样式*/
    .info-wrapper {
        width: 870px;
        margin-bottom: 17px;
    }

    .info-wrapper .tip {
        display: inline-block;
        font-size: 12px;
        color: #999;
    }

    .info-wrapper .info-title {
        font-size: 16px;
        color: #333;
        border-bottom: 1px dashed #dfdfdf;
        line-height: 36px;
    }

    .info-wrapper .info-title:before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 16px;
        margin-right: 5px;
        background: #e43;
        vertical-align: text-top;
    }

    .info-wrapper .tip {
        font-size: 12px;
        color: #999;
    }

    .info-wrapper .info-title .tip {
        margin-left: 20px;
        font-size: 12px;
        color: #999;
    }

    .info-content {
        padding-top: 25px;
    }

    .info-table {
        width: 100%;
    }

    .info-table td {
        /*height: 40px;*/
        padding-bottom: 15px;
        line-height: 40px;
    }

    .info-table .name {
        width: 130px;
        font-size: 14px;
        color: #333;
        text-align: right;
    }

    .info-table .force-item .name::before {
        content: '*';
        display: inline-block;
        padding-right: 5px;
        color: #e43;
        vertical-align: middle;
    }

    /*输入栏*/
    .info-table input, .info-table .s-box {
        display: inline-block;
        height: 40px;
        /*padding: 0 22px 0 10px;*/
        box-sizing: border-box;
        border: 1px solid #dfdfdf;
        font-size: 14px;
        outline: none;
    }

    .info-table input {
        text-indent: 10px;
    }

    /*下拉菜单*/
    .info-table .s-box {
        position: relative;
        margin-right: 15px;
        background: #fff;
    }

    .info-table .s-box:hover .s-list {
        display: block;
    }

    .s-box .s-info {
        padding: 0 22px 0 10px;
        background: url('./images/select-arrow-d.png') no-repeat 92% center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }

    .s-box .s-list {
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

    .s-box .s-list li {
        height: 40px;
        line-height: 40px;
        text-indent: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }

    .s-box .s-list li:hover {
        background: #f7f7f7;
    }

    /*普通备注*/
    .info-table .tip {
        display: block;
        line-height: 30px;
    }

    /*错误提示*/
    .input-content.err .err-tip {
        display: inline-block;
    }

    .info-table .err-tip {
        display: none;
        height: 40px;
        min-width: 16px;
        padding-left: 30px;
        background: url('./images/icon-err.png') no-repeat 10px center;
        font-size: 12px;
        color: #e43;
        vertical-align: top;
    }

    .upload-error {
        height: 40px;
        min-width: 16px;
        padding-left: 30px;
        background: url('./images/icon-err.png') no-repeat 10px center;
        font-size: 12px;
        color: #e43;
        vertical-align: top;
    }

    .input-content.err input {
        background: #fdeceb;
        border-color: #e43;
    }

    .input-content.suc .err-tip {
        display: inline-block;
        background-image: url('./images/icon-suc.png');
    }

    .info-wrapper .hot {
        color: #e43;
    }

    /*公司信息*/
    .info-table .w295 {
        width: 295px;
    }

    .address-detail-box .s-box {
        width: 140px;
    }

    .address-text {
        width: 457px;
    }

    /*图片上传*/
    .upload-box {
        overflow: hidden;
    }

    .upload-box .photo-show {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }

    .upload-box .photo-show .photo-bak {
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

    .upload-box .photo-show .upload-img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .upload-box .upload-info {
        float: left;
        padding-top: 5px;
    }

    .upload-box .upload-info .tip {
        width: 332px;
        line-height: 20px;
    }

    .upload-box .upload-info .upload-line {
        margin-top: 15px;
    }

    .upload-box .upload-info .upload-btn {
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

    .upload-box .upload-info .upload-btn:hover {
        background-color: #eee;
    }

    .upload-box .upload-info .upload-input {
        position: absolute;
        left: -10000000px;
        top: -10000000px;
        opacity: 0;
    }

    .qulification-upload {
        width: 118px;
        height: 40px;
        background: url('./images/upload.png') no-repeat 0px 0px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        display: inline-block;
        *display: inline;
        *zoom: 1
    }

    .qulification-img-wrap {
        width: 200px;
        max-height: 150px;
        overflow: hidden;
    }

    .qulification-img-wrap img {
        width: 100%;
    }
</style>
<script>
    var $$cityModel = require('../../script/data/model/city.js');
    var $$upload = require('../../lib/lib-upload');
    // var $$uploadModel = require('../../lib/upload.js');
    var $$config = require('../../script/config.js');
    var type = '';
    var base = location.hostname;
    if (base.indexOf('focus-test') >= 0) {
        type = '-test';
    } else if (base.indexOf('focus-dev') >= 0) {
        type = '-dev'
    }
    module.exports = {
        data: function () {
            return {
                //表单参数 - 错误状态
                formErrState: {
                    organizationName: false,
                    provinceId: false,
                    cityId: false,
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
                    document: false
                },
                //表单参数 - 初始化
                form: {
                    type: '',
                    organizationName: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
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
                //必填项是否通过验证
                valid: true,
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
                licenceUrlShow: '',
                authorizationUrlShow: '',
                showError: false,
                showErrorText: '上传失败,请重试'
            }
        },
        props: {
            //表单类型
            type: ''
        },
        methods: {
            //查询城市信息
            queryAreaInfoFn: function (type, data, id, isInit) {
                var that = this;
                switch (type) {
                    case 'province':
                        $$cityModel.getProvince(function (res) {
                            that.provinceList = res.data;
                            //此处完善认证资料均没有默认的省市值
                        });
                        break;
                    case 'city':
                        $$cityModel.getCity(id, function (res) {
                            //存储选择的省和id
                            that.curProvinceText = data;
                            that.form.provinceId = id;
                            //获取城市列表
                            that.cityList = res.data.cityOptions;
                            //重置市
                            that.curCityText = '';
                            that.form.cityId = '';
                        });
                        break;
                    case 'zone':
                        //存储选择的市和id
                        that.curCityText = data;
                        that.form.cityId = id;
                        break;
                    case 'area':
                        that.curZoneText = data;
                        that.form.districtId = id;
                        break;
                    default:
                    //nothing
                }
            },
            varifyOrgName: function () {
                if (this.form.organizationName === '') {
                    this.valid = false;
                    this.formErrState.organizationName = true;
                    this.$refs.itemCompany.querySelector('.err-tip').innerHTML = '该项不能为空';
                } else {
                    this.formErrState.organizationName = false;
                }
            },
            varifyOrgCode: function () {
                var that = this;
                if (/^\d{15}$|^[0-9A-Z]{18}$/.test(this.form.organizationCode)) {
                    that.formErrState.organizationCode = false;
                    that.$refs.itemZCCode.querySelector('.err-tip').innerHTML = '';
                } else {
                    that.formErrState.organizationCode = true;
                    that.$refs.itemZCCode.querySelector('.err-tip').innerHTML = '营业执照注册号有误';
                }
            },
            //验证必填项
            validate: function () {
                this.valid = true;
                //公司名称
                if (this.form.organizationName === '') {
                    this.valid = false;
                    this.formErrState.organizationName = true;
                    this.$refs.itemCompany.querySelector('.err-tip').innerHTML = '该项不能为空';
                } else {
                    this.formErrState.organizationName = false;
                }
                //城市区域
                if (!(this.form.provinceId !== '' && this.form.cityId !== '')) {
                    this.valid = false;
                    var areaErrTip = this.$refs.itemAddress.querySelector('.err-tip');
                    areaErrTip.innerHTML = '请选择地址信息';
                    areaErrTip.style.display = 'inline-block';
                } else {

                }
                //营业执照注册号
                if (this.form.organizationCode === '') {
                    this.valid = false;
                    this.formErrState.organizationCode = true;
                    this.$refs.itemZCCode.querySelector('.err-tip').innerHTML = '该项不能为空';
                } else {
                    this.varifyOrgCode();
                }

                //营业执照扫描件
                if (this.form.licenceUrl === '') {
                    this.valid = false;
                    this.formErrState.licenceUrl = true;
                    this.$refs.itemZzSM.querySelector('.err-tip').innerHTML = '未上传图片';
                } else {
                    this.formErrState.licenceUrl = false;
                }
                return this.valid;
            }
        },
        created: function () {
            var that = this;
            that.queryAreaInfoFn('province');
        },
        mounted: function () {
            var that = this;
            $$upload({
                id: '#selectFilesInput',
                uploadUrl: '//adv.focus' + type + '.cn/api/upload/image/qualification',
                fileName: 'file',
                min: 0,
                max: 1024*1024*2.5,
                type: '*',
                fn: function(res) {
                    var result = res;
                    that.showErrorText = '';
                    if (result.code === 0) {
                        that.form.licenceUrl = res.data.url;
                        that.showError = false;
                    } else {
                        if (typeof result == 'number') {
                            if (result === -110) {
                                that.showErrorText = '图片过大，请重新上传';
                            } else if (result === -130) {
                                that.showErrorText = '图片类型不符合要求，请重新上传';
                            } else {
                                that.showErrorText = '上传失败，请重新上传';
                            }
                            that.form.licenceUrl = '';
                            that.showError = true;
                        } else {
                            that.form.licenceUrl = '';
                            that.showError = true;
                            that.showErrorText = result.msg;
                        }

                    }
                }
            });
            // $$uploadModel($('#selectFilesInput'), '//adv.focus' + type + '.cn/api/upload/image/qualification', function (res) {
            //     var result = JSON.parse(res);
            //     that.showErrorText = '';
            //     if (result.code === 0) {
            //         that.form.licenceUrl = JSON.parse(res).data.url;
            //         that.showError = false;
            //     } else {
            //         if (typeof result == 'number') {
            //             if (result === -110) {
            //                 that.showErrorText = '图片过大，请重新上传';
            //             } else if (result === -130) {
            //                 that.showErrorText = '图片类型不符合要求，请重新上传';
            //             } else {
            //                 that.showErrorText = '上传失败，请重新上传';
            //             }
            //             that.form.licenceUrl = '';
            //             that.showError = true;
            //         } else {
            //             that.form.licenceUrl = '';
            //             that.showError = true;
            //             that.showErrorText = result.msg;
            //         }

            //     }
            // }, (1024*1024*2.5 + 'B'));
        }
    }
</script>
