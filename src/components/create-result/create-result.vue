<template>
    <div class="root" v-show="display">
        <div class="result-wrap">
            <!--创建成功-->
            <div class="line-success-1" v-if="status == 1">
                <p class="slogan">创建成功!</p>
            </div>
            <div class="line-success-2" v-if="status == 1">
                <p class="p">在广告单元中添加广告创意才能正常投放，点击<span @click="goAdunit" class="highlight">查看已采购资源</span></p>
            </div>
            <!--创建失败-->
            <div class="line-failed-1" v-if="status == 2">
                <p class="slogan">广告单元创建失败</p>
            </div>
            <div class="line-failed-2" v-if="status == 2">
                <div class="p-wrap">
                    <p class="p1">可能是以下原因导致</p>
                    <p class="p2">1.您在15分钟内未完成扣款</p>
                    <p class="p3">2.由于系统原因未正确扣款</p>
                    <p class="p4">如果您已确认扣款,仍出现该提示,请联络客服解决</p>
                </div>
            </div>
            <!--请耐心等待-->
            <div class="line-waitting-1" v-if="status == 3">
                <p class="slogan">正在支付中...请耐心等待</p>
            </div>
            <div class="line-waitting-2" v-if="status == 3">
                <a href="#" target="_blank"><div class="btn">遇到问题</div></a>
            </div>
        </div>
    </div>
</template>
<script>
    var $$ad = require('../../script/data/model/ad');
    module.exports = {
        methods: {
            goAdunit: function () {
                if (this.$parent.name === 'create') {
                    // 通过新建推广计划跳转到所有推广计划
                    this.$router.push({
                        name: 'agent_prom_all'
                    });
                    this.$parent.cancel();
                } else {
                    // 通过采购的跳转到分配
                    this.$router.push({
                        name: 'pur_dist'
                    });
                }
            }
        },
        data: function () {
            return {
                display: true,
                status: 0
            }
        },
        beforeMount: function () {
            var _this = this;
            this.status = 1;
        }
    };
</script>
<style scoped>
    .root {
        min-height: 600px;
    }
    .result-wrap {
        background-color: #F5F6F7;
        min-height: 600px;
    }
    .result-wrap .line-success-1 {
        position: relative;
        text-align: center;
        font-size: 23px;
        top:242px;
    }
    .result-wrap .line-success-1 .slogan {
        background-image: url('./img/smile.png');
        background-repeat: no-repeat;
        background-position: 0 0;
        display: inline-block;
        padding-left: 46px;
    }
    .result-wrap .line-success-2 {
        position: relative;
        text-align: center;
        font-size: 14px;
        color: #999;
        top:295px;
    }
    .result-wrap .line-success-2 .highlight{
        text-decoration: underline;
        cursor: pointer;
        color: #FC634D;
    }
    .result-wrap .line-failed-1 {
        position: relative;
        text-align: center;
        font-size: 23px;
        top:242px;
    }
    .result-wrap .line-failed-1 .slogan {
        background-image: url('./img/failed.png');
        background-repeat: no-repeat;
        background-position: 0 0;
        display: inline-block;
        padding-left: 46px;
    }

    .result-wrap .line-failed-2 {
        position: relative;
        top:298px;
    }
    .result-wrap .line-failed-2 .p-wrap {
        display: inline-block;
        position: relative;
        margin: 0 auto;
        width: 452px;
        left: 381px;
    }
    .result-wrap .line-failed-2 .p-wrap .p1{
        line-height: 16px;
        text-align: left;
        font-size: 16px;
        color: #333;
    }
    .result-wrap .line-failed-2 .p-wrap .p2{
        line-height: 14px;
        margin-top: 18px;
        text-align: left;
        font-size: 14px;
        color: #737373;
    }
    .result-wrap .line-failed-2 .p-wrap .p3{
        line-height: 14px;
        margin-top: 14px;
        text-align: left;
        font-size: 14px;
        color: #737373;
    }
    .result-wrap .line-failed-2 .p-wrap .p4{
        line-height: 14px;
        margin-top: 19px;
        text-align: left;
        font-size: 14px;
        color: #333;
    }

    .result-wrap .line-waitting-1 {
        position: relative;
        text-align: center;
        font-size: 23px;
        top:242px;
    }
    .result-wrap .line-waitting-1 .slogan {
        background-repeat: no-repeat;
        background-position: 0 0;
        display: inline-block;
    }

    .result-wrap .line-waitting-2 {
        position: relative;
        text-align: center;
        top:298px;
    }
    .result-wrap .line-waitting-2 .btn {
        color: #333;
        border: solid 1px #D5D5D5;
        display: inline-block;
        border-radius: 2px;
        line-height: 38px;
        cursor: pointer;
        margin: 0 auto;
        width: 104px;
        height: 38px;
    }
</style>
