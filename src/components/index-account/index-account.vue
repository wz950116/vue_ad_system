<template>
    <div class="index-account">
            
        <!-- 代理公司 -->
        <div class="agent-info" v-if="type === 1">
            <div class="account-right">
                <dl>
                    <dt>查询</dt>
                    <dd class="left-select">
                        <div class="filter-exam left">
                            <status-select 
                                v-on:change="changeStatusSelect(arguments[0])" 
                                :defaultIndex="defaultIndex" 
                                :options="statusOptions" 
                                class="status-select" />
                        </div>
                    </dd>
                    <dd class="right-input">
                        <div>
                            <el-autocomplete
                                v-model="inputKey"
                                :fetch-suggestions="querySearch"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                                class="status-input">
                            </el-autocomplete>
                        </div>
                        <span class="icon-point" @click="handleIconClick"></span>
                    </dd>
                </dl>
            </div>

            <div class="account-left">
                <div class="account-left-con">
                    <span class="acc-name">今日消耗</span>
                    <span class="acc-num">{{ data.todayCost | moneyFormat }}</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">现金金额</span>
                    <span class="acc-num">{{ data.totalBalance | moneyFormat }}</span>
                    <span class="acc-use">( 可用{{ data.availableBalance | moneyFormat }} )</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">赠款余额</span>
                    <span class="acc-num">{{ data.totalGrant | moneyFormat }}</span>
                    <span class="acc-use">( 可用{{ data.availableGrant | moneyFormat }} )</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">信用额度</span>
                    <span class="acc-num">{{ data.creditLine | moneyFormat }}</span>
                    <span class="acc-use">( 可用{{ data.availableGrant | moneyFormat }} )</span>
                </div>
            </div>
        </div>

        <!-- 开发商直客 -->
        <div class="demander-info" v-else>
            <div class="account-right">
                <dl>
                    <dt>广告统计</dt>
                    <dd>投放中：<a @click="changeAdStatus(2)" class="href-link">{{ dataStatus.passed }}</a></dd>
                    <dd>待审核：<a @click="changeAdStatus(1)" class="href-link">{{ dataStatus.check }}</a></dd>
                    <dd>未通过：<a @click="changeAdStatus(3)" class="href-link">{{ dataStatus.nopass }}</a></dd>
                </dl>
            </div>

            <div class="account-left">
                <div class="account-left-con">
                    <span class="acc-name">今日消耗</span>
                    <span class="acc-num">{{ tableData.todayCost | moneyFormat }}</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">现金金额</span>
                    <span class="acc-num">{{ tableData.totalBalance | moneyFormat }}</span>
                    <span class="acc-use">( 可用{{ tableData.availableBalance | moneyFormat }} )</span>
                </div>
                <div class="account-line"></div>
                <div class="account-left-con">
                    <span class="acc-name">赠款余额</span>
                    <span class="acc-num">{{ tableData.totalGrant | moneyFormat }}</span>
                    <span class="acc-use">( 可用{{ tableData.availableGrant | moneyFormat }} )</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .index-account {
        width: 100%;
        height: 100px;
        margin-bottom:30px;
        clear: both;
    }

    .index-account .account-left {
        height: 100px;
        color: #f8f8f8;
        background: #28B779;
        border-radius: 2px;
        overflow:hidden;
    }

    .index-account .account-left .account-line {
        float: left;
        width: 1px;
        height: 50px;
        background: #7AD488;
        margin-top: 25px;
    }

    .agent-info .account-left-con {
        float: left;
        width: 25%;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
    }

    .demander-info .account-left-con {
        float: left;
        width: 33.3%;
        padding: 20px 0 0 20px;
        box-sizing: border-box;
    }

    .index-account .account-left-con:last-child {
        width: auto;
    }

    .index-account .acc-name {
        height: 26px;
        line-height: 18px;
        font-size: 18px;
        clear: both;
        display: block;
        margin-bottom: 4px;
    }

    .index-account .acc-num {
        height: 24px;
        line-height: 14px;
        font-size: 14px;
        display: block;
    }

    .index-account .acc-use {
        line-height: 12px;
        font-size: 12px;
        display: block;
    }

    .index-account .right-input {
       position: relative;
    }

    .icon-point {
        position: absolute;
        right: 0;
        top: 0;
        width: 36px;
        height: 100%;
        cursor: pointer;
    }

    .account-right {
        float: right;
        width: 380px;
        height: 98px;
        border: 1px solid #FFB848;
        border-radius: 2px;
        font-size: 14px;
        margin-left:20px;
    }

    .account-right dt {
        height: 35px;
        line-height: 35px;
        background: #FFB848;
        color: #fff;
        padding-left: 15px;
    }

    .account-right dd {
        float: left;
        height: 38px;
        line-height: 38px;
        color: #4a4a4a;
        margin: 8px 0 0 20px;
    }

    .account-right dd a {
        color: #FF613E;
        text-decoration:underline;
    }

    .href-link {
        cursor: pointer;
    }

    .status-select {
        width: 100px;
    }

    .href-link {
        cursor: pointer;
    }
