<template>
    <div class="index-table">
        <div class="index-table-wrapper">
            <!-- 子客数据概览 -->
            <div v-show='listType === 0'>
                <div class="table-header">
                    <div class="column company">
                        <span class="coulum-text">子客名称</span>
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
                    <div class="column consume">
                        <span class="coulum-text">消耗</span>
                    </div>
                </div>

                <div class="table-column" v-for="(item, index) in agentTable" v-if="agentTable.length > 0">
                    <div class="column company">
                        <span @click="checkChildDetails(item)" class="link-style">
                            {{item.demanderName}}
                        </span>
                    </div>
                    <div class="column exposure">
                        {{item.expose}}
                    </div>
                    <div class="column click">
                        {{item.click}}
                    </div>
                    <div class="column click-rate">
                        {{item.clickRate}}
                    </div>
                    <div class="column consume">
                        {{item.cost | moneyFormat}}
                    </div>
                </div>
                <div class="table-column-none" v-if="agentTable.length == 0">暂无数据</div>
                
                <!-- 分页 -->
                <div class="pagination" v-if="agentTable.length > 0">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalNum">
                    </el-pagination>
                </div>
            </div>

            <!-- 待上传创意单元 -->
            <div v-show='listType === 1'>
                <div class="table-header" v-show='listType === 1'>
                    <div class="column order-name">
                        <span class="coulum-text">广告单元名称</span>
                    </div>
                    <div class="column plan-name">
                        <span class="coulum-text">所属子客</span>
                    </div>
                    <div class="column date-diff">
                        <span class="coulum-text">距离投放天数</span>
                    </div>
                </div>

                <div class="table-column" v-if="uploadData.length > 0" v-for="(item, index) in uploadData">
                    <div class="column order-name">
                        <span @click="checkOrderDetails(item)" class="link-style">
                            {{item.order_name}}
                        </span>
                    </div>
                    <div class="column plan-name">
                        <span @click="checkOrderDetails(item)" class="link-style">
                            {{item.demander_name}}
                        </span>
                    </div>
                    <div class="column date-diff">
                        {{item.start_date_diff}}
                    </div>
                </div>
                <div class="table-column" v-if="uploadData.length == 0"></div>

                <!-- 分页 -->
                <div class="pagination" v-if="uploadData.length > 0">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalNum">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .index-table .table-title {
        font-size: 14px;
        font-family: microsoft yahei;
        color: #4A4A4A;
        height: 30px;
        line-height: 30px;
    }
    .index-table-wrapper {
        width: 100%;
        border: 1px solid #D8D8D8;
        margin: 8px 0 0 0;
    }
    .index-table-wrapper .table-header {
        height: 41px;
        line-height: 41px;
        background-color: #F8F8F8;
        font-size: 0;
    }
    .index-table-wrapper .table-header .column {
        text-align: center;
        font-size: 12px;
        font-family: 'microsoft yahei';
        font-weight: 500;
        color: #333333;
        display: inline-block;
        border-bottom: 1px solid #BBBBBB;
    }
    .index-table-wrapper .column.company {
        width: 20.5%;
    }
    /*.index-table-wrapper .column.consume-daily {
        width: 16.7%;
    }*/
    .index-table-wrapper .column.exposure {
        width: 20%;
    }
    .index-table-wrapper .column.click {
        width: 20.5%;
    }
    .index-table-wrapper .column.click-rate {
        width: 19.5%;
    }
    .index-table-wrapper .column.consume {
        width: 19.5%;
    }
    .index-table-wrapper .column.order-name {
        width: 33.3%;
    }
    .index-table-wrapper .column.plan-name {
        width: 33.3%;
    }
    .index-table-wrapper .column.date-diff {
        width: 33.4%;
    }
    .index-table-wrapper .table-column {
        height: 40px;
        line-height: 40px;
        width: 100%;
        font-size: 0;
    }
    .index-table-wrapper .table-column-none {
        height: 40px;
        line-height: 40px;
        width: 100%;
        text-align: center;
        font-size: 16px;
    }
    .index-table-wrapper .table-column:nth-child(2n + 1) {
        background-color: #F8F8F8;
    }
    .index-table-wrapper .table-column:hover {
        background-color: #FAF3E1;
    }
    .index-table-wrapper .table-column .column {
        display: inline-block;
        padding: 0 10px;
        text-align: center;
        border-right: 1px solid #D8D8D8;
        border-bottom: 1px solid #bbb;
        font-size: 12px;
        font-family: 'microsoft yahei';
        color: #666666;
        box-sizing: border-box;
    }
    .index-table-wrapper .table-column .column:last-child {
        border-right: none;
    }
    .index-table-wrapper .table-column .column.company {
        text-align: center;
    }
    .index-table-wrapper .table-column .column.company a {
        color: #4990E2;
        text-decoration: underline;
    }
    .link-style {
        color: #4A90E2;
        text-decoration: underline;
        cursor: pointer;
    }
