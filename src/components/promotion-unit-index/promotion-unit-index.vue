<template>
    <div class="wrap global-clearfix">
        <div class="main">
            <div class="unit-top global-clearfix">
                <span class="item">广告单元名称：{{unitInfo.name}}</span>
                <span class="item">广告单元ID：{{unitInfo.id}}</span>
                <span class="item">推广计划：{{unitInfo.planName}}</span>
                <a href="javascript:;" v-bind:class="['btn', 'btn-stop', {'disabled': unitInfo.canCancel == 0}]" @click="stopUnit">停止广告单元</a>
                <a href="javascript:;" class="btn" @click="openEdit">编辑</a>
            </div>
            <div class="unit-desc">
                <p class="desc-para" :title="dateTitle(unitInfo.dateList)">投放日期：<span>{{unitInfo.spreadStartDate}}</span>&nbsp;至&nbsp;<span>{{unitInfo.spreadEndDate}}</span></p>
                <p class="desc-para list"><span class="item">投放城市：<em>{{unitInfo.cityName}}</em></span><span class="item">广告位名称：<em>{{unitInfo.posName}}</em></span><span class="item">投放平台：<em>{{unitInfo.platform}}</em></span><span class="item" v-if="unitInfo.type === '1'">推广内容：<em>{{unitInfo.effectContent.spreadingContent}}·{{unitInfo.effectContent.estate?unitInfo.effectContent.estate+'·':''}}<a :href="unitInfo.effectContent.link">{{unitInfo.effectContent.link}}</a></em></span><span class="item" v-if="unitInfo.type !== '1'">投放栏目：<em>{{unitInfo.progama}}</em></span><span class="item" v-if="unitInfo.type !== '1'">投放屏次：<em>{{unitInfo.screenIndex}}</em></span></p>
                <p class="desc-para list"><span class="item">计费方式：<em>{{unitInfo.billingType}}</em></span><span class="item">广告类型：<em>{{unitInfo.ideaType}}</em></span><span class="item">规格：<em>{{unitInfo.ideaRestrain}}</em></span><span class="item">投放模式：<em>{{unitInfo.showMode}}</em></span></p>
            </div>
            <!--编辑浮层-->
            <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
            <div class="layer" v-if="editForm.show">
                <div class="layer-bg"></div>
                <div class="layer-box">
                    <div class="header">编辑<i @click="editForm.show = false"></i></div>
                    <form class="form">
                        <div class="form-item global-clearfix">
                            <span class="label mid">广告单元名称：</span>
                            <div class="input-box input-txt">
                                <input type="text" class="input-txt-box" v-model.trim="editForm.data.name"/>
                            </div>
                            <div class="input-error" v-if="editForm.data.error != ''">{{editForm.data.error}}</div>
                        </div>
                        <div class="submit global-clearfix">
                            <a href="javascript:;" class="submit-btn-ok" @click="editSubmit">确认</a>
                            <a href="javascript:;" class="submit-btn-cancel" @click="editForm.show = false">取消</a>
                        </div>
                    </form>
                </div>
            </div>
            <!-- <banner /> -->
            <idea-table :from="'unit'" :unitId="unitInfo.id" :unitName="unitInfo.name" :disabled="unitInfo.canCancel == 0" />
            <confirm :title="confirm.title" :buttonContent='confirm.buttonContent' v-show="confirm.show" v-on:submit="confirmOk" v-on:cancel="confirm.show = false">
                <div class="explain" slot="explain">
                    停止广告单元扣费说明
                    <span class="explain-icon"></span>
                    <div class="explain-context">
                        <p>1、广告在开始投放日期之前取消，系统不扣取任何费用，取消订单的全部费用会退回到账户；</p>
                        <p>2、广告在开始投放日期当天进行取消，系统将扣取当天广告订单的全部费用，当天之后的广告订单费用将退回到账户</p>
                        <p>3、广告在开始投放日期之后进行取消，系统将扣取当天广告订单的全部费用，只退回取消日期之后的广告订单费用</p>
                    </div>
                </div>
            </confirm>
            <edit-cpm-dialog ref="editCpmDialog"></edit-cpm-dialog>
        </div>
    </div>
