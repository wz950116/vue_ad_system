<template>
    <div class="index-left">
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <editCompany ref="editCompany"></editCompany>
        <div class="left-con">
            <a href="javascript:;" v-on:click="clickSummary" class="sjzl">数据总览</a>
            <span v-show="indicatorIndex === -1" class="left-arrow"></span>
        </div>
        <div class="left-con1">
            <span class="add-comany" v-on:click="addCompany()"><em></em>添加公司</span>
        </div>
        <!-- 列表内容 -->
        <div>
            <div class="left-con2">
                <div style="position:relative;">
                    <input v-model="searchParams.keyword" type="text" placeholder="输入子客名称" class="search-input" />
                    <span @click="search" style="position:absolute;top:0;right:0;height:40px;width:40px;cursor:pointer"></span>
                </div>
                <status-select v-on:change="changeStatusSelect(arguments[0])" :defaultIndex="defaultIndex" :options="statusOptions" />
            </div>
            <div class="ul company-list" ref="companyList" :style="{ height: mheight + 'px' }">
                <div v-for="(item, index) in dataset" v-on:click="clickCompany(index)" v-bind:class="['company-status-' + item.status, {'company-item': (item.selected && indicatorIndex !== -1)}]">
                    <span class="ico"></span>
                    <span class="ico-layer">{{status_text[item.status - 1]}}</span>
                    <span class="company-name" :title="item.name">{{item.name}}</span>
                    <span v-show="indicatorIndex === index" class="left-arrow"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .company-name {
        display: inline-block;
        text-align: center;
        width: 165px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        letter-spacing: 0px;
    }

    .index-left .selecter {
        width: 180px;
        text-align: left;
    }

    .index-left .company-list {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .index-left .company-list .company-item {
        background-color: #ff613e;
        color: #fff;
    }

    .index-left .company-list .company-item .left-arrow {
        top: 8px;
        visibility: hidden;
    }

    .company-list .ico {
        display: inline-block;
        width: 35px;
        height: 38px;
    }

    .company-list .company-status-2, .company-list .company-status-1, .company-list .company-status-3 {
        font-size: 0px;
        letter-spacing: -4px;
    }

    .company-list .company-status-2 .ico {
        font-size: 14px;
        letter-spacing: 0px;
        background: url(images/dtb_a1.png)  center right no-repeat;
    }

    .company-list .company-status-1 .ico {
        font-size: 14px;
        letter-spacing: 0px;
        background: url(images/dtb_a2.png)  center right no-repeat;
    }

    .company-list .company-status-3 .ico {
        font-size: 14px;
        letter-spacing: 0px;
        background: url(images/dtb_a3.png) center right no-repeat;
    }

    .index-left {
        float: left;
        position: relative;
        width: 200px;
        border-right: 1px solid #E4E4E4;
        /*text-align: center;*/
        height: 100%;
    }

    .index-left .left-arrow {
        position: absolute;
        right: -11px;
        top: 35px;
        width: 20px;
        height: 20px;
        border: 1px solid #E4E4E4;
        display: block;
        background: #fafafa;
        transform: rotate(-45deg);
        border-right: none;
        border-bottom: none;
    }

    .left-con {
        width: 200px;
        height: 65px;
        text-align: center;
        line-height: 65px;
        padding-top: 25px;
        position: relative;
    }

    .left-con1 {
        width: 200px;
        height: 50px;
        line-height: 50px;
        background: #F8F8F8;
        padding-top: 10px;
        border: 1px solid #e4e4e4;
        border-left: none;
        border-right: none;
    }

    .sjzl {
        width: 140px;
        height: 40px;
        line-height: 40px;
        background: #FF613E;
        border-radius: 2px;
        color: #fff;
        text-align: center;
        display: block;
        margin: 0 auto;
        font-size: 14px;
    }

    .add-comany {
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #FF613E;
        border-radius: 2px;
        background: #fff;
        text-align: center;
        display: block;
        margin: 0 auto;
        border: 1px dashed #FF613E;
        font-size: 14px;
        cursor: pointer;
    }

    .add-comany em {
        width: 10px;
        height: 10px;
        display: inline-block;
        background: url(images/jiahao.png) 0 0;
        margin-right: 5px;
    }

    .input-error {
        position: absolute;
        left: 115px;
        top: 42px;
        color: red;
        font-size: 12px;
    }

    .top {
        top: 135px;
    }

    .search-input {
        width: 130px;
        height: 40px;
        line-height: 40px;
        background: #FFFFFF url(images/search.png) 93% center no-repeat;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
        color: #999;
        padding: 0 40px 0 10px;
        margin: 0 0 9px 0;
        font-size: 14px;
    }

    .left-con2 {
        border-bottom: 1px solid #e4e4e4;
        padding: 9px;
    }

    .ul div {
        position: relative;
        font-size: 14px;
        color: #4A4A4A;
        width: 200px;
        height: 38px;
        line-height: 38px;
        cursor: pointer;
        border-bottom: 1px solid #e4e4e4;
        text-align: left;
    /*    background: url(images/dtb_a1.png) 12px center no-repeat;*/
    }

    input {
        border: 0;
        outline: none;
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

    .layer-box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 500px;
        height: 400px;
        margin-left: -250px;
        margin-top: -200px;
        background: #fff;
        border: 1px solid #D5D5D5;
        z-index: 100;
    }

    .layer-box .header {
        padding-left: 20px;
        height: 48px;
        line-height: 48px;
        color: #666;
        font-size: 16px;
        border-bottom: 1px solid #d5d5d5;
        text-align: left;
    }

    .layer-box .close {
        content: '';
        display: block;
        float: right;
        margin: 18px;
        width: 14px;
        height: 14px;
        cursor: pointer;
        background: url('images/guanbi.png') no-repeat center center;
    }

    .company-list .ico-layer {
        display: none;
        position: absolute;
        left: 40px;
        top: 8px;
        padding-right: 5px;
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        border-radius: 2px;
        font-size: 12px;
        letter-spacing: 0px;
    }
    .company-list .ico:hover + .ico-layer {
        display: block;
    }

    .company-list .ico-layer:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin: 5px 5px 0 -5px;
        border-width: 5px 5px 5px 0;
        border-style: solid;
        border-color: #fff #d0f1ad #fff #fff;
    }

    .company-list .company-status-1 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #FEC86F;
        color: #975F03
    }

    .company-list .company-status-1 .ico-layer:before {
        border-right-color: #FEC86F;
    }
    .company-list .company-status-2 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #d0f1ad;
        color: #346102;
    }

    .company-list .company-status-2 .ico-layer:before {
        border-right-color: #d0f1ad;
    }
    .company-list .company-status-3 .ico-layer {
        font-size: 14px;
        letter-spacing: 0px;
        background: #FBCAC5;;
        color: #B71D0E;
    }

    .company-list .company-status-3 .ico-layer:before {
        border-right-color: #FBCAC5;
    }
