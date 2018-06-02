<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    var $$user = require('./script/data/model/user');
    module.exports = {
        beforeMount: function () {
            var _this = this;
            var data = $$user.getCurrentInfo();
            data.url && _this.$router.push(data.url);
        }
    };
</script>
