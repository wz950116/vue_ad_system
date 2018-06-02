<template>
    <div class="direct-customer">
            <index-header />
            <index-left />
            <div class="container">
                <index-account />
                <div class="customer-data">
                    <div class="customer-data-left">整体数据：</div>
                    <div class="customer-data-right">
                        <div class="select">
                            <span class="select-index">最近7天</span>
                            <span class="arrow"><em></em></span>
                            <ul>
                                <li>最近7天</li>
                                <li>最近14天</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <index-data />
                <index-chart />
            </div>
    </div>
</template>
<style scoped>
    .direct-customer{
        
    }
    .container{
        padding:40px;
        overflow:hidden;
        background:#fafafa;
    }
    .customer-data{
        width:100%;
        height:60px;
        line-height:60px;
        padding:5px 0 10px;
        overflow:hidden;
    }
    .customer-data-left{
        float:left;
        font-size: 20px;
        color: #4A4A4A;       
    }
    .customer-data-right{
        float:right;
    }
    .select{
        position:relative;
        width:170px;
        height:38px;
        line-height:38px;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
        font-size: 14px;
        color: #333333;
        margin-top:6px;
        overflow:hidden;
    }
    .select .select-index{
        width:150px;
        height:38px;
        display:block;
        padding-left:10px;
    }
    .select .arrow{
        position:absolute;
        top:0;
        right:0;
        width:18px;
        height:38px;
        background: #EEEEEE;
        border-left: 1px solid #D5D5D5;
        cursor:pointer;
    }
    .select .arrow em{
        position:absolute;
        top:15px;
        right:3px;
        width:0;
        height:0;
        overflow:hidden;
        border: 6px solid transparent;
        border-top-color: #999;
    }
    .select ul{
        position:absolute;
        top:38px;
        left:0;
        width:170px;
        border: 1px solid #D5D5D5;
        border-top:0;
    }
    .select li{
        height:38px;
        width:160px;
        padding-left:10px;
        border-bottom: 1px solid #D5D5D5;
    }
</style>
<script>
    var header,IndexLeft, indexAccount, indexData, indexChart;
    Header = require('../../components/header/header.vue');
    IndexLeft = require('../../components/index-left/index-left.vue');
    indexAccount = require('../../components/index-account/index-account.vue');
    indexData = require('../../components/index-data/index-data.vue');
    indexChart = require('../../components/index-chart/index-chart.vue');

    module.exports = {
        data : function (){
            return{
            }
        },
        components: {
            'index-header' : Header,
            'index-left' : IndexLeft,
            'index-account' : indexAccount,
            'index-data' : indexData,
            'index-chart' : indexChart
        }
    }
</script>