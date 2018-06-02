<template>
    <div class="finance-detail-finance">
        <!-- <input class="input-date" type="text" placeholder="请输入与日期"> -->
        <div class="date-arer global-clearfix">
            <el-date-picker v-model="dateRangeForList" type="daterange" format="yyyy-MM-dd" placeholder="选择日期范围" style="width: 220px; float: right;"></el-date-picker>
        </div>
        <table class="finance-table">
            <tr>
                <th>流水号</th>
                <th>日期</th>
                <th>存入(+)</th>
                <th>支出(-)</th>
                <th>现金账户余额</th>
                <th>现金账户可用余额</th>
                <th>赠款账户余额</th>
                <th>赠款账户可用余额</th>
                <th>备注</th>
            </tr>
            <tr v-for="item in detailList">
                <td><span class="number">{{item.serialNumber}}</span></td>
                <td><span class="number">{{item.date}}</span></td>
                <td>+￥<span class="number">{{item.in}}</span></td>
                <td>-￥<span class="number">{{item.out}}</span></td>
                <td>￥<span class="number">{{item.balance}}</span></td>
                <td>￥<span class="number">{{item.canUseBalance}}</span></td>
                <td>￥<span class="number">{{item.grant_balance}}</span></td>
                <td>￥<span class="number">{{item.canUseGrantBalance}}</span></td>
                <td>{{item.remarks}}</td>
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

.finance-detail-finance {
    padding: 20px 40px 40px 40px;
    background-color: #fafafa;
    font-size: 14px;
    color: #666666;
}

.input-date {
    float: right;
    margin-bottom: 20px;
}

.finance-table {
    width: 100%;
    border: solid 1px #d8d8d8;
    text-align: center;
    margin-top: 20px;
}

.finance-table tr {
    height: 40px;
}

.finance-table th {
    text-align: center;
    border-right: none;
    border-bottom: solid 1px #bbbbbb;
}

.finance-table tr td {
    border-right: solid 1px #eeeeee;
    border-bottom: solid 1px #d8d8d8;
}

.finance-table tr:nth-child(2n+1) {
    background-color: #f8f8f8;
}

.finance-table tr:nth-child(2n+0) {
    background-color: #fff;
}

.finance-table .number {
    font-family: "Arial";
}

.finance-table .suffix {
    color: #a6a6a6;
}

.date-arer {
    margin-bottom: 10px;
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
exports.data = function() {
    return {
        cid: "",
        detailList: [],
        dateRangeForList: [],
        datePick1: '',
        datePick2: '',
        pageInfo: {
            pageIndex: 1,
            pageSize: 10,
            totalNum: 100
        }
    }
};
exports.watch = {
    dateRangeForList: function(v) {
        var _this = this;
        if (_this.dateRangeForList[0] && _this.dateRangeForList[1]) {

            _this.datePick1 = '' + _this.dateRangeForList[0].getTime();
            _this.datePick2 = '' + _this.dateRangeForList[1].getTime();
        } else {
            _this.datePick1 = '';
            _this.datePick2 = '';
        }
        _this.getList();
    }
};
exports.methods = {
    wrapCid: function(data) {
        if (companyId !== '') {
            data.cid = companyId;
        }
        return data;
    },
    getList: function() {
        var _this = this;

        var subData = {
            pageIndex: _this.pageInfo.pageIndex,
            pageSize: _this.pageInfo.pageSize
        };
        if (_this.datePick1 !== '' && _this.datePick2 !== '') {
            subData.startAt = _this.datePick1;
            subData.endAt = _this.datePick2;
        }

        $$financeModel.getFinanceDetailList(_this.wrapCid(subData), function(res) {
            if (res.code === "200") {
                res.data = JSON.parse(res.data);
                _this.detailList = res.data.detailList;
                _this.pageInfo.pageIndex = parseInt(_this.pageInfo.pageIndex, 10);
                _this.pageInfo.pageSize = parseInt(_this.pageInfo.pageSize, 10);
                _this.pageInfo.totalNum = parseInt(res.data.totalNum, 10);
            }
        });
    },
    changePage: function(val) {
        this.pageInfo.pageIndex = val;
        this.getList();
    }
};
exports.created = function() {
    if (!!(this.$route.params.cid)) {
        companyId = this.$route.params.cid;
    } else {
        companyId = '';
    }
};
exports.beforeMount = function() {
    var _this = this;
    _this.getList();
};
</script>