</style>

<style>
    /*更改el-input样式*/
    .account-right .status-input{
        width: 210px;
        height: 38px;
        padding-right: 10px;
        border-radius: 0px;
        border:1px solid #d5d5d5;
        background-color: #f6f6f6;
    }
    .account-right .status-input .el-input__inner {
        height: 40px;
        padding-right: 26px;
        border: none;
        background: url("./images/search L.png") right 7px no-repeat;
    }
</style>
<script>
    var $$agent = require('../../script/data/model/agent.js');
    var $$customer = require('../../script/data/model/customer.js');
    var $user = require('../../script/data/model/user.js');
    var selecter = require('../selecter/selecter.vue');
    module.exports = {
        props: ['data', 'type'],
        data: function () {
            return {
                statusOptions: [{
                    value: 'demander',
                    text: '客户名称'
                },{
                    value: 'idea',
                    text: '广告创意'
                },{
                    value: 'order',
                    text: '广告单元'
                },{
                    value: 'plan',
                    text: '推广计划'
                }],
                statusSelect: 'demander',
                defaultIndex: 0,
                inputKey: '',
                _inputKey: '',  // 用于请求的输入框内容
                restaurants: [],
                tableData: this.data,
                dataStatus: {
                    check: '',
                    passed: '',
                    nopass: ''
                }
            }
        },
        components: {
            'status-select': selecter
        },
        watch: {
            data: function (data) {
                var _this = this;
                _this.tableData = data;
                this.dataStatus.check = this.tableData.ideaStatus[0].countNum;
                this.dataStatus.passed = this.tableData.ideaStatus[1].countNum;
                this.dataStatus.nopass = this.tableData.ideaStatus[2].countNum;
            }
        },
        filters: {
            moneyFormat: function (money) {
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
                return '￥' + money.replace(/^\./, "0.");
            }
        },
        methods: {
            changeStatus: function (status) {
                //获取用户基本信息
                var infoData = $user.getCurrentInfo().data;
                if (infoData.userRoleName == 'ROLE_DEMANDER_ACCOUNTANT') {
                    //权限管理：财务员
                    return
                } else {
                    $$agent.changeComStatus(status);
                }
            },
            changeAdStatus: function (status) {
                //获取用户基本信息
                var infoData = $user.getCurrentInfo().data;
                if (infoData.userRoleName == 'ROLE_DEMANDER_ACCOUNTANT') {
                    //权限管理：财务员
                    return
                } else {
                    $$customer.changeUnitStatus(status);
                    this.$router.push('/customer/promotion/all?type='+ status);
                }
            },

            // 推广计划下拉菜单
            changeStatusSelect: function(statusValue) {
                this.statusSelect = statusValue.value;
            },

            // 查询
            handleSearch: function (params) {
                var that = this;
                $$agent.getSearchResult(params, function (res) {
                    if (res.code == 0) {
                        if (that.statusSelect === 'plan') {
                            that.$router.push({
                                name: 'agent_prom_plan',
                                params: {
                                    cid: res.data[0].demanderID,
                                    pid: res.data[0].planID
                                }
                            })
                        } else if (that.statusSelect === 'demander') {
                            that.$router.push({
                                name: 'agent_prom_all',
                                params: {
                                    cid: res.data[0].demanderID
                                }
                            }) 
                        } else {
                            that.$router.push({
                                name: 'agent_prom_unit',
                                params: {
                                    cid: res.data[0].demanderID,
                                    pid: res.data[0].planID,
                                    uid: res.data[0].orderID
                                }
                            })
                        }
                        
                    }
                })
            },
            handleIconClick: function () {
                if (this.inputKey === "") return;
                var params = {
                    "searchTarget": this.statusSelect, 
                    "searchContent": this._inputKey || this.inputKey
                };
                this.handleSearch(params);
                // 跳转后清空input
                this._inputKey = "";
                this.inputKey = "";
            },

            // 输入框自动匹配auto-complete
            querySearch: function (queryString, cb) {
                var _this = this,
                    key = queryString,
                    params = {
                    "searchTarget": _this.statusSelect, 
                    "searchContent": queryString
                }
                $$agent.getSearchResult(params, function (res) {
                    if (res.code == 0) {
                        var restaurants = res.data,
                            results = queryString ? restaurants.filter(_this.createFilter(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        var handleResult = [];
                        results.forEach(function (val) {
                            switch (_this.statusSelect) {
                                case 'demander':
                                Object.defineProperty(val, "value", {
                                    value: val.demanderID +"-"+ val.demanderName
                                })
                                break;
                            case 'idea':
                                Object.defineProperty(val, "value", {
                                    value: val.ideaID +"-"+ val.ideaName
                                })
                                break;
                            case 'order':
                                Object.defineProperty(val, "value", {
                                    value: val.orderID +"-"+ val.orderName
                                })
                                break;
                            case 'plan':
                                Object.defineProperty(val, "value", {
                                    value: val.planID +"-"+ val.planName
                                })
                                break;
                            default:
                                break;
                            }
                            handleResult.push(val);
                        })
                        // 只渲染handleResult中的value字段内容
                        cb(handleResult);
                    }
                })
            },
            createFilter: function (queryString) {
                var _this = this;
                return function (restaurant) {
                    switch (_this.statusSelect) {
                        case 'demander':
                            return (restaurant.demanderID.indexOf(queryString.toLowerCase()) === 0 || restaurant.demanderName.indexOf(queryString.toLowerCase()) === 0);
                            break;
                        case 'idea':
                            return (restaurant.ideaID.indexOf(queryString.toLowerCase()) === 0 || restaurant.ideaName.indexOf(queryString.toLowerCase()) === 0);
                            break;
                        case 'order':
                            return (restaurant.orderID.indexOf(queryString.toLowerCase()) === 0 || restaurant.orderName.indexOf(queryString.toLowerCase()) === 0);
                            break;
                        case 'plan':
                            return (restaurant.planID.indexOf(queryString.toLowerCase()) === 0 || restaurant.planName.indexOf(queryString.toLowerCase()) === 0);
                            break;
                        default:
                            break;
                    }
                }
            },
            handleSelect: function (item) {
                switch (this.statusSelect) {
                    case 'demander':
                        this._inputKey = item.demanderID;
                        break;
                    case 'idea':
                        this._inputKey = item.ideaID;
                        break;
                    case 'order':
                        this._inputKey = item.orderID;
                        break;
                    case 'plan':
                        this._inputKey = item.planID;
                        break;
                    default:
                        break;
                }
                this.handleIconClick();
            }
        }
    };
</script>
