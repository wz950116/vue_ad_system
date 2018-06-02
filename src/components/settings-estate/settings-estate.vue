<template>
    <div class="estate-wrap">
        <div class="estate-title">
            <span class="title-text">添加楼盘</span>
        </div>
        <div class="estate-content">
            <span class="add-estate" @click="addEstate"><em class="mark-add">+</em>添加楼盘</span>
            <div class="table-title"><span class="estate-name">楼盘名称</span><span class="check-status">审核状态</span><span
                    class="handle">操作</span></div>
            <div class="h-44 table-content" v-for="item in estateList">
                <a :href="item.loupanLink" class="estate-name-text">{{item.resourceName}}</a><span
                    class="check-status-text"
                    v-bind:class="classObject(item.auditStateCode)">{{item.auditStateTxt}}</span>
                <div class="handle-upload-wrap"><span class="handle-upload" v-if="item.auditStateTxt === '审核未通过'"
                                                      @click="reupload(item.estateId)">重新上传</span></div>
            </div>
        </div>
        <div class="page-area global-clearfix">
            <el-pagination @current-change="changePage" :current-page="pageInfo.pageIndex"
                           :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper"
                           :total="pageInfo.totalNum">
            </el-pagination>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <addestateDialog/>
    </div>
</template>
<style scoped>
    .el-pager {
        display: inline !important;
    }

    .estate-wrap {
        background-color: rgb(250, 250, 250);
        padding-top: 40px;
        padding-left: 42px;
        padding-bottom: 40px;
        font-size: 0;
    }

    .estate-content {
        padding-right: 40px;
    }

    .estate-title {
        height: 43px;
        border-bottom: 1px solid rgb(213, 213, 213);
    }

    .title-text {
        font-size: 24px;
    }

    .add-estate {
        margin-top: 20px;
        margin-bottom: 20px;
        color: #fff;
        font-size: 14px;
        height: 16px;
        padding: 12px 15px;
        display: inline-block;
        background-color: rgb(252, 99, 77);
        cursor: pointer;
    }

    .mark-add {
        font-size: 14px;
        margin-right: 6px;
        color: #fff;
    }

    .table-title {
        height: 33px;
        background-color: rgb(246, 246, 246);
        border: 1px solid rgb(213, 213, 213);
        font-size: 12px;
        font-weight: bold;
        line-height: 33px;
    }

    .estate-name {
        width: 33%;
        text-align: center;
        display: inline-block;
    }

    .check-status {
        width: 33%;
        text-align: center;
        display: inline-block;
    }

    .handle {
        width: 33%;
        text-align: center;
        display: inline-block;
    }

    .h-44 {
        height: 44px;
    }

    .table-content {
        border: 1px solid rgb(213, 213, 213);
        border-top: none;
        line-height: 44px;
        font-size: 0;
    }

    .estate-name-text {
        color: rgb(108, 161, 230);
        font-size: 12px;
        width: 33%;
        display: inline-block;
        text-align: center;
        text-decoration: underline;
    }

    .check-status-text {
        font-size: 14px;
        width: 33%;
        display: inline-block;
        text-align: center;
    }

    .handle-upload-wrap {
        width: 33%;
        text-align: center;
        display: inline-block;
    }

    .handle-upload {
        padding: 6px 12px;
        background-color: rgb(246, 246, 246);
        border: 1px solid rgb(213, 213, 213);
        cursor: pointer;
        font-size: 12px;
    }

    .fail {
        color: red;
    }

    .page-area {
        margin-top: 20px;
    }

    .page-area .el-pagination {
        background: none;
    }
</style>
<script>

    var _ = require('../../lib/underscore.v1.8.3');
    var $$settingsModel = require('../../script/data/model/settings.js');
    var alert = require('../alert/alert');
    var addestateDialog = require('../add-estateDialog/add-estateDialog');


    var companyId = "";
    module.exports = {
        data: function () {
            return {
                cid: "",
                estateList: [],
                pageInfo: {
                    pageIndex: 1,
                    pageSize: 5,
                    totalNum: 0
                },
                alert: {
                    show: false,
                    message: '充值成功！',
                    status: 0
                },
//                isWhite:true
            }
        },
        components: {
//            props:['isWhite'],
            alert: alert,
            addestateDialog: addestateDialog
        },
        created: function () {
            if (!!(this.$route.params.cid)) {
                companyId = this.$route.params.cid;
            } else {
                companyId = '';
            }
        },
        activated: function () {
            this.getList();
        },
        beforeMount: function () {
            var that = this;
            that.getList();
            $$settingsModel.on("refreshList", function (data) {
                that.getList();
            });
        },
        methods: {
            alertShow: function (status, txt) {
                var _this = this;
                _this.alert.status = status;
                _this.alert.message = txt;
                _this.alert.show = true;
                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 2000);
            },
            getList: function () {
                var _this = this;
                var tmp = {};
                $$settingsModel.on("getEstateList", function (res) {
                    if (res.code === "200") {
                        _this.estateList.length = 0;
                        res.data.estateList.forEach(function (item) {
                            tmp.resourceName = item.estateName;
                            tmp.auditStateTxt = item.auditStatus;
                            tmp.estateId = item.estateId;
                            _this.estateList.push(tmp);
                            tmp = {};
                        });
                        _this.pageInfo.totalNum = parseInt(res.data.totalCount);
                    }
                });
                $$settingsModel.getEstateList(_this.wrapCid({
                    page: _this.pageInfo.pageIndex,
                    pageSize: _this.pageInfo.pageSize,
                    timeOrder: 1
                }));
            },
            changePage: function (val) {
                var _this = this;
                this.pageInfo.pageIndex = val;
                this.getList();
            },
            classObject: function (auditStateCode) {
                return {
                    'fail': auditStateCode === '2'
                }
            },
            addEstate: function () {
                var that = this;
                $$settingsModel.addEstateDialog({
                    stepNum: 1
                });

//                $$settingsModel.isWhiteList(function (res) {
////                    console.log(res.code);
////                    _.extend(that.data, res.isWhite);
//
//                });


            },
            reupload: function (id) {
                $$settingsModel.addEstateDialog({
                    stepNum: 2,
                    cityId: id
                });
            },
            wrapCid: function (data) {
                if (companyId !== '') {
                    // data.cid = companyId;
                }
                return data;
            }
        }
    };
</script>
