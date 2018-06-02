<template>
    <div class="selecter">
        <span 
            :class="['input', {active: status}]" 
            @click="toggle">
            {{ titleName }}
        </span>
        <div class="table-wrap" v-show="status" ref="wrap">
            <el-table
                ref="multipleTable"
                :data="tableData"
                @selection-change="handleSelectionChange"
                @select-all="selectAll"
                @select="select">

                <el-table-column
                    type="selection"
                    align="center">
                </el-table-column>
                <el-table-column
                    align="left"
                    inline-template
                    :label="label">
                    <span>{{row.name}}</span>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped>
    .selecter {
        position: relative;
        height: 38px;
        border: 1px #D5D5D5 solid;
        cursor: pointer;
        display: inline-block;
        width: 170px;
        font-size: 14px;
        vertical-align: top;
        background:#F6F6F6;
    }
    .selecter .input:after{
        content: '';
        display: block;
        position: absolute;
        right:0;
        top: 0;
        width:17px;
        height:38px;
        border-left: 1px solid #D5D5D5;
        background:#eee url('./images/arrow-down.png') no-repeat center center;
    }
    .selecter .input.active:after {
        background-image: url('./images/arrow-up.png');
    }

    .selecter .input {
        text-indent: 12px;
        height: 38px;
        width: 100%;
        cursor: pointer;
        position: absolute;
        line-height: 38px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .selecter.active .select-options {
        display: block;
    }

    .table-wrap {
        position: relative;
    }
</style>

<style>
    .selecter .table-wrap .el-table {
        width: 171px;
        max-width: 171px;
        margin-top: 38px;
    }

    .table-wrap .el-table td, .el-table th.is-leaf {
        border: 0;
    }

    .table-wrap .cell {
        background: #fff !important;
        padding-left: 0 !important;
    }

    .table-wrap .el-table th {
        background: #fff;
    }

    .table-wrap .table::before {
        display: none;
    }

    .table-wrap .el-table--enable-row-transition .el-table__body td {
        background-color: #fff !important;
    }

    .table-wrap .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #ff613e;
        border-color: #ff613e;
    }

    .table-wrap .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #ff613e;
    }

    .table-wrap .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #ff613e;
    }

    .table-wrap .el-checkbox__inner:hover {
        border-color: #ff613e;
    }

    .table-wrap .el-checkbox__inner {
        width: 17px;
        height: 17px;
        border-radius: 0;
    }
</style>

<script>
    module.exports = {
        data: function () {
            return {
                multipleSelection: [],
                status: false
            }
        },

        props: {
            tableData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            titleName: {
                type: String,
                default: function () {
                    return ''
                }
            },
            label: {
                type: String,
                default: function () {
                    return ''
                }
            }
        },

        methods: {
            toggleSelection: function (rows) {
                if (rows) {
                    rows.forEach(function (row) {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },

            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },

            selectAll: function (value) {
                this.$emit("platformArr", value);
            },

            select: function (value) {
                this.$emit("platformArr", value);
            },

            toggle: function () {
                this.status = !this.status;
            }
        },

        mounted: function () {
            var _this = this;
            document.addEventListener('click', function (e) {
                if (!_this.$el.contains(e.target)) _this.status = false;
            });
        }
    }
</script>