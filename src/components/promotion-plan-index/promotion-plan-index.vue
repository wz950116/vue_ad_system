<template>
    <div class="wrap global-clearfix">
        <div v-show="!nowInUnitView">
            <div class="main">
                <div class="plan-desc">
                    <p class="desc-para"><span class="item bd">{{planInfo.name}}</span><span class="item">计划ID：{{planInfo.id}}</span></p>
                    <p class="desc-para para">描述：{{planInfo.desc}}</p>
                    <p class="desc-para list"><span class="item">状态：<em>{{planInfo.show_status}}</em></span><span class="item">预算方式：<em>{{planInfo.budget_mode_text}}</em></span><span class="item">预算金额：<em>{{planInfo.budget_total | moneyFormat}}</em></span><span class="item">已用预算：<em>{{planInfo.budget_cost | moneyFormat}}</em></span></p>
                    <div class="desc-btn">
                        <a href="javascript:;" @click="clickEdit">编辑</a><a href="javascript:;" @click="confirm.show = true">删除</a>
                    </div>
                </div>
                <banner v-on:change="switchTab(arguments[0])" :defaultIndex="defaultTab" :list="bannerTabs" />
                <unit-panel :from="'plan'" v-show="currentTab === 0" />
                <idea-panel :from="'plan'" v-show="currentTab === 1" />
            </div>
            <confirm v-show="confirm.show" v-on:submit="confirmOk" v-on:cancel="confirmCancel"></confirm>
            <div class="layer" v-show="showPromotionEdit">
                <plan-edit ref="editPlanBox" :data="planInfo" :action="'edit'" v-on:submit="editPlan(arguments[0])" v-on:close="showPromotionEdit = false" />
                <div class="layer-bg"></div>
            </div>
            <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        </div>

        <router-view></router-view>
    </div>
</template>
<style scoped>
    .wrap{
        background: #fafafa;
    }
    .plan-desc{
        position: relative;
        margin:0 40px 28px 40px;
        font-size:14px;
    }
    .plan-desc .desc-para{
        margin-bottom:19px;
    }
    .plan-desc .desc-para{
        color:#666;
    }
     .plan-desc .para{
   
        margin-right: 180px;
     }
    .plan-desc .desc-para:first-child{
        color:#333;

    }
    .plan-desc .desc-para .item{
        padding-right:47px;
    }
    .plan-desc .desc-para .item.bd{
        font-weight: bold;
    }
    .plan-desc .desc-para.list .item{
        padding-right:53px;
    }
    .plan-desc .item em{
        color:#e43;
    }
    .plan-desc .desc-btn{
        position: absolute;
        right:0;
        top:24px;
    }
    .plan-desc .desc-btn a{
        display: inline-block;
        margin-left:20px;
        width:80px;
        height:40px;
        line-height: 40px;
        color:#000;
        text-align: center;
        border:1px solid #d5d5d5;
        border-radius: 3px;
        background: #f6f6f6;
    }
</style>
<script>
    var banner = require('../promotion-banner/promotion-banner');
    var unitPanel = require('../promotion-unit-table/promotion-unit-table');
    var ideaPanel = require('../promotion-idea-table/promotion-idea-table');
    var planEdit = require('../promotion-plan-create/promotion-plan-create');
    var confirm = require('../confirm/confirm');
    var alert = require('../alert/alert');
    var $$customer = require('../../script/data/model/customer.js');
    var _ = require('../../lib/underscore.v1.8.3.js');
    module.exports = {
        data: function () {
            return {
                showPromotionEdit: false,
                defaultTab: 0,
                currentTab: 0,
                bannerTabs: [
                    {
                        text: "广告单元"
                    },
                    {
                        text: "广告创意"
                    }
                ],
                planInfo: {
                    "id": "",
                    "name": "",
                    "desc": "",
                    "status": 1,
                    "status_text": "",
                    "budget_mode": 1,
                    "budget_mode_text": "",
                    "budget_total": 0,
                    "budget_cost": 0,
                    "units": []
                },
                alert: {
                    show : false,
                    message: '信息提交成功',
                    status: 0
                },
                confirm:{
                    show: false
                }
            }
        },
        components: {
            'banner': banner,
            'unit-panel': unitPanel,
            'idea-panel': ideaPanel,
            'plan-edit': planEdit,
            'alert': alert,
            'confirm': confirm
        },
        computed: {
            nowInUnitView: function () {
                return this.$route.params.uid;
            }
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
            clickEdit: function () {
                this.showPromotionEdit = true;
                this.updateProps();
            },
            editPlan: function (infoData) {
                this.showPromotionEdit = false;
                infoData.id = parseInt(this.planInfo.id);
                $$customer.editAdPlanInfo(infoData);                
            },
            switchTab: function (tabIndex) {
                this.currentTab = tabIndex;
            },
            confirmOk: function () { // 删除计划
                var _this = this;
                $$customer.deleteCurrentAdPlan({id: parseInt(this.$route.params.pid)});
                this.confirm.show = false;
            },
            confirmCancel: function () {
                this.confirm.show = false;
            },
            updateProps: function () {
                this.$refs.editPlanBox.openEdit(this.planInfo);
            },
            response: function (res) {
                var _this = this;
                _this.alert.status = (res.code == 200 ? 0 : 1);
                _this.alert.message = res.msg;
                _this.alert.show = true;
                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 2000);
            },
            deleteResponse: function (res) {
                var _this = this;
                _this.response(res);
                if (res.code == 200) {
                    var promAllRoute = {
                        name: this.$route.params.cid ? 'agent_prom_all' : 'cust_prom_all'
                    };
                    if (this.$route.params.cid) {
                        promAllRoute.params = {
                            cid: this.$route.params.cid
                        };
                    }
                    _this.$router.push(promAllRoute);
                }
            },
            editResponse: function (res) {
                var _this = this;
                _this.response(res);
                if (res.code == 200) {
                    _this.updateProps();
                    $$customer.getAdPlanInfo({
                        id: parseInt(_this.$route.params.pid)
                    });
                    $$customer.getAdPlanList();
                }
            }
        },
        activated: function () {
            var _this = this;
            $$customer.getAdPlanInfo({
                id: parseInt(_this.$route.params.pid)
            });
        },
        beforeMount: function () {
            var _this = this;
            $$customer.on('getAdPlanInfo', function (data) {
                if (data.code == 200 && data.data) {
                    _.extend(_this.planInfo, data.data);
                    _this.updateProps();
                    if (data.data) $$customer.controlNewUnit(data.data.can_create_order);
                } else {
                    _this.response(data);
                }
            });
            $$customer.getAdPlanInfo({
                id: parseInt(_this.$route.params.pid)
            });
            $$customer.on('deleteCurrentAdPlan', _this.deleteResponse);
            $$customer.on('editAdPlanInfo', _this.editResponse);
        }
    }
</script>
