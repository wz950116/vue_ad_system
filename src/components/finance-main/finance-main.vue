<template>
<div>
	<header class="header">
        <commonHeader></commonHeader>
    </header>
    <topBanner @dataSend="dataGet"></topBanner>
    <section class="finance-main">
        <section class="finance-left" :style="{ height: mheight + 'px' }">
            <financeLeft></financeLeft>
        </section>
        <section class="finance-content" :style="{ height: mheight + 'px' }">
            <financeOverview></financeOverview>
        </section>
    </section>
</div>
</template>
<style scoped>
    .finance-main {
    	background: #f8f8f8;
    	overflow: hidden;
    }
    .finance-main .finance-left {
    	float: left;
    	width: 200px;
    	background-color: #fff;
    	height: 100%
    }
    .finance-main .finance-content {
        height: 100%;
        overflow-y: auto;
        margin-left: 200px;
        background: #f8f8f8;
    }
</style>
<script>
    var header = require('../header/header');
    var topBanner = require('../top-banner/top-banner');
    var financeLeft = require('../finance-left/finance-left');
    var financeOverview = require('../finance-overview/finance-overview');

    exports.components = {
        'commonHeader': header,
        'topBanner': topBanner,
        'financeLeft': financeLeft,
        'financeOverview': financeOverview,

    }
    exports.data = function() {
    	return {
                mheight: document.documentElement.clientHeight - 110
        }
    }
    exports.beforeMount = function() {
        var _this = this;
            window.addEventListener('resize', function () {
                _this.mheight = document.documentElement.clientHeight - 119;
            });
    }
</script>