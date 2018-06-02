<template>
    <div class="root" v-show="display">
        <div class="wrap">
            <div class="list-outwrap">
                <div class="list">
                    <div class="line line1 clearfix">
                        <span class="span">推广计划</span>
                        <div class="cur-name" v-if="hasPlan">{{data.current.name}}</div>
                        <selecter v-else style="width: 362px;" v-on:change="changePlan(arguments[0])" ref="selecter" :defaultIndex="data.current.index" :options="data.plan" />
                        <div class="add-wrap" v-on:click="toggle()">
                            <div class="add"></div>
                            <p class="text">新建计划</p>
                        </div>
                    </div>
                    <div class="line clearfix" v-bind:class="{ 'line3': hasPlan, 'line2': !hasPlan }">
                        <span class="span">计划预算</span>
                        <p class="text-right">{{data.current.budget_total | moneyFormat}}</p>
                    </div>
                    <div class="line  line3 clearfix">
                        <span class="span">可用额度</span>
                        <p class="text-right">{{data.current.quota | moneyFormat}}</p>
                    </div>
                    <div class="line line4 clearfix">
                        <span class="span">计划描述</span>
                        <p class="text-right">{{data.current.desc}}</p>
                    </div>
                </div>
            </div>
        </div>
        <promotion-plan-create v-on:close="toggle()" v-show="showWindow" ref="createPlanRef" v-on:submit="submitCreatePlan" />
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script>
    var $$customer = require('../../script/data/model/customer.js');
    var promotionPlanCreate = require('../promotion-plan-create/promotion-plan-create');
    var selecter = require('../selecter/selecter');
    var alert = require('../alert/alert');
    module.exports = {
        props: {
            choosedPlanName: {
                type: String,
                default: ''
            },
            choosedPlanId: {
                type: Number,
                default: -1
            }
        },
        data: function () {
            return {
                alert: {
                    show: false,
                    message: '',
                    status: 1
                },
                display: true,
                status: 0,
                showWindow: false,
                data: {
                    current: {
                        id: '',
                        name: '',
                        budget_total: '',
                        quota: '',
                        desc: '',
                        index: 0
                    },
                    plan: []
                },
                hasPlan:false
            }
        },
        components: {
            'selecter': selecter,
            'promotion-plan-create': promotionPlanCreate,
            'alert': alert
        },
        filters: {
            moneyFormat: function (money) {
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
            toast: function (status, msg) {
                var _this = this;
                this.alert.status = status;
                this.alert.message = msg;
                this.alert.show = true;
                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 1000);
            },
            submitCreatePlan: function () {
                var _this = this, planForm = this.$refs.createPlanRef.planForm;
                var params = {
                    name: planForm.name,
                    budget: planForm.budget,
                    desc: planForm.desc
                };
                $$customer.createAdPlan(params, function (data) {
                    if (data.code === '200') {
                        _this.data.current.id = data.data.id;
                        _this.data.plan.push({text: params.name, value: data.data.id});
                        _this.data.current.index = _this.data.plan.length - 1;
                        _this.changePlan({value: data.data.id});
                        _this.showWindow = false;
                    } else { 
                        _this.toast(1, data.msg || '新建计划失败');
                    }
                });
            },
            changePlan: function (item) {
                this.data.current.id = item.value;
                $$customer.getAdPlanInfo({
                    id: parseInt(item.value)
                }, this.fnGetAdPlanInfo);
            },
            toggle: function () {
                this.showWindow = !this.showWindow;
            },
            show: function () {
                this.display = true;
            },
            hide: function () {
                this.display = false;
            },
            fnGetAdPlanInfo: function (res) {
                var that = this;
                var quota;
                if (res.code === '200') {
                    that.data.current.name = res.data.name;
                    that.data.current.id = res.data.id;
                    that.data.current.budget_total = res.data.budget_total.toString();
                    quota = parseFloat(res.data.budget_total) - parseFloat(res.data.budget_cost);
                    that.data.current.quota = quota.toString();
                    that.data.current.desc = res.data.desc;
                } else {
                    that.toast(1, res.msg || '获取推广计划详情失败');
                }
            }
        },
        beforeMount: function () {
            var that = this;

            var listDateTranform = function (list) {
                var i, newList = [];
                list.forEach(function (item) {
                    newList.push({
                        text: item.name,
                        value: item.id
                    })
                });
                return newList;
            };
            if (this.$route.params.pid) {
                this.hasPlan = true;
            }else {
                this.hasPlan = false;
            };
            if (this.choosedPlanId === -1) {
                $$customer.getAdPlanList({}, function (res) {
                    if (res.code === '200') {
                        if (res.data && res.data.length) {
                            that.data.plan = listDateTranform(res.data.list);
                            if (that.data.plan.length) {
                                if (that.hasPlan) {
                                    that.data.current.id = that.$route.params.pid;
                                }else {
                                    that.data.current.id = res.data.list[0].id;
                                }
                                $$customer.getAdPlanInfo({id: parseInt(that.data.current.id)}, that.fnGetAdPlanInfo);
                            }
                        }
                    } else {
                        that.toast(1, res.msg || '获取推广计划列表失败');
                    }
                });
            } else {
                // 从某个计划里打开推广计划
            }

            
            // $$customer.on('launchCreate', function (data) {
            //     if (that.data.planId && that.data.planName) {
            //         that.changePlan({value: data.planId});
            //     }
            // });

            

            
        }
    };
