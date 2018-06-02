<template>
    <div class="finance-overview">
        <div class="layer" v-show="chargelayer"></div>
        <div class="addSub" v-show="chargeshow">
            <span class="chargeFinish">{{chargeText}}</span>
            <span class="chargeCancel" @click="chargeCancel"></span>
        </div>
        <div class="finance-overview-section">
            <div class="money-group">
                <span class=" left-label-name">现金账户：</span>
                <span class=" right number balance"> ￥{{accountInfo.accountOverage}}</span>
                <span class=" number decimal-part"></span>
                <span class="can-use">（可用余额：￥<span class="number">{{accountInfo.canUseOverage}}</span> ）</span>
            </div>
            <div class="money-group">
                <span class=" left-label-name">信用账户：</span>
                <span class=" right number balance"> ￥{{accountInfo.creditLine}}</span>
                <span class=" number decimal-part"></span>
                <span class="can-use">（可用余额：￥<span class="number">{{accountInfo.creditCanUse}}</span> ）</span>
            </div>
            <div class="money-group">
                <span class=" left-label-name">赠款账户：</span>
                <span class=" right number balance"> ￥{{accountInfo.grantAccountOverage}}</span>
                <span class=" number decimal-part"></span>
                <span class="can-use">（可用余额：￥<span class="number">{{accountInfo.canUseGrantOverage}}</span> ）</span>
            </div>
            <!-- <div class="money-group">
                <span class=" left-label-name">累计消耗：</span>
                <span class="right number">{{accountInfo.totalUse}}</span>
                <span>元</span>
            </div>
            <div class="money-group">
                <span class=" left-label-name">累计充值：</span>
                <span class="right number">{{accountInfo.totalRecharge}}</span>
                <span>元</span>
            </div>
            <div class="money-group">
                <span class=" left-label-name">累计赠送：</span>
                <span class="right number">{{accountInfo.totalGift}}</span>
                <span>元</span>
            </div> -->
        </div>
        <div class="finance-overview-recharge" v-show="overviewRecharge">
            <div class="money-group">
                <span class="left-label-name item-inline">账户名称</span>
                <span class="account-name">{{accountName}}</span>
            </div>
            <div class="money-group">
                <span class="left-label-name recharge-float">充值金额</span>
              <!--   <div class="recharge-value-group">
                    <div v-bind:class="classObject(item.isYh, item.isSelect,item.back)" v-for="(item, index) in accountInfo.rechargeList" @click="changeSelct(index)">
                        <p v-if="item.isYh === 'false'"><span class="number">{{item.value}}</span>元</p>
                        <p v-if="item.isYh === 'true'"><span class="number">{{item.value}}</span>元</p>
                        <p v-if="item.back" class="discount-back">返<span class="number">{{item.back}}</span>元</p>
                    </div>
                    <div :class="['recharge-value', 'item-inline',  {'value-select': otherInput}]" @click="changeSelct('other')">
                        其他金额
                    </div>
                </div> -->
                <div class="charge-money-line">
                    <el-input v-model="inputMoney" class="charge-money-box" placeholder="请输入整数充值金额" @change="isNumber"></el-input>
                    <span class="error-info" v-if="error"><i class="error-icon"></i>请输入整数数字</span>
                </div>

            </div>
           <!--  <div class="other-money" v-if="otherInput">
                <span class="other-label">其他金额</span>
                <input v-model="inputMoney" class="item-inline other-value" type="text" placeholder="请输入整数" @change="isNumber">
                <span class="error-info" v-show="error"><i class="error-icon"></i>请输入整数数字</span>
            </div> -->

            <!-- <p class="des" v-html="cashbackTxt">{{accountInfo.cashbackTxt}}</p> -->
            <span class="item-inline sure" @click="submit">确认充值</span>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<style scoped>
    .chargeCancel {
        display: inline-block;
        cursor: pointer;
        height: 40px;
        width: 14px;
        background: url('./images/close.png') no-repeat 0px center;
        float: right;
        margin-right: 10px;
    }

    .chargeFinish {
        display: inline-block;
        font-size: 26px;
        height: 40px;
        line-height: 40px;
        float: left;
        margin-left: 40px;
        margin-right: 40px;
    }

    .addSub {
        display: inline-block;
        height: 40px;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(213, 213, 213);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -105px;
        margin-top: -20px;
        z-index: 100;
        font-size: 0;
    }

    .finance-overview .layer {
        width: 100%;
        height: 100%;
        background-color: black;
        filter: alpha(opacity=50);
        -moz-opacity: 0.5;
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }

    .finance-overview {
        padding: 13px 40px 40px 0;
    }

    .finance-overview .finance-overview-section {
        margin-left: 33px;
        padding-bottom: 32px;
    }

    .finance-overview .finance-overview-recharge {
        margin-left: 33px;
        padding-top: 12px;
        border-top: solid 1px #d8d8d8;
    }

    .finance-overview .money-group {
        margin-top: 22px;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
    }

    .finance-overview .right {
        margin-left: -3px;
    }

    .finance-overview .number {
        /*font-family: "Arial";*/
    }

    .finance-overview .can-use {
        margin-left: 23px;
        font-size: 12px;
    }

    .finance-overview .item-inline {
        display: inline-block;
    }

    .finance-overview .balance {
        font-weight: bold;
        font-size: 24px;
        color: #ff613e;
    }

    .finance-overview .decimal-part {
        margin-left: -6px;
        font-weight: bold;
        font-size: 16px;
        color: #ff613e;
    }

    .finance-overview .left-label-name {
        width: 70px;
    }

    .finance-overview .account-name {
        font-size: 14px;
        font-weight: bold;
        color: #333333;
    }

    .finance-overview .recharge-value {
        margin: 0px 5px 25px 5px;
        width: 138px;
        height: 38px;
        line-height: 40px;
        border: solid 1px #d8d8d8;
        font-size: 14px;
        letter-spacing: 0px;
        color: #333333;
        text-align: center;
        vertical-align: top;
        cursor: pointer;
        background-color: #fff;
    }

    .finance-overview .discount {
        position: relative;
        line-height: normal;
    }

    .finance-overview .discount:before {
        position: absolute;
        display: block;
        content: "惠";
        padding: 0px 1px;
        right: 0px;
        top: 0px;
        font-size: 12px;
        color: #ffffff;
        background-color: #ff613e
    }

    .finance-overview .discount-back {
        color: #4a90e2;
    }

    .finance-overview .recharge-value .select {
        display: none;
    }

    .finance-overview .recharge-value.value-select {
        position: relative;
        border: solid 2px #ff613e;
        width: 136px;
        height: 36px;
    }

    .finance-overview .recharge-value.value-select:after {
        display: block;
        position: absolute;
        content: "";
        display: block;
        right: 0px;
        bottom: 0px;
        width: 16px;
        height: 13px;
        background: url("./images/finance-overview-select.png") no-repeat;
    }

    /*.finance-overview .other-money {
        margin: 0px 0px 0px 75px;
        height: 60px;
        line-height: 60px;
        color: #333333;
        background-color: #f1f1f1;
        font-size: 0px;
        letter-spacing: -4px;
    }*/



    .finance-overview .charge-money-box{
        width: 358px;
        height: 38px;
        margin:1px 5px;
        /*border: solid 1px #d8d8d8;*/
        font-size: 14px;
        letter-spacing: 0px;
        vertical-align: middle;
        float: left;
    }


    .finance-overview .other-label {
        display: inline-block;
        margin: 0px 9px 0px 20px;
        font-size: 14px;
        letter-spacing: 0px;
        vertical-align: middle;
    }

    .finance-overview .other-value {
        width: 168px;
        height: 38px;
        padding-left: 10px;
        border: solid 1px #d8d8d8;
        font-size: 14px;
        letter-spacing: 0px;
        vertical-align: middle;
    }

    .finance-overview .other-sure {
        width: 55px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border: solid 1px #d8d8d8;
        border-left: none;
        font-size: 14px;
        letter-spacing: 0px;
        vertical-align: middle;
        cursor: pointer;
    }

    .finance-overview .des {
        margin-top: 7px;
        margin-left: 75px;
        font-size: 12px;
        color: #999999;
        line-height: 21px;
    }

    .finance-overview .sure {
        margin-top: 26px;
        margin-left: 334px;
        width: 104px;
        height: 38px;
        line-height: 38px;
        border: solid 1px #e9533e;
        border-radius: 2px;
        background-color: #fc634d;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
    }

    .finance-overview .money-group .item-inline {
        display: inline-block;
        vertical-align: middle;
    }

    .finance-overview .recharge-value-group {
        font-size: 0px;
        letter-spacing: -4px;
        margin-left: -5px;
        overflow: hidden;
    }

    .recharge-float {
        float: left;
        line-height: 40px;
    }

    .error-info {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        letter-spacing: 0px;
        color: #ee4433;
        line-height: 40px;
    }

    .error-icon {
        display: inline-block;
        margin-right: 4px;
        width: 16px;
        height: 16px;
        background: url("./images/error-icon.png") no-repeat;
        vertical-align: middle;
    }

    .finance-overview .lineHeightNormal {
        line-height: normal;
    }
