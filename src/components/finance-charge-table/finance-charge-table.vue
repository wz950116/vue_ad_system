<template>
	<div class="finance-charge-table">
		<table class="table-box">
			<tr class="t-header-line">
				<th v-for="(item,index) in tableHeader" class="header" :style = "{width: item.width}">{{item.value}}</th>
			</tr>
			<tr class="t-list-line"  v-for= "(item,index) in list" :class= "[{greyline: (index % 2) === 0},{whiteline:(index % 2) === 1}]">
				<td class="td" style="width: 13%;">{{item.applyTime}}</td>
				<td class="td" style="width: 22%;">{{item.header}}</td>
				<td class="td" style="width: 15%;">{{item.amount}}</td>
				<td class="td" style="width: 12%;">{{item.remitTime}}</td>
				<td class="td" style="width: 12%;">{{item.status}}</td>
				<td class="td" style="width: 26%;">{{item.comments}}</td>
			</tr>
		</table>
		  <div class="page-block">
		    <el-pagination
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      layout="total, prev, pager, next, jumper"
		      :total= "total_count">
		    </el-pagination>
		  </div>
</div>
</template>
<script>
var $$getChargeList = require('./getChargeList.js');
var _ = require('../../lib/underscore.v1.8.3.js');
module.exports = {
	data: function() {
		return {
			tableHeader: [{
				value: '申请时间',
				width: '13%'
			}, {
				value: '汇款抬头',
				width: '22%'
			}, {
				value: '申请金额',
				width: '15%'
			}, {
				value: '汇款日期',
				width: '12%'
			}, {
				value: '状态',
				width: '12%'
			}, {
				value: '备注',
				width: '26%'
			}],
			//请求时发送的数据
			page_index: 1, //页码
			page_size: 10, //每页list数
			list: [], //返回的表格中的数据
			total_count: 0, //总条数
			currentPage: 1 // 一开始定位在第几页
		}
	},
	methods: {
		handleCurrentChange: function(val) { // 点击页码刷新table
			this.page_index = val;
			this.getList();
		},
		getList: function() { // 获取list渲染数据
			var _this = this;
			var params = {
				'page_index': _this.page_index,
				'page_size': _this.page_size
			}
			$$getChargeList(params, function(res) {

				if (res.code === 200 || res.code === '200') {
					_this.list = []; //渲染前clean一下list中的数据项
					_.each(res.data.list, function(item) {
						var obj = {
							'applyTime': item.insertTime,
							'header': item.letterheads,
							'amount': '￥ ' + item.amount,
							'remitTime': item.bookTime,
							'status': item.showstatus,
							'comments': item.auditComments
						}
						_this.list.push(obj);
					});
					_this.total_count = parseInt(res.data.totalCount); //共xx条数据
				}
			})
		}
	},

	beforeMount: function() {
		this.getList();
	}
}
</script>
<style scoped src="./style.css"></style>