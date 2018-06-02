<template>
<div class="finance-charge">
	<div class="m-header">
		<div v-for="(item,index) in btnSwitchTag" class="btn-switch" :class="{btnSelected:(selected === index)}" :style="{color: item.btnColor}" @click="switchPage(index)">{{item.value}}</div>
	</div>
	<div class="m-content">
		<apply-panel v-show="states === 0"></apply-panel>
		<table-panel v-if="states === 1"></table-panel>
	</div>
</div>
</template>
<script>
var _ = require('../../lib/underscore.v1.8.3.js');

    module.exports = {
    	data: function() {
    		return {
                btnSwitchTag:[{
                    value:'线下汇款充值申请',
                     btnColor:'#e43'
                },{
                    value:'充值申请记录',
                     btnColor:'#666666'
                }],
                states:0,
                selected:0,

    		}
    	},
    	components: {
    		'apply-panel': require('../finance-charge-apply/finance-charge-apply'),
    		'table-panel': require('../finance-charge-table/finance-charge-table')
    	},
        methods:{
            /*点击按钮切换面板事件*/
            switchPage:function(index){
                this.states = index;
                this.selected = index;
                _.each(this.btnSwitchTag, function(item){
                    item.btnColor = '#666666';
                })
                this.btnSwitchTag[index].btnColor = '#e43';
            }
        }
    }
</script>
<style scoped src="./style.css"></style>
