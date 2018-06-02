/** author:夏爽 email:shuangxia210688@sohu-inc.com **/
<template>
    <div class="invoice-table">
        <div class="invoice-tlt global-clearfix">
            <span class="invoice-tlt-line">|</span>
            <span>发票记录</span>
            <el-date-picker v-model="dateRangeForList" type="daterange" format="yyyy-MM-dd" placeholder="选择日期范围" style="width: 220px; float: right;"></el-date-picker>
        </div>
        <table>
            <thead>
                <tr>
                    <th>发票流水号</th>
                    <th class="invoice-time" v-on:click="timeSort">开票时间
                        <div class="sort-icon">
                            <span v-if="order" class="sort-icon-up"></span>
                            <span v-else class="sort-icon-up sort-icon-up-active"></span>
                            <span v-if="order" class="sort-icon-down sort-icon-down-active"></span>
                            <span v-else class="sort-icon-down"></span>
                        </div>
                    </th>
                    <th>发票金额</th>
                    <th>开票类型</th>
                    <th>
                        <div class="invoice-status-wrap" v-on:click="showStatus">
                            <div v-if="showStatusList" class="invoice-status-show">
                                <span>开票状态</span>
                                <span class="invoice-status-icon">
                                    <i class="invoice-status-icon-1"></i>
                                    <i class="invoice-status-icon-2"></i>
                                </span>
                            </div>
                            <div v-else>
                                <span>开票状态</span>
                                <span class="invoice-status-icon">
                                    <i class="invoice-status-icon-3"></i>
                                    <i class="invoice-status-icon-4"></i>
                                </span>
                            </div>
                            <ul v-if="showStatusList" class="invoice-status-list">
                                <li class="invoice-status-item" @click="changeOpenState(0)">审核中</li>
                                <li class="invoice-status-item" @click="changeOpenState(1)">已开票</li>
                                <li class="invoice-status-item" @click="changeOpenState(2)">已拒绝</li>
                                <!-- <li class="invoice-status-item" @click="changeOpenState(3)">取消开票</li> -->
                            </ul>
                        </div>
                    </th>
                    <th>开票公司</th>
                    <th>开票账号</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tr v-for="item in invoiceList">
                <td>{{item.invoice}}</td>
                <td>{{item.insert_time}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.type==='0'?'增值税普通发票':'增值税专用发票'}}</td>
                <td>{{getStatus[item.status]}}</td>
                <td>{{item.title}}</td>
                <td>{{item.contract_code}}</td>
                <td>{{item.supplier_name}}</td>
            </tr>
        </table>
        <div class="page-area global-clearfix">
            <el-pagination @current-change="changePage" :current-page="pageInfo.pageIndex" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="pageInfo.totalNum">
            </el-pagination>
        </div>
    </div>
</template>
<style scoped>
.el-pager {
    display: inline;
}

.invoice-table {
    margin-top: 35px;
}

.invoice-tlt {
    font-size: 16px;
    color: #333;
}

.invoice-tlt-line {
    font-size: 14px;
    font-weight: bold;
    color: #e43;
    margin-right: 3px;
    vertical-align: 2px;
}

table {
    width: 100%;
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 20px;
}

thead {
    border: solid 1px #d8d8d8;
    border-bottom: solid 1px #bbb;
    background: #f8f8f8;
}

th {
    height: 42px;
    text-align: center;
}

td {
    height: 40px;
    border: solid 1px #d8d8d8;
}

tr:nth-child(odd) {
    background: #f8f8f8;
}

.sort-icon {
    position: relative;
    width: 12px;
    height: 11px;
    display: inline-block;
    vertical-align: -1px;
}

.sort-icon-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 4px solid #999;
    position: absolute;
    top: 0;
}

.sort-icon-up-active {
    border-bottom: 4px solid #4a90e2;
}

.sort-icon-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 4px solid #999;
    position: absolute;
    bottom: 0;
}

.sort-icon-down-active {
    border-top: 4px solid #4a90e2;
}

.invoice-time {
    cursor: pointer;
}

.invoice-status-wrap {
    position: relative;
    width: 93px;
    height: 42px;
    line-height: 42px;
    margin: 0 auto;
    cursor: pointer;
}

.invoice-status-show {
    border-right: solid 1px #d5d5d5;
    border-left: solid 1px #d5d5d5;
    background: #fff;
}

.invoice-status-list {
    width: 91px;
    position: absolute;
    border: solid 1px #d5d5d5;
    border-top: none;
    text-align: left;
    background: #fff;
}

.invoice-status-item {
    width: 79px;
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    cursor: pointer;
}

.invoice-status-item:hover {
    background: #f6f6f6;
}

