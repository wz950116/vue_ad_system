<template>
    <div class="finance-left">
        <div :class="['finance-left-group', {current:pageState == 'overview'}]" @click="changeCliCk('overview')">
            <router-link to="overview">
                <span class="finance-left-item">财务总览</span>
            </router-link>
        </div>
        <div :class="['finance-left-group', {current:pageState == 'charge'}]" @click="changeCliCk('charge')" v-if="financeCharge">
            <router-link to="charge">
                <span class="finance-left-item">线下充值</span>
            </router-link>
        </div>
        <div :class="['finance-left-group', {current:pageState == 'detail'}]" @click="changeCliCk('detail')">
            <router-link to="detail">
                <span class="finance-left-item">财务明细</span>
            </router-link>
        </div>
        <div :class="['finance-left-group', {current:pageState == 'invoice'}]" @click="changeCliCk('invoice')" v-if="financeInvoice">
            <router-link to="invoice">
                <span class="finance-left-item">发票管理</span>
            </router-link>
        </div>
        <div :class="['finance-left-group', {current:pageState == 'credit'}]" @click="changeCliCk('credit')"  v-if="financeCredit">
            <router-link to="credit">
                <span class="finance-left-item">信用额度</span>
            </router-link>
        </div>
        <div :class="['finance-left-group', {current:pageState == 'task'}]" @click="changeCliCk('task')"  v-if="financeTask">
            <router-link to="task">
                <span class="finance-left-item">任务管理</span>
            </router-link>
        </div>

    </div>
</template>
<style scoped>
.finance-left {
    padding-top: 10px;
    width: 200px;
    border-right: solid 1px #d8d8d8;
    background-color: #ffffff;
    height: 100%;
}

.finance-left .finance-left-group {
    position: relative;
    margin: 30px auto 0px auto;
    width: 140px;
    height: 40px;
}

.finance-left .finance-left-item {
    position: relative;
    display: block;
    width: 138px;
    height: 38px;
    line-height: 38px;
    border-radius: 2px;
    border: solid 1px #d5d5d5;
    background-color: #f6f6f6;
    font-size: 14px;
    color: #333333;
    text-align: center;
}

.finance-left .finance-left-item .arrow {
    display: none;
}

.finance-left .finance-left-group.current .finance-left-item,
.finance-left .finance-left-item:hover {
    border-color: #eb5237;
    background-color: #ff613e;
    color: #ffffff;
}

.finance-left .finance-left-group.current:after {
    position: absolute;
    display: block;
    content: "";
    top: 50%;
    right: -31px;
    width: 16px;
    height: 28px;
    margin-top: -14px;
    background: url("./images/finance-left-arrow.png");
}
</style>
<script>
var $model = require('../../script/data/model/header');
var $$financeModel = require('../../script/data/model/finance.js');
var $$header = require('../../script/data/model/header.js');
var path = window.app;
module.exports = {
    data: function() {
        return {
            userType:'',
            state: {
                overview: false,
                detail: false,
                invoice: false,
                credit:false,
                task:false,
                charge:false
            },
            financeInvoice: true,
            financeCredit: true,
            financeTask: true,
            financeCharge: true
        }
    },
    computed:{
      pageState: function () {
        return this.$store.default.state.finance.page_now;
      }
    },
    beforeMount: function() {
        var _this = this;
        var path = this.$route.path;
        this.$store.default.dispatch('changeLeft',path.split('/finance/')[1]);

        $$header.getHeaderInfo({},function(res){
            if(res.code === 200 || res.code === '200'){
                _this.userType = parseInt(res.data.userType);
            }
        });

        _this.userType = $$header.getCacheData().demander.data.userType;

        $$financeModel.getCreditShow({}, function(res) {
        var creditUser = res.data.creditUser;
            if(creditUser == 'false'){
             _this.financeCredit = false;
             _this.financeTask = false;
            }
        })
        if (vueRouter.app._route.params.cid) {
            this.financeInvoice = false;
            this.financeCredit = false;
            this.financeTask = false;
            this.financeCharge = false;
        }

        if(_this.userType == 2){       //子客
            this.financeCharge = false;
        }
        //
        // $model.on('inTab', function() {
        //     // var now = path.split('/finance/')[1];
        //     _this.state.overview = false;
        //     _this.state.detail = false;
        //     _this.state.invoice = false;
        //     _this.state.credit = false;
        //     _this.state.task = false;
        //     _this.state.charge = false;
        //     _this.state[this.pageState] = true;
        // });

    },
    methods: {
        changeCliCk: function(flag) {
          this.$store.default.dispatch('changeLeft',flag);
            // this.state.overview = false;
            // this.state.detail = false;
            // this.state.invoice = false;
            // this.state.credit = false;
            // this.state.task = false;
            // this.state.charge = false;
            // this.state[flag] = true;
            // this.otherInput = true;
        }
    }
};
</script>
