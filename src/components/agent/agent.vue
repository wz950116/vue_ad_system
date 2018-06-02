<template>
    <div>
        <info></info>
        <banner :navType="'report'"></banner>
        <div class="container" :style="{ height: mheight + 'px' }" ref="containerEle">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script scoped>
    var info = require('../custormer-info/custormer-info');
    var banner = require('../top-banner/top-banner');
    var $model = require('../../script/data/model/header');
    var $$headerModel = require('../../script/data/model/header.js');
    var $$customer = require('../../script/data/model/customer.js');
    module.exports = {
        data: function () {
            return {
                mheight: document.documentElement.clientHeight - 170,
                containerData: "",
                test: 110
            };
        },
        components: {
            info: info,
            banner: banner
        },
        activated: function () {
            var cid = this.$route.params.cid;
            $model.getCid(cid);
            //刷新customer-info和左侧列表
            $$customer.getAdPlanList();
            $$headerModel.getCustomerInfo({cid : cid}, function () {
                $$customer.updateBreads();
            });
        }
    }
</script>
<style scoped>
    .container{
        overflow: hidden;
    }
</style>