</script>
<style scoped>
    .clearfix:after {
        display:block;
        content:'';
        clear:both;
        visibility:hidden
    }
    .selecter {
        float: left;
        margin-left: 28px;
    }
    .wrap {
        background-color: #F5F6F7;
        overflow-y: scroll;
        max-height: 600px;
        display: block;
        width: 1000px;
        min-height: 500px;
    }
    .wrap .list-outwrap {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .wrap .list-outwrap-pd {
        padding-bottom: 20px;
    }
    .wrap .list-outwrap .list {
        background-color: #FFF;
        border: solid 1px #DDD;
        min-height: 242px;
        min-height: 380px;
    }

    .wrap .list-outwrap .list .line {
        display: block;
    }
    .wrap .list-outwrap .list .line .span{
        margin-left: 40px;
        font-size: 14px;
        float: left;
    }
    .wrap .list-outwrap .list .line .text-right{
        word-wrap: break-word;
        margin-top: -12px;
        margin-left: 28px;
        line-height: 38px;
        font-size: 14px;
        width: 617px;
        float: left;
    }
    .wrap .list-outwrap .list .line1 {
        margin-top: 36px;
        height: 40px;
    }
    .wrap .list-outwrap .list .line1 .span{
        line-height: 40px;
    }
    .wrap .list-outwrap .list .line1 .input {
        border: solid 1px #D5D5D5;
        position: relative;
        margin-left: 29px;
        text-indent: 9px;
        cursor: pointer;
        width: 343px;
        height: 38px;
        float: left;
    }
    .wrap .list-outwrap .list .line1 .ul {
        border-left: solid 1px #eee;
        border-right: solid 1px #eee;
        border-bottom: solid 1px #eee;
        background-color: #FFF;
        position: absolute;
        width: 324px;
        top: 40px;
    }
    .wrap .list-outwrap .list .line1 .ul .li{
        line-height: 38px;
        text-indent: 9px;
        font-size: 14px;
        color: #A1A1A1;
    }
    .wrap .list-outwrap .list .line1 .ul .li:hover{
        background-color: #eee;
        color: #ff613e;
    }
    .wrap .list-outwrap .list .line1 .input .p {
        line-height: 38px;
        text-indent: 9px;
        font-size: 14px;
        color: #ff613e;
        float: left;
    }
    .wrap .list-outwrap .list .line1 .input .selector {
        background-image: url('./img/selector.png');
        background-position: center center;
        border-left: solid 1px #D5D5D5;
        background-size: 18px 38px;
        background-color: #EEE;
        height: 38px;
        float: right;
        width: 18px;
    }
    .wrap .list-outwrap .list .line1 .cur-name {
        min-width: 100px;
        height: 40px;
        float: left;
        line-height: 40px;
        font-size: 14px;
        /*text-align: center;*/
        margin-left: 28px;
        /*background: #F6F6F6;
        border:solid 1px #D5D5D5;*/
    }
    .wrap .list-outwrap .list .line1 .add-wrap {
        border: solid 1px #D5D5D5;
        background-color: #F6F6F6;
        border-radius: 2px;
        margin-left: 10px;
        cursor: pointer;
        width: 108px;
        height: 38px;
        float: left;
        font-size: 14px;
    }

    .wrap .list-outwrap .list .line1 .add-wrap .add{
        background-image: url('./img/add.png');
        background-size: center center;
        background-repeat: no-repeat;
        margin: 14px 5px 14px 9px;
        height: 10px;
        float: left;
        width: 10px;
    }

    .wrap .list-outwrap .list .line1 .add-wrap .text{
        line-height: 38px;
        float: left;
    }

    .wrap .list-outwrap .list .line2 {
        margin-top: 32px;
    }
    .wrap .list-outwrap .list .line3 {
        margin-top: 19px;
    }
    .wrap .list-outwrap .list .line4 {
        margin-top: 19px;
    }
</style>