<template>
    <div class="index">
        <!-- 是否显示左侧菜单栏 -->
        <index-left 
            v-on:subClicked="onSubClick(arguments[0])" 
            v-on:sumClicked="viewState = 0" 
            v-if="userType === 1" />

        <!-- 右侧内容 -->
        <div class="container">
            <!--展示数据总览 -->
            <div v-if="viewState === 0">
                <!-- 代理商 开发商 共用信息头 -->
                <index-account :data="userInfo" :type="userType" />

                <div class="main" v-if="userType === 1">
                    <!-- tab菜单 -->
                    <banner v-on:change="switchTab(arguments[0])" :defaultIndex="defaultTab" :list="bannerTabs" />
                    <!-- 下拉菜单 -->
                    <div class="filter-exam left" v-if="userType === 1">
                        <checkbox-selecter
                            @platformArr="platformData"
                            :tableData="tableData" 
                            :titleName="titleName"
                            :label="label"
                            class="status-select" v-if="currentTab === 0" />
                        <selecter
                            v-on:change="changeStatusSelect(arguments[0])" 
                            :defaultIndex="defaultIndexOption" 
                            :options="datasetOptions" 
                            class="status-select" v-if="currentTab === 0" />
                        <span class="index-export-data" @click="exportExcel">
                            导出数据
                        </span>
                    </div>
                </div>
                
                <!-- <index-data :data="userData" /> -->

                <!-- 代理商表格 -->
                <div v-if="userType === 1" class="table-wrap">
                    <index-table 
                        v-if="currentTab === 0" 
                        :listType="currentTab" 
                        :dateSelect="statusSelect"
                        :platform="platformSelected"/>
                    <index-table 
                        v-if="currentTab === 1" 
                        :listType="currentTab" 
                        :dateSelect="statusSelect"
                        :platform="platformSelected"/>
                </div>

                <!-- 开发商直客 -->
                <div class="select-section" v-if="userType !== 1">
                    <span class="totalData">整体数据：</span>
                    <div class="select">
                        <selecter v-on:change="changeChartSelect(arguments[0])" :defaultIndex="0" :options="datasetOptions" />
                    </div>
                    <div class="section-tab">
                        <div class="section-tab-item">
                            <p class="item-data item-expose">{{ overData.expose | amountFormat }}</p>
                            <p class="item-name">曝光量</p>
                        </div>
                        <div class="section-tab-item">
                            <p class="item-data item-click">{{ overData.click | amountFormat }}</p>
                            <p class="item-name">点击量</p>
                        </div>
                        <div class="section-tab-item">
                            <p class="item-data item-clickRate">{{ overData.clickRate }}</p>
                            <p class="item-name">点击率</p>
                        </div>
                        <div class="section-tab-item">
                            <p class="item-data item-cost">￥{{ overData.cost | moneyFormat }}</p>
                            <p class="item-name">总花费</p>
                        </div>
                    </div>
                </div>
                <index-chart v-if="userType !== 1" ref="chart" :dataset="statis" />
            </div>

            <!-- 代理公司 子客管理页面 -->
            <div v-if="viewState !== 0">
                <index-sub :demanderID="demanderID" v-if="userType === 1" :data="customerInfo"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .index {
        height: 100%;
    }

    .container {
        height: 100%;
        padding: 40px 30px 40px 40px;
        overflow-y: scroll;
        overflow-x: hidden;
        background: #fafafa;
        box-sizing: border-box;
    }

    .select-section {
        position: relative;
        height: 60px;
        line-height: 40px;
        clear: both;
    }

    .select-section .select {
        float: right;
    }

    .select-section .selecter {
        width: 170px;
    }

    .select-section .totalData {
        font-size: 20px;
        font-weight: bold;
        height: 26px;
        line-height: 26px;
    }
    
    .filter-exam, .left {
        min-height: 40px;
    }

    .status-select {
        width: 170px;
        height: 38px;
        margin: 0 14px 14px 0;
    }

    .index-export-data {
        float: right;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #f6f6f6;
        border: 1px solid #d5d5d5;
        border-radius: 2px;
        cursor: pointer;
    }

    .section-tab {
        width: 100%;
        height: 80px;
        padding: 10px 20px;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 20px;
    }

    .section-tab-item {
        float: left;
        width: 25%;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        border-right: 1px solid #eeeeee;
        font: 14px/19px 'MicrosoftYaHei';
        color: #666;
    }

    .section-tab-item:last-of-type {
        border: none;
    }

    .section-tab-item:first-of-type {
        padding: 0;
    }

    .section-tab-item .item-name {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
    }
    .section-tab-item .item-expose {
        color: #FF613E;
    }

    .section-tab-item .item-click {
        color: #28B779;
    }

    .section-tab-item .item-clickRate {
        color: #4990E2;
    }

    .section-tab-item .item-cost {
        color: #FFB848;
    }
    
    .item-data {
        height: 31px;
        line-height: 31px;
        font-size: 24px;
    }