</style>
<script>
var selecter = require('../selecter/selecter');
var $$upload = require('../../lib/upload.js');
var $$agent = require('../../script/data/model/agent.js');
var uploadUrl = require('../../lib/uploadurl.js');
var alert = require('../alert/alert.vue');

var editCompany = require('./edit-company.vue');
module.exports = {
    data: function() {
        return {
            mheight: 0,
            indicatorIndex: -1,
            dataset: [],
            defaultIndex: 0,
            statusOptions: [{
                value: '0',
                text: '全部'
            }, {
                value: '1',
                text: '审核中的子客'
            }, {
                value: '2',
                text: '已通过的子客'
            }, {
                value: '3',
                text: '未通过的子客'
            }],
            searchParams: {
                keyword: '',
                status: 0
            },
            alert: {
                show: false,
                message: '',
                status: 0
            },
            status_text:["正在审核中","审核已通过","审核未通过"]
        }
    },
    components: {
        'status-select': selecter,
        alert: alert,
        editCompany: editCompany
    },
    methods: {
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        clickSummary: function() {
            this.indicatorIndex = -1;
            this.$emit('sumClicked');
        },
        clickCompany: function(index) {
            this.indicatorIndex = index;
            for (var i = 0, len = this.dataset.length; i < len; i++) {
                this.dataset[i].selected = (i === index);
            }
            var id = this.dataset[index].id;
            // $$agent.getSubCustomerInfo({
            //     id: id
            // });
            this.$emit('subClicked', id);
        },
        changeStatusSelect: function(statusValue) {
            this.searchParams.status = statusValue.value;
            this.search();
        },
        addCompany: function(event) {
            var self = this;
            this.$refs.editCompany.companyDialog = true;
            //类型1为新建公司
            this.$refs.editCompany.formType = 1;
            this.$refs.editCompany.companyForm = {
                name: '',
                zhucehao: '',
                pic: '',
                isPic: false
            };
        },
        search: function() {
            $$agent.searchSubCustomers(this.getParams());
        },
        getParams: function() {
            this.searchParams.status = parseInt(this.searchParams.status);
            return this.searchParams;
        }
    },
    created: function() {
        this.mheight = document.documentElement.clientHeight - 358;
    },
    beforeMount: function() {
        this.search();
        var _this = this;
        window.addEventListener('resize', function() {
            _this.mheight = document.documentElement.clientHeight - 358;
        });
        $$agent.on('searchSubCustomers', function(data) {
            var list = data.data.list;
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].selected = false;
            }
            _this.dataset = list;
        });
        $$agent.on('createSubCustomer', function(data) {
            if (data.data.updateResult === "1") {
                $$agent.searchSubCustomers(_this.getParams());
                $$agent.getSubCustomerList();
            }
        });
        $$agent.on('editSubCustomer', function(data){
            if (data.data.updateResult === "1") {
                $$agent.searchSubCustomers(_this.getParams());
                $$agent.getSubCustomerList();
                _this.clickCompany(_this.indicatorIndex);
            }
        });
        $$agent.on('changeComStatus', function(data) {
            _this.defaultIndex = data;
            _this.searchParams.status = data;
            _this.search();
        });
    }
}
</script>
