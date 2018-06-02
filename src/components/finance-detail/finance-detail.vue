<template>
<div class="finance-detail" v-if="true">
	<div class="m-header">
		<div v-for="(item,index) in btnSwitchTag" class="btn-switch" :class="{btnSelected:(selected === index)}" :style="{color: item.btnColor}" @click="switchPage(index)">{{item.value}}</div>
	</div>
	<div class="m-content">
		<finance-panel v-show="states === 0"></finance-panel>
		<consume-panel v-show="states === 1"></consume-panel>
	</div>
</div>
</template>
<style scoped>
.finance-detail {
	padding: 0 40px;
}

.finance-detail .m-content {
	width: 100%;
	height: 100%;
}


.finance-detail .m-header {
	height: 74px;

	border-bottom: 1px solid #d8d8d8;
}

.finance-detail .m-header .btn-switch {
	font-size: 18px;
	line-height: 36px;

	float: left;

	margin: 36px 55px 0 36px;

	cursor: pointer;
	letter-spacing: 0;
}

.finance-detail .m-header .btnSelected {
	border-bottom: 3px solid #e43;
}
</style>

<script>
var _ = require('../../lib/underscore.v1.8.3.js');
module.exports = {
	data: function() {
		return {
			btnSwitchTag: [{
				value: '财务明细',
				btnColor: '#e43'
			}, {
				value: '消耗明细',
				btnColor: '#666666'
			}],
			states: 0,
			selected: 0,
		}
	},
	components: {
		'finance-panel': require('../finance-detail-finance/finance-detail-finance'),
		'consume-panel': require('../finance-detail-consume/finance-detail-consume')
	},
	methods: {
		//点击  按钮   切换面板事件
		switchPage: function(index) {
			this.states = index;
			this.selected = index;
			_.each(this.btnSwitchTag, function(item) {
				item.btnColor = '#666666';
			})
			this.btnSwitchTag[index].btnColor = '#e43';
		}
	}
}
</script>
