<template>
    <div class="promotion-plan-table">
        <div class="menu-line">
            <a href="javascript:;" class="menu-line-new left" @click="showPromotionCreate = true"><span>+</span>新建计划</a>
            <!-- <a href="javascript:;" class="menu-line-normal right">详细报表</a> -->
            <a href="javascript:;" class="menu-line-normal right" v-on:click="downLoad()">下载列表</a>
        </div>
        <div class="filter-line">
            <div class="filter-exam left">
                <span class="label">计划状态</span>
                <status-select v-on:change="changeStatusSelect(arguments[0])" :defaultIndex="0" :options="statusOptions"
                               class="status-select"/>
            </div>
            <div class="filter-search left">
                <input type="text" class="keyword-input" v-model="keyword" placeholder="输入计划名称或计划ID"/>
                <span class="search-icon" v-on:click="sendKeyword()"></span>
            </div>
            <div class="filter-time right">
                <el-date-picker v-model="dateRangeForView" type="daterange" format="yyyy/MM/dd" placeholder="选择日期范围"
                                style="width: 220px"></el-date-picker>
            </div>
        </div>
        <div class="plan-table-wrapper" v-show="isEmptyData">
            <div class="table-header">
                <div class="column check-box">
                    <!-- <span class="icon" v-on:click="choose('all')" v-if="!allCheck"></span>
                    <span class="icon select" v-on:click="choose('all')" v-else></span>  -->
                </div>
                <div class="column plan-name">
                    <span class="coulum-text">计划名称</span>
                </div>
                <div class="column plan-id">
                    <span class="coulum-text">计划ID</span>
                </div>
                <div class="column plan-status">
                    <span class="coulum-text">计划状态</span>
                </div>
                <div class="column budget">
                    <span class="coulum-text">预算</span>
                </div>
                <div class="column exposure">
                    <span class="coulum-text">曝光量</span>
                </div>
                <div class="column click">
                    <span class="coulum-text">点击量</span>
                </div>
                <div class="column click-rate">
                    <span class="coulum-text">点击率</span>
                </div>
                <div class="column used-budget">
                    <span class="coulum-text">已用预算</span>
                </div>
                <div class="column consume">
                    <span class="coulum-text">花费</span>
                </div>
            </div>
            <div v-bind:class="['table-column', {'block': true}]" v-for="(item, index) in tableData">
                <div class="column check-box">
                    <span v-bind:class="['icon', {select: item.checkStatus}]" v-on:click="choose(item.id)"></span>
                </div>
                <div class="column plan-name">
                    <router-link v-if="item.id" :to="item.href" :title="item.planName">{{item.planName}}</router-link>
                    <span :title="item.planName" v-else>{{item.planName}}</span>
                </div>
                <div class="column plan-id">
                    {{item.planId}}
                </div>
                <div class="column plan-status">
                    {{item.planStatus}}
                </div>
                <div class="column budget">
                    {{item.budget | moneyFormat}}
                </div>
                <div class="column exposure">
                    {{item.exposure == -1 ? '无' : item.exposure}}
                </div>
                <div class="column click">
                    {{item.click == -1 ? '无' : item.click}}
                </div>
                <div class="column click-rate">
                    {{item.clickRate}}%
                </div>
                <div class="column used-budget">

                    {{item.usedBudget | moneyFormat}}
                </div>
                <div class="column consume">
                    {{item.consume | moneyFormat}}
                </div>
            </div>
        </div>
        <div class="block" v-show="isEmptyData">
            <el-pagination
                    @current-change="changePage"
                    :current-page="pageInfo.pageIndex"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="pageInfo.itemCount">
            </el-pagination>
        </div>
        <div class="layer" v-show="showPromotionCreate">
            <plan-create :data="planInfo" v-on:submit="createPlan(arguments[0])"
                         v-on:close="showPromotionCreate = false"/>
            <div class="layer-bg"></div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"/>
    </div>
