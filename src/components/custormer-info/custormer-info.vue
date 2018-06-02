<template>
    <div class="custormer-info">
        <router-link class="btn-return-index" to='/customer/index'>返回首页</router-link>
       <!--  <a href="#/customer/index" class="btn-return-index">返回首页</a> -->
        <p class="company-name">{{companyName}}</p>
        <ul class="data-list">
            <li v-for="item in dataList" class="data-item">{{item.name}}：<span class="data-value">{{item.value}}</span>{{item.uint}}</li>
        </ul>
    </div>

</template>

<script>
    var $$headerModel = require('../../script/data/model/header.js');
    var $$customer = require('../../script/data/model/customer.js');
    var companyId = "";
    exports.data = function () {
        return {
            companyName: '',
            dataList: []
        }
    };
    exports.methods = {
        wrapCid: function(data){
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        }
    };
    exports.beforeMount = function () {
        var _this = this;
        //get from model
        $$headerModel.on("getCustomerInfo", function (res) {
            if (res.code === "200") {
                _this.companyName = res.data.companyName;
                _this.dataList = res.data.dataList;
            }
        });
        $$headerModel.getCustomerInfo(_this.wrapCid({}), function () {
            $$customer.updateBreads();
        });
        /*_this.companyName = '万科集团北京公司';
        _this.dataList = [
            {
                name: '账户余额',
                value: '201805.45',
                uint: '元'
            },
            {
                name: '今日账户消耗',
                value: '451.87',
                uint: '元'
            },
            {
                name: '今日曝光',
                value: '120,897',
                uint: ''
            },
            {
                name: '今日点击',
                value: '78,653',
                uint: ''
            }
        ];*/
    };
</script>

<style scoped>
    .custormer-info{
        height: 68px;
        width: 100%;
        background-color: #4A4A4A;
        color: #fff;
        overflow: hidden;
        zoom: 1;
    }
    .btn-return-index{
        float: left;
        width: 69px;
        height: 37px;
        line-height: 37px;
        padding-left: 24px;
        font-size: 14px;
        background-image: url('./images/return-index.png');
        margin: 15px 0 0 22px;
        color: #fff;
    }
    .company-name{
        float: left;
        font-size: 20px;
        padding: 20px;
    }
    .data-list{
        list-style: none;
        padding-left: 20px;
        overflow: hidden;
        zoom: 1;
    }
    .data-item{
        float: left;
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        padding: 0 20px;
        margin: 27px 0;
        border-left: 1px solid #D8D8D8;
    }
    .data-item:first-child{
        border-left: none;
    }
    .data-value{
        color: #FDBB4D;
    }
</style>
