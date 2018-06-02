<template>
    <div class="header">
        <div class="header-left">
            <a href="javscript:;" @click="goCityIndex()">
                <img class="logo" src="./images/logo.jpg"></img>
            </a>
            <p class="logo-title">焦点广告投放系统</p>
        </div>
        <div class="header-right">
            <div class="header-agent">
                <p class="name">{{companyName}}</p>
                <div class="tag-area">
                    <div class="tag-item">
                        <span class="tag-icon tag-icon-jphy"></span>
                        <span>{{getVipLevelTxt(vipLevel)}}</span>
                    </div>
                    <div class="tag-item">
                        <span class="tag-icon tag-icon-vip"></span>
                        <span>{{getVipStatusTxt(vipStatus)}}</span>
                    </div>
                </div>
            </div>
            <div class="header-user">
                <div class="user-item">
                    <span class="user-icon"></span>
                    <span>{{userRole}}</span>
                </div>
                <p class="user-account">账号：{{accountId}}</p>
            </div>
            <div class="header-message">
                <a href="javascript:;" class="header-btn" @click="showMessageDialog">
                    <span class="header-btn-icon header-btn-icon-notice"><span class="notice-count">{{noticeNum}}</span></span>
                    <span>消息</span>
                </a>
                <div class="message-content" v-if="messageDialog" @click="showMessageDialog">
                    <div class="message-query">
                        <router-link class="message-notice" to="/customer/settings/notice">通知管理</router-link>
                        <status-select v-on:change="changeStatusSelect(arguments[0])" :defaultIndex="0"
                                       :options="statusOptions" class="status-select"/>
                    </div>
                    <div class="message-group">
                        <div class="message-item" v-for="(item, index) in noticeMessage">
                            <div :class="['message-title', {bg: item.expand}]" @click="collapse(index, item.status)">
                                <p class="message-type">
                                    {{item.name}}
                                    <span class="delete-message" v-if="item.status!=2" v-show="item.expand"
                                          @click="function(e){deleteMessage(index);e.stopPropagation();}">删除消息</span>
                                </p>
                                <p :title="item.content" class="message-name"><span class="message-name-title">{{item.content}}</span><span class="date" v-show="!item.expand">{{item.date}}</span>
                                </p>
                            </div>
                            <div class="message-des" v-show="item.expand">
                                <p class="message-obj">{{item.messageObj}}</p>
                                <p class="message-detail">{{item.content}}</p>
                                <p class="date">{{item.date}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="message-page">
                        <el-pagination @current-change="changePage" :current-page="pageInfo.pageIndex"
                                       :page-size="pageInfo.pageSize" layout="prev, pager, next"
                                       :total="pageInfo.itemCount">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <div class="header-help">
                <a href="javascript:;" class="header-btn" @click="showHelpDialog">
                    <span class="header-btn-icon header-btn-icon-help"></span>
                    <span>帮助</span>
                </a>
                <div class="help-content" v-if="helpDialog">
                    <a class="help-btn" href="http://dev.focus.cn/fad/shiyitu/index.html" target="_blank">广告示意图</a>
                    <a class="help-btn" href="http://dev.focus.cn/fad/instruction/" target="_blank">操作手册</a>
                    <span class="consult">咨询客服</span>
                    <p class="phone">010 61135297</p>
                </div>
            </div>

            <router-link class="header-btn" to="/customer/settings/account" v-if="ifAdmin">
                <span class="header-btn-icon header-btn-icon-accountSet"></span>
                <span>账号设置</span>
            </router-link>
            <a href="javascript:;" @click="logout" class="btn-exit">
                安全退出
            </a>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"/>
        <confirm v-show="confirm.show" :title="'确定删除此消息？'" v-on:submit="confirmOk" v-on:cancel="confirmCancel"/>
    </div>
</template>
<style scoped src="./style.css"></style>
<script>
    var selecter = require('../selecter/selecter');
    var alert = require('../alert/alert');
    var confirm = require('../confirm/confirm');
    var $$headerModel = require('../../script/data/model/header.js');
    var $$customer = require('../../script/data/model/customer.js');
    var _ = require('../../lib/underscore.v1.8.3.js');
    var $$util = require('../../lib/util.js');
    var $$qualiModel = require('../../script/data/model/qualification.js');
    var $$user = require('../../script/data/model/user.js');
    var companyId = "";
    var base = location.hostname;
    exports.components = {
        'status-select': selecter,
        'alert': alert,
        'confirm': confirm
    };
    exports.data = function () {
        return {
            "companyName": "",
            "vipLevel": "",
            "vipStatus": "",
            "userRole": "",
            "accountId": "",
            "noticeNum": "",
            "ifAdmin":false,
            alert: {
                show: false,
                message: '信息提交成功',
                status: 0
            },
            confirm: {
                show: false
            },
            pageInfo: {
                itemCount: 0,
                pageIndex: 1,
                pageSize: 5
            },
            helpDialog: false,
            messageDialog: false,
            statusSelect: 3,
            statusOptions: [
                {
                    value: '3',
                    text: '全部'
                },
                {
                    value: '1',
                    text: '已读'
                },
                {
                    value: '0',
                    text: '未读'
                },
                {
                    value: '2',
                    text: '已删除'
                }
            ],
            noticeMessage: "",
            deleteIndex: 0
        }
    };
    exports.methods = {
        domainSuffix: function () {
            var suffixValue = ".focus.cn";
            if (base.indexOf('focus-test') >= 0) {
                suffixValue = ".focus-test.cn";
            } else if (base.indexOf('focus-dev') >= 0) {
                suffixValue = ".focus-dev.cn";
            }
            return suffixValue;
        },
        logout: function () {
            var _this = this;
            var domainValue = this.domainSuffix();
            $$util.clearCookie('pprdig', domainValue, '/');
            $$util.clearCookie('ppinf', domainValue, '/');

            setTimeout(function(){
                _this.isLogin = 0;
                _this.$router.push('/qualification/login');
            }, 500);

        },
        confirmOk: function () {
            var _this = this;
            $$headerModel.deleteMessage({msgId: this.noticeMessage[this.deleteIndex].id, newStatus: 2}, function (res) {
                if (res.code === "200") {
                    _this.noticeMessage.pop(_this.deleteIndex);
                    _this.confirmCancel();
                    _this.query();
                } else {
                    _this.openAlert(res.msg, 1);
                }
            });
        },
        confirmCancel: function () {
            this.confirm.show = false;
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
        wrapCid: function (data) {
            if (companyId !== '') {
                data.cid = companyId;
            }
            return data;
        },
        getVipStatusTxt: function (vipStatus) {
            return vipStatus;
            /*
             var vipStatusTxt = '';
             if (vipStatus === '1') {
             vipStatusTxt = '已认证';
             } else if (vipStatus === '2'){
             vipStatusTxt = '未认证';
             }
             return vipStatusTxt;
             */
        },
        getVipLevelTxt: function (vipLevel) {
            vipLevel = "普通会员";//统一为普通会员
            return vipLevel;
            /*
             var vipLevelTxt = '';
             if (vipLevel === 'gold') {
             vipLevelTxt = '金牌会员';
             } else if (vipLevel === 'silver'){
             vipLevelTxt = '银牌会员';
             } else {
             vipLevelTxt = '普通会员';
             }
             return vipLevelTxt;
             */
        },
        query: function () {
            var _this = this;
            var paramData = {
                status: this.statusSelect,
                pageIndex: this.pageInfo.pageIndex,
                limit: this.pageInfo.pageSize
            };
            if (this.statusSelect == 3) {
                delete paramData.status;
            }
            $$headerModel.getMessageList(paramData,
                    function (res) {
                        if (res.code === "200") {
                            _this.extendData(res.data.list);
                        } else {
                            _this.openAlert(res.msg, 1);
                        }
                    }
            );
        },
        changeStatusSelect: function (statusValue) {
            this.statusSelect = parseFloat(statusValue.value);
            this.query();
        },
        collapse: function (index, status) {
            var _this = this;
            for (var i in this.noticeMessage) {
                if (i != index) {
                    this.noticeMessage[i].expand = false;
                } else {
                    this.noticeMessage[i].expand = !this.noticeMessage[i].expand;
                }
            }
            if (status == 0) {
                $$headerModel.deleteMessage({msgId: this.noticeMessage[index].id, newStatus: 1}, function (res) {
                    if (res.code === "200") {
                        _this.noticeMessage[index].status = 1;
                    } else {
                        _this.openAlert(res.msg, 1);
                    }
                });
            }
        },
        showHelpDialog: function (event) {
            this.helpDialog = true;
            this.messageDialog = false;
            event.stopPropagation();
        },
        showMessageDialog: function (event) {
            this.messageDialog = true;
            this.helpDialog = false;
            event.stopPropagation();
        },
        parent: function (ele) {
            var parent = ele.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (ele) {
            var parentEle = this.parent(ele);
            if (parentEle !== null) {
                if (parentEle.className !== 'message-content') {
                    if (parentEle.className === "layer") {
                        return false;
                    } else {
                        return this.parents(parentEle);
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        hideDialog: function () {
            var _this = this;
            document.addEventListener("click", function (event) {
                if (_this.parents(event.target)) {
                    _this.messageDialog = false;
                    _this.helpDialog = false;
                }
                ;
            })
        },
        deleteMessage: function (index) {
            this.deleteIndex = index;
            this.confirm.show = true;
        },
        changePage: function (val) {
            this.pageInfo.pageIndex = val;
            this.query();
        },
        extendData: function (data) {
            for (var key in data) {
                _.extend(data[key], {"expand": false})
            }
            this.noticeMessage = data;
        },
        goCityIndex: function () {
            $$qualiModel.getCityIndex({},function (data) {
                if (data.code == '200') {
                    window.open("//"+data.data.url);
                };
            })
        }
    };
    exports.beforeMount = function () {
        var _this = this;
        var timeId = '';

        var data = $$user.getCurrentInfo().data;
        _this.companyName = data.companyName;
        _this.vipLevel = data.vipLevel;
        _this.vipStatus = data.vipStatus;
        _this.userRole = data.userRole;
        _this.accountId = data.accountId;
        _this.noticeNum = data.noticeNum;
        if(data.userRoleName == "ROLE_DEMANDER_ADMIN") {
            _this.ifAdmin = true
        }
        $$headerModel.getHeaderInfo(_this.wrapCid({}), function (res) {
            $$customer.updateBreads();
            //在vuex中存储一个当前用户的userType
            _this.$store.default.dispatch('getUserType',res.data.userType);
            _this.$store.default.dispatch('getUserName',res.data.companyName);
        });
        _this.hideDialog();
        $$headerModel.getMessageList({
            limit: 5,
            pageIndex: 1
        });
        $$headerModel.on("getMessageList", function (res) {
            if (res.code === "200") {
                _this.extendData(res.data.list);
                _this.pageInfo.itemCount = parseInt(res.noticeNum);
            }
        });
        $$headerModel.getMessageNum();
        $$headerModel.on("getMessageNum", function (res) {
            window.clearInterval(timeId);
            if (res.code === "200") {
                _this.noticeNum = res.data.num;
            }
            timeId = setTimeout(function(){
                  $$headerModel.getMessageNum()
            },60000);
        });
    };
    exports.created = function () {
        if (!!(this.$route.params.cid)) {
            companyId = this.$route.params.cid;
        } else {
            companyId = '';
        }
    };
</script>