.invoice-status-icon {
    position: relative;
    width: 10px;
    height: 7px;
    display: inline-block;
    margin-left: 3px;
    vertical-align: -1px;
}

.invoice-status-icon-1 {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 4px solid #999;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}

.invoice-status-icon-2 {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 4px solid #fff;
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 10;
}

.invoice-status-icon-3 {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 4px solid #999;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}

.invoice-status-icon-4 {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 4px solid #fff;
    position: absolute;
    top: -1px;
    left: 0;
    z-index: 10;
}

.page-area {
    margin-top: 20px;
}

.page-area .el-pagination {
    background: none;
}
</style>
<script>
var $$financeModel = require('../../script/data/model/finance.js');
var _ = require('../../lib/underscore.v1.8.3.js');
var companyId = "";
module.exports = {
    data: function() {
        return {
            getStatus: {
                0: '审核中',
                1: '已开票',
                2: '已拒绝'
                // 3: '取消开票'
            },
            invoiceList: [],
            order: true,
            showStatusList: false,
            tableOpenInvoiceState: 'all',
            dateRangeForList: [],
            datePick1: '',
            datePick2: '',
            pageInfo: {
                pageIndex: 1,
                pageSize: 5,
                totalNum: 100
            }
        }
    },
    watch: {
        dateRangeForList: function(v) {
            var self = this;
            if (self.dateRangeForList[0] && self.dateRangeForList[1]) {

                self.datePick1 = '' + self.dateRangeForList[0].getTime();
                self.datePick2 = '' + self.dateRangeForList[1].getTime();
            } else {
                self.datePick1 = '';
                self.datePick2 = '';
            }
            var subData = {
                pageIndex: self.pageInfo.pageIndex,
                pageSize: self.pageInfo.pageSize
            };
            if (self.datePick1 !== '' && self.datePick2 !== '') {
                subData.startAt = self.datePick1;
                subData.endAt = self.datePick2;
            }
            self.getList(subData);
        }
    },
    beforeMount: function() {
        var self = this;
        self.getList({
            pageIndex: self.pageInfo.pageIndex,
            pageSize: self.pageInfo.pageSize
        });
        $$financeModel.on('setInvoiceInfo', function(res) {
            if (res.code == "200") {
                //刷新发票记录
                self.getList({
                    pageIndex: self.pageInfo.pageIndex,
                    pageSize: self.pageInfo.pageSize
                });
                self.dateRangeForList = [];
            }
        });
    },
    created: function() {
        if (!!(this.$route.params.cid)) {
            companyId = this.$route.params.cid;
        } else {
            companyId = '';
        }
    },
    methods: {
        timeSort: function() {
            var _this = this;
            var orderRule = 1;
            if (this.order) {
                this.order = false;
                orderRule = 1;
            } else {
                this.order = true;
                orderRule = -1;
            }
            _this.invoiceList = _.sortBy(_this.invoiceList, function(item) {
                var timeStamp = Date.parse(new Date(item.insert_time));
                return timeStamp * orderRule;
            });
        },
        showStatus: function() {
            if (this.showStatusList) {
                this.showStatusList = false;
            } else {
                this.showStatusList = true;
            }
        },
        wrapCid: function(data) {
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        },
        changeOpenState: function(newState) {
            var self = this;
            self.tableOpenInvoiceState = "" + newState;
            var subData = {
                pageIndex: self.pageInfo.pageIndex,
                pageSize: self.pageInfo.pageSize,
                status: self.tableOpenInvoiceState
            };
            if (self.datePick1 !== '' && self.datePick2 !== '') {
                subData.startAt = self.datePick1;
                subData.endAt = self.datePick2;
            }
            self.getList(subData);
        },
        getList: function(subData) {
            var self = this;
            self.order = true;
            $$financeModel.getFananceInvoiceList(self.wrapCid(subData), function(res) {
                if (res.code !== '200') {
                    return;
                }
                res.data = JSON.parse(res.data);
                self.invoiceList = res.data.invoiceList;
                self.pageInfo.pageIndex = parseInt(self.pageInfo.pageIndex, 10);
                self.pageInfo.pageSize = parseInt(self.pageInfo.pageSize, 10);
                self.pageInfo.totalNum = parseInt(res.data.totalNum, 10);
            });
        },
        changePage: function(val) {
            var self = this;
            this.pageInfo.pageIndex = val;
            var subData = {
                pageIndex: self.pageInfo.pageIndex,
                pageSize: self.pageInfo.pageSize,
                status: self.tableOpenInvoiceState
            };
            if (self.datePick1 !== '' && self.datePick2 !== '') {
                subData.datePick1 = self.datePick1;
                subData.datePick2 = self.datePick2;
            }
            this.getList(subData);
        }
    }
}
</script>