</template>
<style scoped>
    .wrap{
        background: #fafafa;
    }
    .promotion-breadcrumb{
        margin-bottom: 15px;
    }
    .unit-top{
        margin:0px 40px 20px 40px;
        height:36px;
        line-height: 36px;
        padding-bottom:10px;
        border-bottom: 1px solid #D8D8D8;
    }
    .unit-top .item{
        display: inline-block;
        padding-right:28px;
        font-size: 14px;
        color: #333;
    }
    .unit-top .item.bd {
        font-weight: bold;
    }
    .unit-top .btn{
        float: right;
        margin-left:20px;
        padding:0px 26px;
        font-size: 14px;
        color: #000;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
        height: 36px;
        box-sizing: border-box;
    }
    .unit-top .btn-stop{
        color:#fff;
        border:1px solid #FF6246;
        background: #FF6246;
    }
    .unit-top .btn-stop.disabled{
        color:#ccc;
    }
    .unit-desc{
        margin:0 40px 20px 40px;
        padding-bottom:1px;
        font-size:14px;
        border-bottom: 1px solid #D8D8D8;
    }
    .unit-desc .desc-para{
        margin-bottom:18px;
    }
    .unit-desc .desc-para{
        color:#666;
    }
    .unit-desc .desc-para:first-child span{
        color:#e43;
    }
    .unit-desc .desc-para .item{
        padding-right:40px;
    }
    .unit-desc .desc-para.list .item{
        padding-right:21px;
    }
    .unit-desc .item em{
        color:#151515;
    }

    input{
        border:0;
        outline: none;
    }
    .layer{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index: 10;
    }
    .layer-bg{
        position: absolute;
        top:0;
        right:0;
        width:100%;
        height: 100%;
        background: #333;
        opacity: 0.5;
        z-index: 10;
    }
    .layer-box{
        position: absolute;
        left: 50%;
        top:50%;
        width:485px;
        transform: translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        background: #fff;
        border: 1px solid #D5D5D5;
        z-index: 100;
    }
    .layer-box .header{
        padding-left:20px;
        height:48px;
        line-height: 48px;
        color:#666;
        font-size: 16px;
        border-bottom: 1px solid #d5d5d5;
    }
    .layer-box .header i{
        display: block;
        float: right;
        padding:18px;
        width:14px;
        height:14px;
        cursor: pointer;
        background: url('images/guanbi.png') no-repeat center center;
    }
    .form{
        margin:18px 30px;
    }
    .form-item{
        margin-bottom:18px;
        font-size: 14px;
        line-height: 1;
        color: #4A4A4A;
    }
    .form-item .label{
        float: left;
        width:98px;
        text-align: right;
    }
    .form-item .label.mid{
        line-height: 40px;
    }
    .form-item .input-box{
        float: left;
        height:38px;
        font-size: 14px;
        color:#666;
        border: 1px solid #D5D5D5;
    }
    .form-item .input-txt{
        width:248px;
    }
    .form-item .input-txt-box{
        display: block;
        padding:0 10px;
        width: 100%;
        height: 38px;
        line-height:38px;
        box-sizing: border-box;
    }
    .submit{
        margin-top:27px;
    }
    .submit-btn-ok,.submit-btn-cancel{
        float: right;
        margin-left:20px;
        padding:10px 26px;
        font-size: 14px;
        color: #4A4A4A;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
    }
    .submit-btn-ok{
        background: #FF6246;
        color: #fff;
    }
    .input-error {
        clear:both;
        margin-left:98px;
        padding-top:5px;
        color: red;
        font-size: 12px;
    }

    .explain {
        position: relative;
        margin: 10px;
        text-align: right;
    }

    .explain .explain-icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url(images/question.png) no-repeat; 
        vertical-align: -3px;
    }

    .explain .explain-context {
        position: absolute;
        right: 20px;
        background: white;
        border: 1px solid;
        width: 275px;
        padding: 5px;
        line-height: 20px;
        text-align: left;
        display: none;
    }

    .explain:hover .explain-context {
        display: block;
    }
