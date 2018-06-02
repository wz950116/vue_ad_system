<template>
    <div class="signin-container" :style="{ height: cheight + 'px' }">
        <div class="signin-mid">
            <div class="passport-signin-embed"></div>
        </div>
    </div>
</template>

<script scoped>
    // var $$qualiModel = require('../../script/data/model/qualification.js');
    module.exports = {
        data: function () {
            return {
                cheight: document.documentElement.clientHeight - 245
            }
        }, 
        mounted: function () {
            var _this = this;
            window.FCLogin.config({
                render: 'page',
                module: ".passport-signin-embed",
                hideOtherLogin: true,
                onBindEnd: function () {
                    _this.$router.push('/');
                    location.reload();
                }
            }).open();
        }
    }
</script>

<style scoped>
    .signin-container {
        width: 100%;
        min-height: 500px;
        background: #459ef8 url('./img/index_bg.jpg') top center no-repeat;
    }

    .signin-mid {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }

    .passport-signin-embed {
        position: absolute;
        left: 50%;
        margin-left: -172px;
        top: 30px;
    }
</style>

