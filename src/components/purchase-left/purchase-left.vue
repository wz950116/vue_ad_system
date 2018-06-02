<template>
    <div class="root">
        <div class="wrap">
            <router-link to="buy">
                <div class="purchase-cpd orange" v-if="leftStatus == 0">采购CPD单元</div>
                <div class="purchase-cpd gray" v-if="leftStatus == 1" v-on:click = "setLeft(0)">采购CPD单元</div>
            </router-link>
            <router-link to="distribute">
                <div class="distribution-cpd orange" v-if="leftStatus == 1">分配CPD单元</div>
                <div class="distribution-cpd gray" v-if="leftStatus == 0" v-on:click = "setLeft(1)">分配CPD单元</div>
            </router-link>
            <div class="triangle"></div>
        </div>
    </div>
</template>
<script>
    var $model = require('../../script/data/model/header');
    var path = window.app;
    module.exports = {
        data: function () {
            return {
                leftStatus: 0
            }
        },
        beforeMount: function () {
            var that = this;
            $model.on('inTab', function () {
                var path = that.$route.path;
                var hash = path.split('/purchase/')[1];
                that.leftStatus = (hash == 'distribute' ? 1 : 0 );
            });
        },
        methods: {
            setLeft: function (val) {
                this.leftStatus = val;
                this.$emit('setLeft', val);
            }
        }
    }
</script>
<style scoped>
    .wrap {
        border-right: solid 1px #DCDCDC;
        background-color: white;
        position: relative;
        height: 100%;
        width: 200px;
        float: left;
    }
    .wrap .gray {
        background-color: #F6F6F6;
        border: solid 1px #D5D5D5;
        line-height: 38px;
        height: 38px;
        width: 138px;
        color: #333;
    }
    .wrap .orange {
        background-color: #FC634D;
        border: none;
        border-radius: 2px;
        line-height: 40px;
        height: 40px;
        width: 140px;
        color: #FFF;
    }
    .wrap .gray:hover{
        background-color: #FC634D;
        border: none;
        border-radius: 2px;
        line-height: 40px;
        height: 40px;
        width: 140px;
        color: #FFF;
    }
    .wrap .purchase-cpd {
        margin: 40px 0 0 30px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
    .wrap .distribution-cpd {
        margin: 20px 0 0 30px;
        border-radius: 2px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
    .wrap .triangle {
        background-image: url('./img/triangle.png');
        background-position: center center;
        background-size: 16px 31px;
        position: absolute;
        height: 30px;
        width: 16px;
        top: 45px;
        right: -1px;
    }
</style>