</style>
<script>
    var banner = require('../promotion-banner/promotion-banner');
    var table = require('../promotion-idea-table/promotion-idea-table');
    var selecter = require('../selecter/selecter');
    var alert = require('../alert/alert');
    var confirm = require('../confirm/confirm');
    var $$customer = require('../../script/data/model/customer.js');
    var _ = require('../../lib/underscore.v1.8.3.js');
    var $$request = require('lib-request');
    var $$domain = require('../../script/config.js').domain;
    module.exports = {
        data: function () {
            return {
                unitInfo: {
                    id: '',
                    name: '',
                    unitId: '',
                    plan: '',
                    city: '',
                    plate: '',
                    column: '',
                    screen: '',
                    charge: '',
                    type: '',
                    standard: '',
                    model: ''
                },
                editForm: {
                    show: false,
                    data: {
                        id: '',
                        name: '',
                        error: ''
                    }
                },
                datasetOptions: [],
                alert: {
                    show : false,
                    message: '信息提交成功',
                    status: 0
                },
                confirm: {
                    title: '确定停止此广告单元？',
                    buttonContent: '确定',
                    show: false
                },
                loupanOptions: []
            }
        },
        computed: {
            selectedPlanIndex: function () {
                var id = this.editForm.data.plan_id;
                for (var i = 0, len = this.datasetOptions.length; i < len; i++) {
                    if (this.datasetOptions[i].id == id) {
                        return i;
                    }
                }
                return 0;
            }
        },
        components: {
            'banner': banner,
            'idea-table': table,
            'selecter': selecter,
            'alert': alert,
            'confirm': confirm,
            'edit-cpm-dialog': require('../create-new/edit-cpm-dialog/edit-cpm-dialog.vue')
        },
        filters: {
            moneyFormat: function (money) {
                if (typeof money === 'number') money = money.toString();
                if (/[^0-9\.]/.test(money)) return '0.00';
                money = money.replace(/^(\d*)$/, "$1.");
                money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                money = money.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(money)) {
                    money = money.replace(re, "$1,$2");
                }
                money = money.replace(/,(\d\d)$/, ".$1");
                return '' + money.replace(/^\./, "0.");
            }
        },
        methods: {
            dateTitle: function (dateList) {
                if (!dateList) return;
                var title = "";
                dateList.forEach(function (item) {
                    title += item + '\n';
                })
                return title;
            },
            openEdit: function () {
                if (this.unitInfo.type === '1') {
                    // cpm
                    this.$refs.editCpmDialog.id = this.unitInfo.id;
                    this.$refs.editCpmDialog.dialogVisible = true;
                } else {
                    // cpd
                    this.editForm.show = true;
                    this.editForm.data.id = this.unitInfo.id;
                    this.editForm.data.name = this.unitInfo.name;
                }
            },
            openAlert: function (title, type) {
                var _this = this;
                _this.alert.status = type;
                _this.alert.message = title;
                _this.alert.show = true;

                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 2000);
            },
            stopUnit: function () {
                var _this = this;
                if (this.unitInfo.canCancel == 0) {
                    _this.openAlert('此广告单元已经停止', 1);
                    return false;
                }
                var date = new Date();
                date = this.dateFormat(date.getTime());
                if (this.unitInfo.dateList.indexOf(date) === -1) {
                    this.confirm.title = '确定停止此广告单元？';
                    this.confirm.buttonContent = '确定';
                } else {
                    this.confirm.title = '停止该广告单元，系统仍将扣取今日费用';
                    this.confirm.buttonContent = '确定停止';
                }
                this.confirm.show = true;
            },
            testEditName: function () {
                if (this.editForm.data.name == "") {
                    this.editForm.data.error = "广告单元名称不能为空";
                    return true;
                }
                if (this.getByteLen(this.editForm.data.name).len > 15) {
                    this.editForm.data.name = this.editForm.data.name.substring(0,15);
                    this.editForm.data.error = "广告单元名称不能超过15个字";
                    return true;
                }
                this.editForm.data.error = '';
                return false;
            },
            getByteLen: function(val) {
                var len = 0;
                var count = 0;
                for (var i = 0; i < val.length; i++) {
                    var item = val.charAt(i);
                    if (item.match(/[^\x00-\xff]/ig) != null) {
                        len += 1;
                    } else {
                        len += 0.5;
                    }
                    if (len <= 15) {
                       count += 1;
                    }
                }
                return {len: len, count: count};
            },
            editSubmit: function () {
                var _this = this;
                if (this.testEditName()) {
                    return;
                }
                _this.editForm.data.id = parseInt(_this.editForm.data.id);
                $$customer.editAdUnitInfo(this.editForm.data, function (data) {
                    if (data.code == 200) {
                        _this.openAlert('修改成功！', 0);
                        $$customer.getAdUnitInfo({id: parseInt(_this.$route.params.uid)});

                    } else {
                        _this.openAlert(data.msg, 1);
                    }
                });
                this.editForm.show = false;
            },
            changeChartSelect: function (side, selectedOpt) {
                this.editForm.data.plan_id = selectedOpt.id;
            },
            confirmOk: function () {
                var _this = this;
                _this.confirm.show = false;
                $$customer.deleteAdUnit({
                    id: parseInt(_this.unitInfo.id)
                }, function(data){
                    if(data.code == 200){
                        _this.unitInfo.canCancel = 0;
                    }
                });
            },
            dateFormat (timestamp) {
                var timeData = new Date(timestamp);
                var year = timeData.getFullYear();
                var month = timeData.getMonth() + 1;
                var date = timeData.getDate();
                month = month < 10 ? '0' + month : month;
                date = date < 10 ? '0' + date : date;
                return '' + year + month + date;
            }
        },
        beforeMount: function () {
            var _this = this;
            $$customer.on('getAdUnitInfo', function (data) {
                if (data.code == 200) {
                    // 请求回来的数据赋值给this.unitInfo
                    _.extend(_this.unitInfo, data.data);
                } else {
                    _this.openAlert(data.msg, 1);
                }
            });
            $$customer.on('getAdPlanList',function(data) {
                if (data.code == 200) {
                    var dataList = [];
                    data.data.list.forEach(function (item, index) {
                        dataList.push({
                            id: item.id,
                            text: item.name
                        });
                    });
                    _this.datasetOptions = dataList;
                } else {
                    _this.openAlert(data.msg, 1);
                }
            });
            /*$$customer.on('editAdUnitInfo', function (data) {
                if (data.code == 200) {
                    $$customer.getAdUnitInfo({id: _this.$route.params.uid});
                } else {
                    _this.openAlert(data.msg, 1);
                }
            });*/
            $$customer.on('deleteAdUnit', function (data) {
                if (data.code != 200) {
                    _this.openAlert(data.msg, 1);
                } else {
                    _this.openAlert("停止成功！", 0);
                }
            });
            $$customer.getAdUnitInfo({id: parseInt(this.$route.params.uid)});
            $$customer.getAdPlanList();
            //加入白名单
            $$request.pushWhiteList($$domain + '/spreadManage/deleteAdUnit/' + _this.$route.params.cid, 'msg');
        }
    }
</script>