</template>
<style scoped>
    .right {
        float: right;
    }

    .left {
        float: left;
    }

    .filter-line {
        margin-top: 20px;
    }

    .filter-line input {
        font-size: 14px;
        border: 1px #d5d5d5 solid;
        display: inline-block;
        box-sizing: border-box;
        height: 40px;
        min-width: 100px;
        outline: none;
    }

    .filter-line .filter-search {
        font-size: 0;
    }

    .filter-line .keyword-input {
        min-width: 210px;
        font-size: 14px;
        padding: 0 40px 0 10px;
        background-color: #F6F6F6;
        /*background-repeat: no-repeat;
        background-position: right 6px center;
        background-image: url('./images/search.png');*/
    }

    .filter-line .search-icon {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin: 0 0 0 -32px;
        vertical-align: -8px;
        cursor: pointer;
        background-image: url('./images/search.png');
    }

    .filter-time .splitter {
        margin: 0 4px;
    }

    .label {
        font-size: 14px;
        line-height: 40px;
        margin-right: 15px;
    }

    .promotion-plan-table {
        padding: 0 40px;
        min-height: 320px;
    }

    .menu-line, .filter-line {
        height: 40px;
    }

    .menu-line .left,
    .filter-line .left {
        margin-right: 34px;
    }

    .menu-line .right,
    .filter-line .right {
        margin-left: 20px;
    }

    .menu-line a {
        width: 100px;
        height: 40px;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        background-color: #f6f6f6;
        border: 1px #d5d5d5 solid;
        border-radius: 2px;
        color: #000;
        box-sizing: border-box;
    }

    .menu-line-new span {
        color: #e43;
        font-size: 16px;
        margin-right: 4px;
    }

    .plan-table {
    }

    .plan-table .table-title {
        font-size: 14px;
        font-family: microsoft yahei;
        color: #4A4A4A;
        height: 30px;
        line-height: 30px;
    }

    .plan-table-wrapper {
        width: 100%;
        border: 1px solid #D8D8D8;
        margin: 20px 0 0 0;
    }

    .plan-table-wrapper .table-header {
        height: 42px;
        line-height: 42px;
        background-color: #F8F8F8;
        font-size: 0;
        border-bottom: 1px solid #BBBBBB;
    }

    .plan-table-wrapper .table-header .column {
        text-align: center;
        font-size: 12px;
        font-family: 'microsoft yahei';
        font-weight: 500;
        color: #333333;
        display: inline-block;
        box-sizing: border-box;
    }

    .plan-table-wrapper .column.check-box {
        width: 5%;
    }

    .plan-table-wrapper .column.plan-name {
        width: 15%;
    }

    .plan-table-wrapper .column.plan-name a {
        color: #4990E2;
        text-decoration: underline;
    }

    .plan-table-wrapper .column.plan-id {
        width: 10%;
    }

    .plan-table-wrapper .column.plan-status {
        width: 10%;
    }

    .plan-table-wrapper .column.budget {
        width: 10%;
    }

    .plan-table-wrapper .column.exposure {
        width: 10%;
    }

    .plan-table-wrapper .column.click {
        width: 10%;
    }

    .plan-table-wrapper .column.click-rate {
        width: 10%;
    }

    .plan-table-wrapper .column.used-budget {
        width: 10%;
    }

    .plan-table-wrapper .column.consume {
        width: 10%;
    }

    .plan-table-wrapper .check-box .icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-color: #fff;
        cursor: pointer;
        vertical-align: middle;
        background: url('./images/icon.png');
        background-size: 15px 15px;
    }

    .plan-table-wrapper .check-box .icon.select {
        background: url('./images/icon-select.png');
        background-size: 15px 15px;
    }

    .plan-table-wrapper .table-header .column .text {
    }

    .plan-table-wrapper .table-column {
        height: 41px;
        line-height: 41px;
        width: 100%;
        font-size: 0;
    }

    .plan-table-wrapper .table-column:nth-child(2n + 1) {
        background-color: #F8F8F8;
    }

    .plan-table-wrapper .table-column:hover {
        background-color: #FAF3E1;
    }

    .plan-table-wrapper .table-column .column {
        height: 100%;
        overflow: hidden;
        display: inline-block;
        padding: 0 10px;
        text-align: center;
        border-bottom: 1px solid #D8D8D8;
        font-size: 12px;
        font-family: 'microsoft yahei';
        color: #666666;
        box-sizing: border-box;
    }

    .plan-table-wrapper .table-column .column.plan-name {
        text-align: left;
    }

    .plan-table-wrapper .table-column.block .column {
        border-right: 1px solid #EEEEEE;
    }

    .plan-table-wrapper .table-column.block .column:last-child {
        border-right: none;
    }

    .plan-table-wrapper .table-column.block:last-child .column {
        border-bottom: none;
    }

    .status-select {
        width: 167px;
    }
