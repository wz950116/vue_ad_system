<template>
    <div>
        <banner :navType="headerType"></banner>
        <div class="container" :style="{ height: mheight + 'px' }">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script scoped>
var banner = require('../top-banner/top-banner');
var $$header = require('../../script/data/model/header.js');
module.exports = {
    data: function() {
        return {
            headerType: $$header.getCacheData().demander.data.userType === '1' ? 'index' : 'company',
            mheight: document.documentElement.clientHeight - 110
        }
    },
    components: {
        banner: banner
    },
    beforeMount: function() {
        var _this = this;
        window.addEventListener('resize', function() {
            _this.mheight = document.documentElement.clientHeight - 110;
        });
    }
}
</script>
