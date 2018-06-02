<template>
    <div class="root">
        <div class="left">
            <purchase-left/>
        </div>
        <div class="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<style scoped>
    .root {
        height: 100%;
        background: #fafafa;
    }
    .left {
        float: left;
        width: 200px;
        height: 100%;
    }

    .main {
        margin-left: 201px;
        height: 100%;
    }
</style>
<script scoped>
    var $model = require('../../script/data/model/header');
    var purchaseLeft = require('../purchase-left/purchase-left');
    module.exports = {
        data: function () {
            return {
                msg: ''
            }
        },
        components: {
            'purchase-left': purchaseLeft
        },
        activated: function () {
            $model.inTab();
        },
        beforeMount: function () {
            //
        }
    };
</script>