</style>
<script>
    var selecter = require('../selecter/selecter');
    var planCreate = require('../promotion-plan-create/promotion-plan-create');
    var $$customer = require('../../script/data/model/customer.js');
    var alert = require('../alert/alert');
    module.exports = {
        props: {
            isBlock: [Boolean],
            from: String
        },
        components: {
            'status-select': selecter,
            'alert': alert,
            'plan-create': planCreate
        },
        data: function () {
            return {
                isEmptyData: true,
                showPromotionCreate: false,
                dateRange: '',
                dateRangeForView: '',
                dateFormat: 'YYYY-MM-DD',
                statusOptions: [
                    {
                        value: '0',
                        text: '全部（不包含已删除）'//必传
                    },
                    {
                        value: '1',
                        text: '历史（包含已删除）'
                    },
                    {
                        value: '2',
                        text: '启用中'
                    },
                    {
                        value: '3',
                        text: '暂停中'
                    },
                    {
                        value: '5',
                        text: '空计划'
                    },
                    {
                        value: '4',
                        text: '已删除'
                    }
                ],
                pageInfo: {
                    itemCount: 20,
                    pageIndex: 1,
                    pageSize: 10
                },
                statusSelect: 0,
                tableData: [],
                total: {},
                keyword: '',
                alert: {
                    show: false,
                    message: '信息提交成功',
                    status: 0
                },
                allCheck: false,
                createAdPlanFlag: false
            }
        },
        watch: {
            '$route': function (to, from) {
                if (to.name && to.name.endsWith(this.from))
                    this.getQuery();
            },
            dateRangeForView: function (val) {
                if (Object.prototype.toString.call(val) === '[object Array]') {
                    if (val.length === 0) {
                        this.dateRange = ' - ';
                    } else {
                        this.dateRange = this._dateTimeFormatter(val[0], this.dateFormat) + ' - ' +
                            this._dateTimeFormatter(val[1], this.dateFormat);
                    }
                }
                this.sendParams();
            }
        },
        filters: {
            moneyFormat: function (money) {
                if (money == -1) {
                    return "预算不限"
                }
                if (typeof money === 'number') money = money.toString();
                if (/[^0-9\.]/.test(money)) return '￥0.00';
                money = money.replace(/^(\d*)$/, "$1.");
                money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                money = money.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(money)) {
                    money = money.replace(re, "$1,$2");
                }
                money = money.replace(/,(\d\d)$/, ".$1");
                return '￥' + money.replace(/^\./, "0.");
            }
        },
        methods: {
            createPlan: function (infoData) {
                var _this = this;
                if (_this.createAdPlanFlag) {
                    return;
                }
                _this.createAdPlanFlag = true;
                $$customer.createAdPlan(infoData, function (res) {
                    if (res.code == 200) {
                        _this.openAlert("添加成功!", 0);
                        _this.showPromotionCreate = false;
                        $$customer.getAdPlanList();
                    } else {
                        _this.openAlert(res.msg, 1);
                    }
                    _this.createAdPlanFlag = false;
                });
            },
            openAlert: function (title, type) {
                var _this = this;
                _this.alert.status = type;
                _this.alert.message = title;
                _this.alert.show = true;

                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 2000);
            },
            _dateTimeFormatter: function (dt, format) {
                if (!dt) {
                    return '';
                }
                return format.replace(/([a-z]+)/ig, function (a, b, c, d) {
                    if (/Y{2,}/.test(b)) {
                        return b.length === 4 ? dt.getFullYear() : ('' + dt.getFullYear()).substr(2);
                    } else if (/M{2}/.test(b)) {
                        return (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
                    } else if (/D{2}/.test(b)) {
                        return (dt.getDate()) < 10 ? '0' + dt.getDate() : dt.getDate();
                    } else if (/h{2}/.test(b)) {
                        return dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
                    } else if (/m{2}/.test(b)) {
                        return dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
                    } else if (/s{2}/.test(b)) {
                        return dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
                    } else {
                        return 0;
                    }
                });
            },
            sendParams: function () {
                this.getQuery();
            },
            changeStatusSelect: function (statusValue) {
                this.statusSelect = parseFloat(statusValue.value);
                this.getQuery();
            },
            sendKeyword: function () {
                this.getQuery();
            },
            choose: function (id) {
                var that = this;
                if (id === "总计") {
                    that.tableData.forEach(function (item, index) {
                        if (!that.allCheck) {
                            item.checkStatus = true;
                        } else {
                            item.checkStatus = false;
                        }
                    });
                    that.allCheck = !that.allCheck;
                    return;
                } else {
                    that.allCheck = true;
                    that.tableData.forEach(function (item, index) {
                        if (id === item.id) {
                            item.checkStatus = !item.checkStatus;
                        }
                        if (item.id != "总计") {
                            if (item.checkStatus) {
                                that.allCheck = that.allCheck && true;
                            } else {
                                that.allCheck = that.allCheck && false;
                            }
                        }
                    });
                    that.tableData[0].checkStatus = that.allCheck;
                }
            },
            filtersEmpty: function (data) {
                for (var key in data) {
                    if (data[key] === "" || data[key] === null || data[key] === undefined) {
                        delete data[key];
                    }
                }
                return data;
            },
            getQuery: function () {
                var that = this;
                var days = that.dateRange.toString().split(' ');
                var querys = {
                    status: that.statusSelect || 0,
                    keyword: that.keyword || '',
                    start_date: days[0] || '',
                    end_date: days[2] || '',
                    page_index: that.pageInfo.pageIndex || 1,
                    page_size: that.pageInfo.pageSize || 10
                };
                querys = this.filtersEmpty(querys);
                $$customer.searchAdPlans(querys);
            },
            downLoad: function () {
                var arr = [];
                var that = this;
                if (this.allCheck) {
                    arr.push(parseInt(0));
                } else {
                    this.tableData.forEach(function (item, index) {
                        if (item.id !== "总计") {
                            if (item.checkStatus && item.id) {
                                arr.push(parseInt(item.id));
                            }
                        }
                    });
                }
                $$customer.on("exportPlanList", function (res) {
                    if (res.code === "200") {
                        window.location.href = res.data;
                    } else {
                        that.openAlert(res.msg, 1);
                    }
                });
                $$customer.exportPlanList({list: arr});
            },
            changePage: function (val) {
                this.pageInfo.pageIndex = val;
                this.getQuery();
            },
            getUrlOf: function (type, id, id2) {
                var ifAgent = !!this.$route.params.cid;
                var routeNamePrefix = ifAgent ? 'agent_prom_' : 'cust_prom_';
                var route = {
                    name: '',
                    params: {}
                };
                if (ifAgent) {
                    route.params.cid = this.$route.params.cid;
                }
                switch (type) {
                    case 'plan':
                        route.name = routeNamePrefix + 'plan';
                        route.params.pid = id;
                        return route;
                    case 'unit':
                        route.name = routeNamePrefix + 'unit';
                        route.params.pid = id2;
                        route.params.uid = id;
                        return route;
                }
                route.name = routeNamePrefix + 'all';
                return route;
            }
        },
        beforeMount: function () {
            var that = this;
            $$customer.on('searchAdPlans', function (data) {
                if (data.code === 200 || data.code === '200') {
                    var arr = [];
                    if (data.data == undefined || data.data == null || data.data.length <= 0) {
                        that.isEmptyData = false;
                        return;
                    }
                    that.isEmptyData = true;
                    if (data.data.total) {
                        var total = {
                            id: '总计',
                            checkStatus: false,
                            planName: '总计',
                            href: '',
                            planId: '',
                            planStatus: '',
                            budget: data.data.total.budget,
                            exposure: data.data.total.exposure_count,
                            click: data.data.total.click_count,
                            clickRate: data.data.total.click_rate,
                            usedBudget: data.data.total.budget_cost,
                            consume: data.data.total.cost
                        };
                        that.total = total;
                        arr.push(total);
                    }
                    that.pageInfo.itemCount = parseInt(data.data.total.count, 10);
                    data.data.list.forEach(function (item, index) {
                        arr.push({
                            id: item.id,
                            checkStatus: false,
                            planName: item.name,
                            href: that.getUrlOf('plan', item.id),
                            planId: item.id,
                            planStatus: item.status_text,
                            budget: item.budget,
                            exposure: item.exposure_count,
                            click: item.click_count,
                            clickRate: item.click_rate,
                            usedBudget: item.budget_cost,
                            consume: item.cost
                        });
                    });
                    that.tableData = arr;
                    that.allCheck = false;
                } else {
                    that.openAlert(data.msg, 1);
                }
            });
            that.getQuery();
        }
    }
</script>