</style>

<style>
    .pagination .el-pager li {
        margin-left: 0;
        margin-bottom: 16px;
    }
</style>

<script>
    var $$agent = require('../../script/data/model/agent.js');
    module.exports = {
        props: {
            listType: {
                type: Number,
                default: 0
            },
            dateSelect: {
                type: Number,
                default: 30
            },
            platform: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data: function () {
            return {
                currentPage: 1,
                pageSize: 10,
                totalNum: 0,
                agentTable: [],
                uploadData: [],
                pageNum: 1,
                platformList: [0, 1, 2, 3, 4, 5]
            }
        },
        filters: {
            moneyFormat: function (money) {
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
        watch: {
            // Tab发生变化
            listType: function () {
                this.currentPage = 1;
                this.handleCurrentChange(1);
            },
            // 日期Select发生变化
            dateSelect: function (date) {
                this.handleCurrentChange(1);
            },
            // 平台Select变化
            platform: function (arr) {
                var that = this;
                that.platformList = arr;
                that.handleCurrentChange(that.pageNum);
            }
        },
        methods: {
            checkOrderDetails: function (item) {
                this.$router.push({
                    name: 'agent_prom_unit',
                    params: {
                        cid: item.demander_id,
                        pid: item.plan_id,
                        uid: item.order_id
                    }
                })
            },
            checkChildDetails: function (item) {
                this.$router.push({
                    name: 'agent_prom_all',
                    params: {
                        cid: item.demanderId
                    }
                })
            },

            // 分页请求
            handleCurrentChange: function (val) {
                this.currentPage = val;
                this.sendSizeRequest(val);
            },
            sendSizeRequest: function (num) {
                var that = this, dateSelect = that.dateSelect;
                that.pageNum = num;
                // 请求子客数据概览
                if (that.platformList.length > 0) {
                    if (that.listType === 0) {
                        var params = {
                            limit: 10,
                            pageIndex: num,
                            lastdays: dateSelect,
                            platformList: that.platformList
                        }
                        $$agent.getChildInfo(params, function (res) {
                            if (res.code == 200) {
                                that.totalNum = Number(res.data.totalNum);
                                that.agentTable = res.data.childInfoList;
                            }
                        })
                    // 请求待上传创意单元
                    } else if (that.listType === 1) {
                        var params = {
                            limit: 10,
                            pageIndex: num,
                        }
                        $$agent.getOrderIdeasToUpload(params, function (res) {
                            that.totalNum = Number(res.data.count);
                            that.uploadData = res.data.list;
                        })
                    }
                } else {
                    that.agentTable = [];
                }
            },
        },
        beforeMount: function () {
            var that = this;
            that.handleCurrentChange(1);
            // $$agent.on('getSubCustomerList', function (data) {
            //     if (data.code === 200 || data.code === '200') {
            //         var arr = [];
            //         data.data.list.forEach(function (item, index) {
            //             arr.push({
            //                 id: item.id,
            //                 company: item.name,
            //                 account: item.account_left,
            //                 consumeDaily: item.today_cost,
            //                 exposure: item.expose_count,
            //                 click: item.click_count,
            //                 clickRate: item.click_rate,
            //                 consume: item.total_cost,
            //                 status: item.status
            //             });
            //         });
            //         that.tableData = arr;
            //     }
            // });
        }
    }
</script>
