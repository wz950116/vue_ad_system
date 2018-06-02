<template>
    <div class="create-root" v-if="display">
        <div class="mask" @click="hide"></div>
        <div class="create-main">
            <create-main ref="createMain" :choosedPlanName="choosePlan.planName" :choosedPlanId="choosePlan.planId"/>
        </div>
    </div>
</template>
<style scoped>
    .create-root {
        height: 100%;
    }
    .mask {
        position: fixed;
        opacity: .8;
        background: #000;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
    }
    .create-back {
        position: absolute;
        left: -100px;
        width: 100px;
        height: 160px;
        background: #e43;
        top: 50%;
        margin-top: -80px;
    }
    .create-root .create-main{
        z-index: 1000;
        height: 100%;
        position: fixed;
        width: 1000px;
        right: 0;
        top: 0;
        background-color: #F5F6F7;
    }
</style>
<script>
    var $customer = require('../../script/data/model/customer');
    // var createMain = require('../create-main/create-main');
    module.exports = {
        name: 'create',
        data: function () {
            return {
                display: false,
                choosePlan: {
                    planId: '-1',
                    planName: ''
                }
            }
        },
        components: {
           'create-main': require('../create-new/create-new.vue')
        },
        methods: {
            show: function (v) {
                if (v === false) {
                    this.display = false;
                } else {
                    this.display = true;
                }
            },
            hide: function () {
                this.display = false;
            }
        },
        beforeMount: function () {
            var _this = this;
            $customer.on('launchCreate', function (planId) {
                _this.choosePlan.planId = planId || '-1';
                _this.show();
                // _this.choosePlan.planName = '难啊难';
            });
        }
    };
</script>
