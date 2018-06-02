<template>
    <div class="wrap global-clearfix">
        <div class="main">
            <banner v-on:change="switchTab(arguments[0])" :defaultIndex="defaultTab" :list="bannerTabs" />
            <plan-panel :from="'all'" v-show="currentTab === 0" v-bind:isBlock="true" />
            <unit-panel :from="'all'" v-show="currentTab === 1" />
            <idea-panel :from="'all'" v-show="currentTab === 2" />
        </div>
    </div>
</template>
<style scoped>
    .wrap {
        background: #fafafa;
    }

    .plan-desc {
        position: relative;
        margin: 0 40px 35px 40px;
        font-size: 14px;
    }

    .plan-desc .desc-para {
        margin-bottom: 14px;
    }

    .plan-desc .desc-para {
        color: #666;
    }

    .plan-desc .desc-para:first-child {
        color: #333;
    }

    .plan-desc .desc-para .item {
        padding-right: 40px;
    }

    .plan-desc .desc-para.list .item {
        padding-right: 50px;
    }

    .plan-desc .item em {
        color: #e43;
    }

    .plan-desc .desc-btn {
        position: absolute;
        right: 0;
        top: 24px;
    }

    .plan-desc .desc-btn a {
        display: inline-block;
        margin-left: 20px;
        width: 80px;
        height: 40px;
        line-height: 40px;
        color: #000;
        text-align: center;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        background: #f6f6f6;
    }

    .layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: block;
    }

    .layer-bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: #333;
        opacity: 0.5;
        z-index: 10;
    }
</style>
<script>
var left = require('../promotion-left/promotion-left');
var banner = require('../promotion-banner/promotion-banner');
var plan = require('../promotion-plan-table/promotion-plan-table');
var unit = require('../promotion-unit-table/promotion-unit-table');
var idea = require('../promotion-idea-table/promotion-idea-table');
var $$customer = require('../../script/data/model/customer.js');
module.exports = {
    data: function () {
        return {
            defaultTab: 0,
            currentTab: 0,
            bannerTabs: [{
                text: "推广计划"
            }, {
                text: "广告单元"
            }, {
                text: "广告创意"
            }],
            launchStatus: 0
        };
    },
    components: {
        'left': left,
        'banner': banner,
        'plan-panel': plan,
        'unit-panel': unit,
        'idea-panel': idea
    },
    watch: {
        '$route': function (to, from) {
            var params = this.getQueryString('type'),
                plan_status = this.$route.query.plan_status;
            if (params != null) {
                if (params == 2 && plan_status != 2) {
                    this.currentTab = 1;
                    this.defaultTab = 1;
                } else {
                    this.currentTab = 2;
                    this.defaultTab = 2;
                }
            } else {
                this.currentTab = 0;
                this.defaultTab = 0;
            }
        }
    },
    methods: {
        switchTab: function(tabIndex) {
            this.currentTab = tabIndex;
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var str = location.href;
            var num = str.indexOf("?")
            str = str.substr(num + 1);
            var result = str.match(reg);
            if (result != null) {
                return unescape(result[2]);
            } else {
                return null;
            }
        },
        changeCurrentTab: function() {
            var params = this.getQueryString("type"),
                plan_status = this.$route.query.plan_status;
            if (params != null) {
                if (params == 2 && plan_status != 2) {
                    this.currentTab = 1;
                    this.defaultTab = 1;
                } else {
                    this.currentTab = 2;
                    this.defaultTab = 2;
                }
            } else {
                this.currentTab = 0;
                this.defaultTab = 0;
            }
        }
    },
    beforeMount: function() {
        this.changeCurrentTab();
    }
}
</script>
