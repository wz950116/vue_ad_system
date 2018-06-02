<template>
    <div class="settings-log-wrapper">
        <div class="settings-log-filter">
            <label class="log-filter-label" for="">操作时间</label>
            <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  placeholder="最近三个月">
            </el-date-picker>
        </div>
        <div class="settings-log-content">
            <h3 class="content-title">操作记录：</h3>
            <div class="table-w">
                <div class="filters-w">
                    <el-dropdown @command="operatorFilter" trigger="click">
                        <span class="el-dropdown-link" 
                            :class="searchParams.operatorId !== '' ? 'dropdown-active' : ''">
                            操作用户<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in operatorList" :command="item.id">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown @command="targetTypeFilter" trigger="click">
                        <span class="el-dropdown-link"
                            :class="searchParams.targetType !== '' ? 'dropdown-active' : ''">
                            操作类型<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in targetTypesList" :command="item.id">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown @command="operationActionTypeFilter" trigger="click">
                        <span class="el-dropdown-link"
                            :class="searchParams.operationActionType !== '' ? 'dropdown-active' : ''">
                            操作内容<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in operationActionTypesList" :command="item.id">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-table element-loading-text="数据加载中" v-loading="loading" :stripe="true" :data="tableData" border style="width: 100%">
                    <el-table-column
                    @current-change
                    prop="operatorName"
                    label=""
                    width="240"
                    :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                    prop="targetType" 
                    :show-overflow-tooltip="true"
                    label=""
                    width="120"></el-table-column>
                    <el-table-column 
                    prop="operationActionType"
                    :show-overflow-tooltip="true"
                    label=""
                    width="120"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" :formatter="dateTimeFormat" prop="time" label="操作时间" width="175"></el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="targetName" label="操作对象"></el-table-column>
                    <el-table-column label="操作详情">
                        <el-table-column :show-overflow-tooltip="true" prop="attributeName" label="变更项">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="beforeVal" label="变更前">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="afterVal" label="变更后">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagenation">
                <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="searchParams.pageIndex"
                      :page-size="searchParams.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style scoped src="./style.css"></style>
<style src="./element-style-patch.css"></style>
<script>
    var $$util = require('./util.js');
    var $$log_model = require('./log-model.js');
    var _ = require('../../lib/underscore.v1.8.3.js');
    module.exports = {
        data: function() {
            var now = new Date().valueOf();
            var form = now - 7776000000;
            now = $$util.dateFormat(new Date(now), 'yyyy-MM-dd');
            form = $$util.dateFormat(new Date(form), 'yyyy-MM-dd');
            return {
                loading: true,
                dateRange: '',
                total: 1000,
                searchParams: {
                    operatorId: '', // 操作用户id
                    targetType: '', // 操作类型id
                    operationActionType: '',
                    dateFrom: form,
                    dateTo: now,
                    // dateFrom: '2015-11-11',
                    // dateTo: '2017-11-18',
                    pageSize: 10,
                    pageIndex: 1
                },
                operatorList: [], // 操作用户列表
                targetTypesList: [], // 操作类型列表
                operationActionTypesList: [], // 操作类型列表
                tableData: [] // 表格list数据
            }
        },
        beforeMount: function () {
            var operatorList = [],
                targetTypesList = [],
                operationActionTypesList = [],
                _this = this;

            // 初始化三个筛选项
            $$log_model.getOperatorList(function (data) {
                if (data.code === '0') {
                    var addALLOption = function (arr) {
                        arr.unshift({name: '全部',id: ''});
                        return arr;
                    };
                    _this.operatorList = addALLOption(data.data.operatorIds);
                    _this.targetTypesList = addALLOption(data.data.targetTypes);
                    _this.operationActionTypesList = addALLOption(data.data.operationActionTypes);
                } else {

                }
            });
            _this.searchTable();
        },
        watch: {
            dateRange: function (val) {
                var startDate = new Date(val[0]), endDate = new Date(val[1]);
                this.searchParams.dateFrom = $$util.dateFormat(startDate, 'yyyy-MM-dd');
                this.searchParams.dateTo = $$util.dateFormat(endDate, 'yyyy-MM-dd');
            },
            'searchParams': {
                handler: function(newVal) {
                    this.searchTable();
                },
                deep: true
            }
        },
        methods: {
            searchTable: function () {
                var _this = this, params = {}, key;
                _this.loading = true;
                params = _.extend({}, _this.searchParams);
                for (key in params) {
                    if (params[key] === '') {
                        params[key] = null;
                    }
                };
                $$log_model.getTableList(params, function (data) {
                    if (data.code === '0') {
                        _this.tableData = data.data.operationHistory;
                        _this.total = parseInt(data.data.totalNum);
                    } else {

                    }
                    _this.loading = false;
                });
            },
            operatorFilter: function (val) {
                this.searchParams.operatorId = val === '' ? '' : parseInt(val);
            },
            targetTypeFilter: function (val) {
                this.searchParams.targetType = val === '' ? '' : parseInt(val);
            },
            operationActionTypeFilter: function (val) {
                this.searchParams.operationActionType = val === '' ? '' : parseInt(val);
            },
            handleSizeChange: function (size) {
                this.searchParams.pageSize = size;
                // this.searchTable();
            },
            handleCurrentChange: function (currentPage) {
                this.searchParams.pageIndex = currentPage;
                // this.searchTable();
            },
            dateTimeFormat: function (row) {
                var time = parseInt(row.time);
                return $$util.dateFormat(new Date(time), 'yyyy/MM/dd hh:mm:ss');
            },
            operatorChange: function (val, row, type) {
                return row.operatorName === val;
            },
            changeSelect: function (index, val) {
            }
        }
    };
</script>
