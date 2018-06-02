<template>
	<div class="finance-charge-apply">
		<div class="line-block">
			<span class="title-text">汇款抬头</span>
			<el-input class="input-style" v-model="remitHeads" placeholder="请输入汇款人姓名或汇款公司名称"></el-input>
		</div>
		<div class="line-block">
			<span class="title-text">汇款金额</span>
			<el-input class="input-style" v-model="remitAmount" placeholder="请输入汇款金额" @change="isInt"></el-input>
			<span class="erro-info" v-if="badMoney">*请输入整数数字</span>
		</div>
		<div class="line-block">
			<span class="title-text">汇款日期</span>
			<el-date-picker class="date-style" v-model="remitDate" :editable= false  type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
		</div>
		<div class="line-block">
			<span class="title-text">汇款凭证</span>

			<div class="upload-box">
	            <div class="picCanvas">
	            	<img :src="imageFile.url" class="imgbox">
	            </div>
	            <div class="choose-file-box" >
	                <a id= "selectImage" class="btn-upload" :class="{uploaded:uploaded}">
	                	<span class="upload-icon" style="color:#999999;">+</span>
	                	<span class="upload-tip" style="color:#999999;">请上传汇款凭证，不超过1MB的png或jpg</span>
	                </a>
	            </div>
	        </div>
        </div>

		<div class="submit-line">
			<span class="submit-btn" @click="submit">确认提交</span>
		</div>

		<alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
	</div>
</template>
<script>
var $$upload = require('../../lib/lib-upload');
var $$agent = require('../../script/data/model/agent.js');
var uploadUrl = require('../../lib/uploadurl.js');
var alert = require('../alert/alert');
var $$submitApply = require('./submitChargeApply.js');
module.exports = {
	data: function() {
		return {
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now(); //只能选择今天以前的日期
				}
			},
			remitHeads: '', //汇款抬头
			remitAmount: '', //汇款金额
			badMoney:false,
			remitDate: '', //汇款日期
			imageFile: {
				url: '', //获取到的上传图片的路径
				isPic: false
			},
			alert: {
				show: false,
				message: '',
				status: 0
			},
			uploaded: false
		}
	},
	components: {
		alert: alert
	},

	mounted: function() {
		this.uploadImg();
	},
	methods: {
		//初始化，清空表单
		initialize: function() {
			this.remitHeads = '';
			this.remitAmount = '';
			this.badMoney = false;
			this.remitDate = '';
			this.imageFile.url = '';
			this.imageFile.isPic = false;
			this.uploaded = false;
		},

		//弹窗事件
		alertShow: function(status, txt) {
			var _this = this;
			_this.alert.status = status;
			_this.alert.message = txt;
			_this.alert.show = true;
			window.setTimeout(function() {
				_this.alert.show = false;
			}, 2000);
		},
		//选择上传图片文件事件
		uploadImg: function() {
			var self = this;
			$$upload({
				id: '#selectImage',
				uploadUrl: uploadUrl,
				fileName: 'file',
				min: 0,
				max: 1024 * 1024,
				type: ['png', 'jpg', 'PNG', 'JPG'],
				fn: function(res) {
					if (res.code !== 0) {
						self.alertShow(1, res.error);
						return;
					}
					if (res.code === 0) {
						self.imageFile.url = res.data.url;
						self.imageFile.isPic = true;
						self.uploaded = true;
						self.alertShow(0, "上传成功");
					}
				}
			});
		},

		//判断金额是否为整数
		isInt: function() {
			var _this = this;
			var regex = /^\d+$/; //判断汇款金额是否为纯数字
			if (_this.remitAmount !== '' && !regex.test(_this.remitAmount)) {
				_this.badMoney = true;
			} else _this.badMoney = false;
		},

		//处理时间格式
		formatDate: function(dateStr) {
			var d = new Date(dateStr);
			return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		},

		//点击确认提交事件
		submit: function() {
			var _this = this;
			if(_this.remitHeads.trim() == ''){
				_this.alertShow(1, '汇款抬头不可为空');
				return;
			}

			if(_this.remitAmount.trim() == ''){
				_this.alertShow(1, '汇款金额不可为空');
				return;
			}else{
				var regex = /^\d+$/;  //判断汇款金额是否为纯数字
				if (_this.badMoney) {
					_this.alertShow(1, '汇款金额格式有误');
					return;
				}
				if(_this.remitAmount.toString().length > 8){
					_this.alertShow(1, '充值金额达到最大上限');
					return;
				}
			}

			if (typeof(_this.remitDate) == 'undefined') {
				_this.alertShow(1, '汇款日期不可为空');
				return;
			} else {
				if (_this.remitDate.toString().trim() == '') {
					_this.alertShow(1, '汇款日期不可为空');
					return;
				}
			}

			if(_this.imageFile.url.trim() == ''){
				_this.alertShow(1, '请上传正确的汇款凭证');
				return;
			}
			var submitData = {
				'letterheads': _this.remitHeads,
				'amount': _this.remitAmount.trim(),
				'bookTime': _this.formatDate(_this.remitDate),
				'bookLicenceUrl': _this.imageFile.url,
			}
			$$submitApply(submitData, function(res) {
				if (res.code === 200 || res.code === '200') {
					if (res.data.insertresult === 1 || res.data.insertresult === '1') {
						_this.initialize();//清空表单，页面数据初始化
						_this.alertShow(0, res.msg);
						// var reflash = setTimeout(function() {
						// 	console.log('test');
						// 	//location.reload();
						// }, 800);
					} else _this.alertShow(1, res.msg);
				} else {
					_this.alertShow(1, res.msg);
				}
			})
		}
	}
}
</script>
<style scoped src="./style.css"></style>
