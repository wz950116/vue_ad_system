<template>
    <div class="wrap global-clearfix">
        <div class="left">
            <left></left>
        </div>
        <div class="main">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<style scoped>
    .wrap {
        background: #fafafa;
        height: 100%;
    }

    .left {
        float: left;
        height: 100%;
    }

    .main {
        margin-left: 201px;
        height: 100%;
        overflow-y: scroll;
        background: #fafafa;
    }
</style>
<script>
    var $model = require('../../script/data/model/header');
    var left = require('../settings-left/settings-left');

    module.exports = {
        components: {
            left: left
        },
        activated: function () {
            $model.inTab();
        }
    };
</script>



