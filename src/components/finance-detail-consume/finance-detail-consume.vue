<template>
<div class="finance-detail-consume">
	<div class="header-banner">
		<el-date-picker v-model="dateRange" :editable=false :clearable="false" type="daterange" placeholder="选择日期范围" style="width:217px;" :picker-options="pickerOptions"></el-date-picker>
		<span class="header-btn" @click="downloadExcel()">导出数据</span>
	</div>
	<div class="table-area" id="tableArea" v-if="!noData">
		<div class="table-header">
			<span class="th">日期</span>
			<span class="th">消耗</span>
		</div>

		<!-- 代理商 -->
		<div class="table-list-item" v-for="(list,index) in listData" v-if="(userType == 1) && !isAgentZike">
			<!--  一天的数据包含的下拉标签 -->
			<div class="list-item" @click="collapse(index)">
				<!-- 一条数据 行 -->
				<span class="td">{{list.date}}</span>
				<span class="td">
						<span class="td-text">
              <span style="color:#333333">{{list.totalCost}}</span><span style="color:#3F3F3F">.00</span>
				</span>
				<img src="../finance-detail/images/arrow.png" class="td-arrow" :class="{arrowUp:index == 0 && page_num == 1}">
				</span>
			</div>

			<div class="drop-down-area" v-show="index == 0 && page_num == 1">
				<!-- 点击一条数据展开的table -->
				<table class="inner-table">
					<tr class="inner-table-header">
						<th class="inner-th">日期</th>
						<th class="inner-th">子客</th>
						<th class="inner-th">广告单元</th>
						<th class="inner-th">当日消耗</th>
					</tr>
					<tr class="inner-table-item" v-for="(list_inner,index_inder) in list.inner_table">
						<td class="inner-td" style="width:15%;">{{list_inner.date}}</td>
						<td class="inner-td" style="width:25%;text-align:left;padding-left:15px;">{{list_inner.name}}</td>
						<td class="inner-td" style="width:45%;text-align:left;padding-left:15px;">{{list_inner.adUnit}}</td>
						<td class="inner-td" style="width:15%;text-align:right;padding-right:15px;">
							<span style="color:#333333">￥{{list_inner.dayCost}}</span><span style="color:#3F3F3F">.00</span>
						</td>
					</tr>
				</table>
				<div class="tip-text" v-if="list.inner_table.length == 0">
					暂无数据
				</div>
			</div>

		</div>
		<!--  一天的数据包含的下拉标签 -->

		<!-- 子客和直客 -->
		<div class="table-list-item" v-for="(list,index) in listData" v-if="(userType != 1) || isAgentZike">
			<!--  一天的数据包含的下拉标签 -->
			<div class="list-item" @click="collapse(index)">
				<!-- 一条数据 行 -->
				<span class="td">{{list.date}}</span>
				<span class="td">
            <span style="color:#333333">{{list.totalCost}}</span><span style="color:#3F3F3F">.00</span>
				<img src="../finance-detail/images/arrow.png" class="td-arrow" :class="{arrowUp:index == 0 && page_num == 1}">
				</span>
			</div>

			<div class="drop-down-area" v-show="index == 0 && page_num == 1">
				<!-- 点击一条数据展开的table -->
				<table class="inner-table">
					<tr class="inner-table-header">
						<th class="inner-th">日期</th>
						<!-- <th class="inner-th" style="width:25%;">子客</th> -->
						<th class="inner-th">广告单元</th>
						<th class="inner-th">当日消耗</th>
					</tr>
					<tr class="inner-table-item" v-for="(list_inner,index_inder) in list.inner_table">
						<td class="inner-td" style="width:15%;">{{list_inner.date}}</td>
						<td class="inner-td" style="width:70%;text-align:left;padding-left:15px;">{{list_inner.adUnit}}</td>
						<td class="inner-td" style="width:15%;text-align:right;padding-right:15px;">
							<span style="color:#333333">￥{{list_inner.dayCost}}</span><span style="color:#3F3F3F">.00</span>
						</td>
					</tr>
				</table>
				<div class="tip-text" v-if="list.inner_table.length == 0">
					暂无数据
				</div>
			</div>

		</div>
		<!--  一天的数据包含的下拉标签 -->

	</div>

	<div class="footer-pagination" v-if="!noData">
		<el-pagination @current-change="handleCurrentChange" :page-size="page_size" :current-page="currentPage" layout="prev, pager, next" :total="total_count">
		</el-pagination>
	</div>

	<div class="no-data-tip" v-if="noData">
		暂无数据，可点击"导出数据"下载明细列表
	</div>

