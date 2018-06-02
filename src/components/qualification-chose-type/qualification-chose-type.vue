<template>

    <div class="settle-wrap">

        <settle-header></settle-header>

        <div class="agent-enterprise">
            <div class="item-inline space-width">
                <span class="ad-agent"></span>
                <div class="info">
                    <p class="name">广告代理商</p>
                    <p class="des">适用于可以为房地产公司（开发商）提供楼盘策划和销售代理的服务机构的申请，可以在一个账号下关联多个房地产公司，并帮助这些公司投放广告。</p>
                    <button class="btn" @click="jumpSubmit(1)">广告代理商</button>
                </div>
            </div>
            <div class="item-inline space-width">
                <span class="enterprise"></span>
                <div class="info">
                    <p class="name">房产企业</p>
                    <p class="des">适用于房产相关企业的申请，包括：房地产开发公司，房地产销售公司，房地产中介公司等。可以为自己的企业投放广告。</p>
                    <button class="btn" @click="jumpSubmit(0)">房产企业</button>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .settle-wrap {
        width: 1200px;
        min-height: 700px;
        margin: 20px auto 21px;
        padding: 40px 0 0 0px;
        background-color: #fff;
    }

    .agent-enterprise {
        margin-top: 100px;
        letter-spacing: -4px;
        font-size: 0px;
        text-align: center;
    }

    .item-inline {
        display: inline-block;
        width: 170px;
        vertical-align: top;
    }

    .ad-agent {
        position: relative;
        display: block;
        width: 170px;
        height: 154px;
        font-size: 12px;
        background-color: #ff7567;
    }

    .enterprise {
        position: relative;
        display: block;
        width: 170px;
        height: 154px;
        font-size: 12px;
        background-color: #ff7567;
    }

    .ad-agent:before {
        position: absolute;
        display: block;
        content: "";
        left: 50%;
        top: 50%;
        width: 80px;
        height: 68px;
        margin-left: -40px;
        margin-top: -34px;
        background: url("./img/agent-logo.png") center no-repeat;
    }

    .enterprise:before {
        position: absolute;
        display: block;
        content: "";
        left: 50%;
        top: 50%;
        width: 77px;
        height: 68px;
        margin-left: -39px;
        margin-top: -34px;
        background: url("./img/enterprise-logo.png") center no-repeat;
    }

    .ad-agent:after, .enterprise:after {
        position: absolute;
        display: block;
        content: "";
        bottom: -14px;
        left: 50%;
        width: 28px;
        height: 14px;
        margin-left: -14px;
        background: url("./img/arrow.png") no-repeat;
    }

    .info {
        display: inline-block;
        margin-top: 45px;
        width: 170px;
        letter-spacing: 0px;
        text-align: center;
    }

    .name {
        font-size: 20px;
        color: #333333;
        font-weight: bold;
    }

    .des {
        margin-top: 15px;
        height: 135px;
        font-size: 14px;
        color: #666666;
        text-align: left;
        line-height: 24px;
    }

    .btn {
        display: block;
        margin-top: 24px;
        width: 168px;
        height: 38px;
        border: solid 1px #ee4433;
        text-align: center;
        font-size: 16px;
        color: #ee4433;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #ee4433;
        color: #fff;
    }

    .space-width {
        margin-right: 40px;
    }

</style>
<script scoped>
    var settleHeader = require('../settle-header/settle-header.vue');
    var $$qualiModel = require('../../script/data/model/qualification.js');
    module.exports = {
        data: function () {
            return {}
        },
        components: {
            'settleHeader': settleHeader
        },
        methods: {
            jumpSubmit: function (id) {
                this.$router.push('/qualification/submit?type=' + id);
            }
        },
        created: function () {

        }
    }
</script>