</style>
<script>
var $$headerModel = require('../../script/data/model/header.js');
var $$financeModel = require('../../script/data/model/finance.js');
var _ = require('../../lib/underscore.v1.8.3.js');
var alert = require('../alert/alert');
var companyId = "";
exports.data = function() {
    return {
        userType: "",
        cid: "",
        accountId: "",
        otherInput: false,
        accountInfo: "",
        rechargeMoney: 0,
        backMoney: 0,
        inputMoney: "",
        error: false,
        // cashbackTxt: "",
        chargeText: "正在充值",
        alert: {
            show: false,
            message: '充值成功！',
            status: 0
        },
        accountName: "",
        chargelayer: false,
        chargeshow: false,
        overviewRecharge: true,
        firstRefresh: true
    }
};
exports.components = {
    'alert': alert
};
exports.methods = {
    getInfo: function() {
        var _this = this;
        $$financeModel.getFinanceOverviewInfo(_this.wrapCid({}), function(res) {
            var selectF = false;
            if (res.code === "200" && (typeof res.data) === "string") {
                res.data = JSON.parse(res.data);
                _this.accountId = res.data.accountId;
                for (var key in res.data.rechargeList) {
                    if (key === "0") {
                        selectF = true;
                        _this.rechargeMoney = res.data.rechargeList[key].value;
                        _this.backMoney = res.data.rechargeList[key].back;
                        // if (res.data.rechargeList[key].back)
                        //     _this.cashbackTxt = res.data.cashbackTxt;
                    }
                    selectF = key === "0" ? true : false;
                    _.extend(res.data.rechargeList[key], {
                        "isSelect": selectF
                    })
                }
                _this.accountInfo = res.data;
            }
        });
        $$headerModel.on("getHeaderInfo", function(res) {
            if (res.code === "200") {
                _this.accountName = res.data.companyName;
                _this.userType = res.data.userType;
            }
        });
        $$headerModel.getHeaderInfo(_this.wrapCid({}));
    },
    chargeCancel: function() {
        this.getInfo();
        this.chargelayer = false;
        this.chargeshow = false;
    },
    rechargeAlertShow: function(status, txt) {
        var _this = this;
        _this.alert.status = status;
        _this.alert.message = txt;
        _this.alert.show = true;
        window.setTimeout(function() {
            _this.alert.show = false;
        }, 2000);
    },
    classObject: function(isYh, isSelect, back) {

        return {
            'recharge-value': true,
            'item-inline': true,
            'value-select': isSelect,
            'discount': isYh === 'true',
            'lineHeightNormal': back ? true : false
        }
    },
    isNumber: function() {
        // var reg = /^[1-9][0-9]*$/;
        // if (!reg.test(this.inputMoney)) {
        //     this.error = true;
        // } else {
        //     this.error = false;
        // }
        var _this = this;
        var regex = /^\d+$/; //判断汇款金额是否为纯数字
        if (_this.inputMoney !== '' && !regex.test(_this.inputMoney)) {
            _this.error = true;
        } else _this.error = false;

    },
    selectOhterValue: function() {
        this.otherInput = true;
    },
    changeSelct: function(index) {
        if (index === "other") {
            index = this.accountInfo.rechargeList.length;
            this.otherInput = true;
            this.rechargeMoney = 0;
            this.backMoney = 0;
            // this.cashbackTxt = "";
        } else {
            this.otherInput = false;
        }
        this.inputMoney = "";
        for (var key in this.accountInfo.rechargeList) {
            if (parseInt(key, 10) === index) {
                this.accountInfo.rechargeList[key].isSelect = true;
                this.rechargeMoney = this.accountInfo.rechargeList[key].value;
                this.backMoney = this.accountInfo.rechargeList[key].back;
                // this.cashbackTxt = this.backMoney ? this.accountInfo.cashbackTxt : "";
            } else {
                this.accountInfo.rechargeList[key].isSelect = false;
            }
        }
    },
    submit: function() {
        var _this = this;
        var openNum = 0;
        if (this.error) {
            _this.rechargeAlertShow(1, '请输入正确充值金额');
            return;
        } else if (this.otherInput && !this.inputMoney) {
            this.error = true;
            return;
        } else if (!this.otherInput && this.rechargeMoney === 0) {
            this.error = true;
            return;
        } else if (this.otherInput && this.error) {
            return;
        }
        // if (window.navigator.userAgent.indexOf("Chrome") > -1) {}
        var param = {
            // money: this.otherInput ? this.inputMoney : this.rechargeMoney,
            money: this.inputMoney,
            back: this.backMoney,
            accountId: this.accountId
        };
        $$financeModel.setFinanceRecharge(_this.wrapCid({
            amount: param.money
        }), function(res) {
            if (res.code === "200" && JSON.parse(res.data).flowNum) {
                openNum = 0;
                if (openNum === 0) {
                    window.open(JSON.parse(res.data).url);
                    openNum = 1;
                }
                var timer = setInterval(function() {
                    $$financeModel.getChargeResult({
                        flowNum: "" + JSON.parse(res.data).flowNum
                    }, function(res) {
                        if (res.getChargeResult.data.status === "1" || res.getChargeResult.data.status === "2") {
                            clearInterval(timer);
                            _this.chargelayer = true;
                            _this.chargeshow = true;
                            _this.chargeText = res.getChargeResult.msg;
                            _this.getInfo();
                            _this.accountInfo.rechargeList.forEach(function(item) {
                                item.isSelect = false;
                            });
                            _this.otherInput = false;
                            _this.inputMoney = "";
                            _this.accountInfo.rechargeList[0].isSelect = true;

                        }
                    });
                }, 2000);
            } else {
                _this.rechargeAlertShow(1, res.msg);
                // 支付失败页面刷新
                setTimeout(function () {
                    window.location.reload();
                }, 2000)
            }
        });
    },
    wrapCid: function(data) {
        if (companyId !== '') {
            data.cid = companyId;
        }
        return data;
    }
};
exports.created = function() {
    if (!!(this.$route.params.cid)) {
        companyId = this.$route.params.cid;
    } else {
        companyId = '';
    }
};
exports.activated = function() {
    if (!this.firstRefresh) {
        this.getInfo();
    }
    if (vueRouter.app._route.params.cid) {  //代理商点击子客后台
       this.overviewRecharge = false;
    } else {
        if(this.userType == 2){  //子客登录
            this.overviewRecharge = false;
        }else  this.overviewRecharge = true;
    }
};
exports.beforeMount = function() {
    this.getInfo();
    this.firstRefresh = false;
}
</script>