</div>
</template>

<script>
var $getDetails = require('./getConsumeDetail.js');
var $getDownloadUrl = require('./getDownLoadUrl.js');
module.exports = {
	data: function() {
		return {
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now(); //只能选择今天以前的日期
				}
			},
			noData: false, // 是否是无数据
			startDate: '',
			endDate: '',
			isAgentZike: false,
			// show: -1,
			defaultDate: [],
			dateRange: [],
			userType: '',
			userName: '',
			listData: [],
			currentPage: 1,
			page_num: 1,
			page_size: 10,
			total_count: 0
		}
	},
	watch: {
		dateRange: function(newV, oldV) {
			var that = this;
			if (oldV.length == 2 && newV.length == 2) {
				var n0 = that.formatDate(newV[0]);
				var n1 = that.formatDate(newV[1]);
				var o0 = that.formatDate(oldV[0]);
				var o1 = that.formatDate(oldV[1]);
				if (n0 != o0 || n1 != o1) {
					that.startDate = that.formatDate(newV[0]);
					that.endDate = that.formatDate(newV[1]);
					that.page_num = 1;
					that.getPageData();
				}
			}
		},
		'$route' (to, from) {
			// 监听路由，如果到楼盘页就执行initRender
			if (to.path.indexOf('finance/detail') > 0) {
				this.initialize();
			}
		}
	},
	methods: {
		//初始化页面
		initialize: function() {
			var that = this;
			var params = {};
			//获取近十天日期，并初始化日期选择控件为选中最近十天
			var d = new Date();
			that.endDate = that.formatDate(d); //今天
			d.setDate(d.getDate() - 9);
			that.startDate = that.formatDate(d); //十天前
			that.dateRange = [new Date(that.startDate), new Date(that.endDate)];
			//判断当前状态是不是从代理商账号点到子客后台
			if (vueRouter.app._route.params.cid) {
				that.isAgentZike = true; //是代理商账户点到了子客界面
			} else that.isAgentZike = false;
			//从vuex中获取当前登陆用户的类型
			that.userType = that.$store.default.state.city.userType;
			that.userName = that.$store.default.state.city.userName;
			//给params赋值，请求页面初始化时的数据
			that.getPageData();
		},
		//页码变化事件
		handleCurrentChange: function(val) {
			this.page_num = val;
			this.getPageData();
		},
		//table表格展开合上
		collapse: function(index) {
			var that = this;
			//如果点击的是已展开的list，则折叠起来，否则打开↓↓↓↓↓↓↓
			var dropArea = $('.drop-down-area');
			if (!dropArea.eq(index).is(':visible')) { //如果点击的是一个未展开的table
				dropArea.each(function() {
					if ($(this).is(':visible')) { //则将未何上的合上
						$(this).slideUp();
					}
				});
				dropArea.eq(index).slideDown(); //并且将所点击的展开
			} else {
				dropArea.eq(index).slideUp(); //否则，将其合上
			}
			//定义红色箭头的动画↓↓↓↓↓↓↓
			var arrows = document.querySelector('#tableArea').querySelectorAll('.td-arrow');
			if (arrows[index].classList.contains('arrowUp')) {
				arrows[index].classList.remove('arrowUp');
				arrows[index].classList.add('arrowDonw');
			} else {
				arrows.forEach(function(a) {
					if (a.classList.contains('arrowUp')) {
						a.classList.add('arrowDown');
						a.classList.remove('arrowUp');
					}
				});
				arrows[index].classList.add('arrowUp');
				arrows[index].classList.remove('arrowDonw');
			}
			//定义红色箭头的动画↑↑↑↑↑↑↑
		},
		//日期格式化
		formatDate: function(d) {
			// var d = new Date(dateStr);
			var month = d.getMonth() + 1;
			var day = d.getDate();
			if (month < 10) {
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}
			return d.getFullYear() + '-' + month + '-' + day;
		},
		//消耗金钱格式化
		formatMoney: function(m) {
			m = parseInt(m).toString().split('').reverse();
			var res = [];
			for (var i = 0; i < m.length; i++) {
				res.push(m[i]);
				if ((i + 1) % 3 == 0 && i < (m.length - 1)) {
					res.push(',');
				}
			}
			return res.reverse().join('');
		},
		//获取页面数据的方法
		getPageData: function() {
			var that = this;
			var params = {
				"startDate": that.startDate,
				"endDate": that.endDate,
				"byAgent": (that.userType == 1 ? true : false).toString(),
				"pageNum": (that.page_num).toString(),
				"pageSize": (that.page_size).toString()
			}
			// console.log(that.$route.params);
			//如果是在代理商列表下点击查看子客后台，则，发送请求时给params添加一个字段
			if (that.$route.params.cid) {
				params.indirectDemanderId = that.$route.params.cid;
			}
			// console.log(params);
			// that.listData = [];
			var e = new Date(that.endDate).getTime();
			var s = new Date(that.startDate).getTime();
			that.total_count = (e - s) / (1000 * 60 * 60 * 24) + 1;
			$getDetails(params, function(res) {
				if (res.code == 0) {
					if (res.data.length == 0 || res.data.length == '') {
						that.noData = true;
					} else {
						that.noData = false;
					}
					//总条数就是选择的天数
					that.listData = [];
					res.data.forEach(function(item, index) {
						var obj = {};
						obj.date = item.date;
						obj.totalCost = parseInt(item.total);
						obj.inner_table = [];
						item.details.forEach(function(d_item, d_index) {
							var d_obj = {};
							d_obj.date = item.date;
							d_obj.demanderId = d_item.demanderId;
							d_obj.adUnit = d_item.orderName;
							d_obj.dayCost = d_item.realCost;
							//代理商采购固定广告位后未分配给子客，就造成消耗的，子客列显示“广告单元未分配给子客”
							if (that.userType == 1 && that.userName == d_item.demanderName) {
								d_obj.name = "广告单元未分配给子客";
							} else {
								d_obj.name = d_item.demanderName;
							}
							obj.inner_table.push(d_obj);
						});
						if (that.isAgentZike) { //如果是代理商点到了子客后台，则需要根据子客ID过滤inner_table数据
							obj.totalCost = 0; //总消耗等于过滤后的子客消耗之和
							obj.inner_table = obj.inner_table.filter(function(item) {
								return item.demanderId == vueRouter.app._route.params.cid;
							});
							obj.inner_table.forEach(function(t_item) {
								obj.totalCost += parseInt(t_item.dayCost);
							});
						}
						//格式化inner_table中的每日消耗
						obj.inner_table.forEach(function(o_item) {
							o_item.dayCost = that.formatMoney(o_item.dayCost);
						});
						//格式化总消耗金额
						obj.totalCost = that.formatMoney(obj.totalCost);
						that.listData.push(obj);
					});
				}
			});
		},
		//导出数据Excel
		downloadExcel: function() {
			console.log('donwloading...');
			var that = this;
			var params = {
				"startDate": that.startDate,
				"endDate": that.endDate,
				"byAgent": (that.userType == 1 ? true : false).toString(),
				"pageNum": (that.page_num).toString(),
				"pageSize": (that.page_size).toString()
			}
			//如果是在代理商列表下点击查看子客后台，则，发送请求时给params添加一个字段
			if (that.$route.params.cid) {
				params.indirectDemanderId = that.$route.params.cid;
			}
			$getDownloadUrl(params, function(res) {
				if (res.code == 0) {
					window.open(res.data);
				}
			});
		}
	},
	beforeMount: function() {
		var that = this;
		that.initialize();
	}
}
</script>

<style scoped src="./style.css"></style>
