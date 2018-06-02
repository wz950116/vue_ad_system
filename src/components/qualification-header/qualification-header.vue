<template>
    <div class="header">
        <div class="header-cnt global-clearfix">
            <div class="header-left">
                <a href="javscript:;" @click="goCityIndex()"><img src="./img/logo.png" alt=""/></a>
                <span class="tit">广告系统</span>
            </div>
            <div class="header-right">
                <a :href="regUrl" >第一次使用焦点广告平台？<span>立即注册</span></a>
                <!-- <a href="javscript:;" v-if="isLogin === 1"><span>{{nickName}}</span>|<span
                        @click.prevent="logout">退出</span></a> -->
            </div>
        </div>
    </div>
</template>
<style scoped>
    .header {
        width: 100%;
        background: #fff;
        padding-bottom: 10px
    }

    .header-cnt {
        padding: 0 75px;
        margin: 0 auto;
        color: #333;
    }

    .header-left {
        float: left;
        width: 300px;
        padding: 10px 0 20px;
    }

    .header-right {
        float: right;
        padding-top: 30px;
    }

    .header-left img {
        display: inline-block;
        width: 133px;
        height: 38px;
        vertical-align: bottom;
    }

    .header-left .tit {
        padding-left: 10px;
        font-size: 24px;
        vertical-align: bottom;
    }

    .header-right a {
        color: #333;
        font-size: 14px;
    }

    .header-right a span:first-child {
        padding-right: 10px;
    }

    .header-right a span:last-child {
        padding-left: 10px;
        color: #e43;
    }
</style>
<script>
    var $$config = require('../../script/config.js');
    var $$util = require('../../lib/util.js');
    var $$qualiModel = require('../../script/data/model/qualification.js');
    var $$user = require('../../script/data/model/user.js');
    var type = '';
    var base = location.hostname;
    if (base.indexOf('focus-test') >= 0 || base.indexOf('focus-dev') >= 0) {
        type = 'test';
    }
    module.exports = {
        data: function () {
            return {
                isLogin: 0,
                nickName: '',
                regUrl: '//login.focus' + type + '.cn/w/reg?ru=' + location.href
            }
        },
        methods: {
            domainSuffix: function () {
                var suffixValue = ".focus.cn";
                if (base.indexOf('focus-test') >= 0) {
                    suffixValue = ".focus-test.cn";
                } else if (base.indexOf('focus-dev') >= 0) {
                    suffixValue = ".focus-dev.cn";
                }
                return suffixValue;
            },
            logout: function () {
                var _this = this;
                var domainValue = this.domainSuffix();
                $$util.clearCookie('pprdig', domainValue, '/');
                $$util.clearCookie('ppinf', domainValue, '/');
                //清session 0221
                // $$qualiModel.clearSession(function (data) {
                //     if (data.code === '200') {
                //         _this.isLogin = 0;
                //         _this.$router.push('/qualification/login');
                //     }
                // });
                setTimeout(function(){
                    _this.isLogin = 0;
                    _this.$router.push('/qualification/login');
                }, 500);
            },
            goCityIndex: function () {
                $$qualiModel.getCityIndex({},function (data) {
                    if (data.code == '200') {
                        window.open("//"+data.data.url);
                    };
                })
            }
        },
        beforeMount: function () {
            var _this = this;
            var data = $$user.getCurrentInfo().data;
            _this.isLogin = (data.userStatus === '401') ? 0 : 1;
            _this.nickName = data.accountId;
        }
    }
</script>