</style>
<script>
var header = require('../../components/header/header.vue');
var indexLeft = require('../../components/index-left/index-left.vue');
var indexAccount = require('../../components/index-account/index-account.vue');
// var indexData = require('../../components/index-data/index-data.vue');
var indexTable = require('../../components/index-table/index-table.vue');
var indexChart = require('../../components/index-chart/index-chart.vue');
var subInfo = require('../../components/index-sub/index-sub.vue');
var selecter = require('../selecter/selecter');

var banner = require('../index-banner/index-banner.vue');

var $$header = require('../../script/data/model/header.js');
var $$agent = require('../../script/data/model/agent.js');
var $$customer = require('../../script/data/model/customer.js');

var adModel = require('../../script/data/model/ad.js');

module.exports = {
    data: function() {
        return {
            viewState: 0,
            userType: 1, // 1: agent, 1: ...
            demanderID: '',
            // 代理商信息
            userInfo: {
                availableBalance: '',
                availableGrant: '',
                creditLine: '',
                todayCost: '',
                totalBalance: '',
                totalGrant: ''
            },
            // 代理商子客信息
            customerInfo: {},
            userData: {
                expose_count: '',
                click_count: '',
                click_rate: '',
                total_pay: ''
            },
            agentTable: [],
            totalNum: 0,
            statis: [],
            datasetOptions: [
                {
                    value: 30,
                    text: '过去30天'
                },
                {
                    value: 7,
                    text: '过去7天'
                },
                {
                    value: 1,
                    text: '昨天'
                },
                {
                    value: 0,
                    text: '今天'
                }
            ],
            dateOption: 30,
            // Tab菜单
            currentTab: 0,
            defaultTab: 0,
            bannerTabs: [
                {
                    text: "子客数据概览"
                }, {
                    text: "待上传创意单元"
                }
            ],
            tableData: [],
            titleName: '选择投放平台',
            label: '全部',
            statusSelect: 30,
            platformSelect: [],
            platformSelected: [],
            currentPage: 4,
            defaultIndexOption: 0,
            // 整体数据
            overData: {
                click: '',
                clickRate: '',
                cost: '',
                expose: ''
            }
        };
    },
    components: {
        'index-header': header,
        'index-left': indexLeft,
        'index-account': indexAccount,
        // 'index-data': indexData,
        'index-table': indexTable,
        'index-chart': indexChart,
        'index-sub': subInfo,
        'selecter': selecter,
        
        // 选择投放平台下拉菜单组件
        "checkbox-selecter": function (resolve) {
                return require(['../selecter/checkbox-selecter.vue'], resolve);
            },
        // Tab菜单组件
        'banner': banner
    },
    computed: {
        getAgentTable: function () {
            return this.agentTable;
        }
    },
    filters: {
        moneyFormat: function (money) {
            // 若为负值则返回0
            if (typeof money === 'number') money = money.toString();
            if (/[^0-9\.]/.test(money)) return '0.00';
            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + money.replace(/^\./, "0.");
        },
        amountFormat: function (amount) {
            // 若为负值则返回0
            if (typeof amount === 'string') amount = Number(amount);
            if (/[^0-9\.]/.test(amount)) return '0.00';
            var arr = amount.toString().replace(/\.\d*/g, '').split('').reverse(), newArr = [];
            for (var i=0; i < arr.length; i++) {
                var newStr = (i + 1) % 3 === 0 && i < arr.length - 1 ? ',' + arr[i] : arr[i];
                newArr.push(newStr);
            }
            return newArr.reverse().join('');
        }
    },
    methods: {
        onSubClick: function (id) {
            var _this = this;
            _this.viewState = 1;
            _this.demanderID = id;
            // 请求代理商子客的account部分
            $$agent.getChildDetail({
                "childId": id
            }, function (res) {
                _this.customerInfo = res.data;
            });
        },
        changeChartSelect : function (select) {
            var _this = this;
            _this.dateOption = select;
            $$agent.dayByDay({
                lastdays: parseInt(select.value)
            }, function (res) {
                _this.overData.click = res.data.click;
                _this.overData.clickRate = res.data.clickRate;
                _this.overData.cost = res.data.cost;
                _this.overData.expose = res.data.expose;
                _this.statis = res.data.dayByDayList;
            });
        },
        // Tab标签切换
        switchTab: function(tabIndex) {
            if (this.currentTab !== tabIndex) {
                this.currentTab = tabIndex;
            }
        },
        changeStatusSelect: function (statusValue) {
            this.statusSelect = parseFloat(statusValue.value);
        },
        // 展示子客或者直客图表数据
        showEchart: function () {
            var _this = this;

            // 作废API
            // $$customer.getStatisData({
            //     lastdays: 30
            // });
            // $$customer.on('getStatisData', function(data) {
            //     console.log(data);
            // });

            // 请求直客数据
            $$agent.dayByDay({
                lastdays: _this.dateOption
            }, function(res) {
                _this.overData.click = res.data.click;
                _this.overData.clickRate = res.data.clickRate;
                _this.overData.cost = res.data.cost;
                _this.overData.expose = res.data.expose;
                _this.statis = res.data.dayByDayList;
            });

            $$agent.getChildDetail({}, function (data) {
                _this.userInfo = data.data;
            });
        },
        // 导出数据
        exportExcel: function () {
            var _this = this;
            if (_this.currentTab == 1) {
                $$agent.exportData(function (data) {
                    if (data.code == 200) {
                        var url = data.data;
                        window.open(url);
                    }
                })
            } else if (_this.currentTab == 0) {
                $$agent.exportChildData(function (data) {
                    if (data.code == 200) {
                        _this.$message(data.msg, 1)
                    }
                })
            }
            
        },
        // 获取平台列表
        platformData: function (arr) {
            var tempArr = [];
            arr.forEach(function (value) {
                if (tempArr.indexOf(value.id) < 0) {
                    tempArr.push(value.id);
                }
            })
            this.platformSelected = tempArr;
        }
    },
    created: function() {
        this.userType = $$header.getCacheData().demander.data.userType === '1' ? 1 : 0;
    },
    beforeMount: function() {
        var _this = this;
        if (_this.userType === 1 && _this.viewState === 0) {
            $$agent.getAgentInfo({}, function (data) {
                _this.userInfo.availableBalance = data.data.availableBalance;  // 可用现金余额
                _this.userInfo.availableGrant = data.data.availableGrant;  // 可用赠款余额
                _this.userInfo.creditLine = data.data.creditLine;  // 信用额度
                _this.userInfo.todayCost = data.data.todayCost;  // 今日消耗
                _this.userInfo.totalBalance = data.data.totalBalance;  // 现金余额
                _this.userInfo.totalGrant = data.data.totalGrant;  // 赠款余额
                _this.agentTable = data.data.childStatusList  // 子客状态列表
            });
            
            // 选择投放平台数据
            adModel.getInitAdResourceSelect({}, function (res) {
                if (res.code === '200') {
                    _this.tableData = res.data.platForm.list;
                }
            });
        } else {
            // 展示chart图表（直客）
            _this.showEchart();
        }
    },
    mounted: function() {
        var _this = this;
        if (_this.userType !== 1 || _this.viewState !== 0) {
            setTimeout(function() {
                _this.$refs.chart.renderChart(_this.statis);
            }, 1000);
        };
    }
}
</script>
