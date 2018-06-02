<template>
    <div class="doc" :style="{ height: mheight + 'px' }">
        <qheader></qheader>
        <keep-alive>
            <router-view>
            </router-view>
        </keep-alive>
        <qfooter></qfooter>
    </div>
</template>
<style scoped>
    .doc {
        position: relative;
        background-color: #F5F5F5;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
<script scoped>
    var qheader = require('../qualification-header/qualification-header');
    var qfooter = require('../qualification-footer/qualification-footer');

    module.exports = {
        data: function () {
            return {
                mheight: document.documentElement.clientHeight,
                cheight: document.documentElement.clientHeight - 245
            }
        },
        components: {
            qheader: qheader,
            qfooter: qfooter
        }
    }
</script>