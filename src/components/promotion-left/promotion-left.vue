<template>
    <div class="promotion-left-nav">
        <div class="nav-header" @click="changeTab(-1)">所有广告内容</div>
        <ul class="nav-list">
            <li :class="['nav-list-item',{'cur': index === activePlanIndex},{'error': item.status !== '1'}]" v-for="(item,index) in planList" ref="planEle">
                <div @click="changeTab(index)" :class="['item-txt', {cur: index === activePlanIndex && activeUnitIndex < 0}]">
                    {{item.name}}
                </div>
                <ul class="item-list">
                    <li :class="['item-list-item',statusTexts[unit.status],{'cur': uIndex === activeUnitIndex}]"
                        @click="changeMTab(index,uIndex)"
                        v-for="(unit,uIndex) in item.unitList || unitsData">
                        <router-link :to="{name: cid ? 'agent_prom_unit' : 'cust_prom_unit', params: {pid: item.id, uid: unit.id}}" class="list-item-txt">
                            <a href="javascript:;" class="ico"></a>
                            <span class="ico-layer">{{unit.status_text}}</span>
                            <p class="item-txt-para">{{unit.name}}</p>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status" />
    </div>
</template>
<style scoped>
    .promotion-left-nav {
        float: left;
        width: 200px;
        /*min-height: 100vh;*/
        border-right: 1px solid #d8d8d8;
        background: #fff;
        height: 100%;
        overflow-x: visible;
        overflow-y: scroll;
    }

    .promotion-left-nav .nav-header {
        height: 40px;
        line-height: 40px;
        color: #4A90E2;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #d8d8d8;
        background: #f0f7ff;
        cursor: pointer;
    }

    .promotion-left-nav .nav-list-item, .promotion-left-nav .item-list-item {
        line-height: 39px;
        color: #333;
        font-size: 14px;
        cursor: pointer;
    }

    .promotion-left-nav .nav-list-item.cur .item-txt {
        color: #4A90E2;
    }

    .promotion-left-nav .nav-list-item .item-txt.cur {
        border-right: 1px solid #fafafa;
        width: 187px;
    }

    .promotion-left-nav .nav-list-item .item-list {
        display: none;
    }

    .promotion-left-nav .nav-list-item.cur .item-list {
        display: block;
    }

    .promotion-left-nav .item-list-item {
        font-size: 12px;
    }

    .promotion-left-nav .item-list-item.cur {
        width: 200px;
        background: #fafafa;
        border-right: 1px solid #fafafa;
    }

    .promotion-left-nav .item-txt, .promotion-left-nav .list-item-txt {
        display: block;
        padding-left: 13px;
        color: #333;
        border-bottom: 1px solid #d8d8d8;
    }

    .promotion-left-nav .item-txt {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .promotion-left-nav .list-item-txt {
        font-size: 0px;
        letter-spacing: -4px;
    }

    .promotion-left-nav .item-txt:before {
        content: '';
        display: inline-block;
        width: 25px;
        height: 38px;
        background: url('images/nav-ico.png') no-repeat left center;
        vertical-align: middle;
    }

    .promotion-left-nav .nav-list-item.error .item-txt:before {
        background-image: url('images/dtb_1.png');
    }

    .promotion-left-nav .list-item-txt {
        position: relative;
        padding-left: 40px;
        color: #333;
    }

    .promotion-left-nav .item-list-item .item-txt-para {
        display: inline-block;
        width: 120px;
        margin-left: 3px;
        /*padding-left: 20px;*/
        /*background: url('images/nav-ico.png') no-repeat left center;*/
        background-size: 10px 10px;
        line-height: 40px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        vertical-align: middle;
        font-size: 12px;
        letter-spacing: 0px;
    }

    .promotion-left-nav .item-list-item .ico {
        display: inline-block;
        /*position: absolute;
        right: 6px;
        top: 13px;*/
        width: 20px;
        height: 40px;
        background: url('images/nav-ico.png') no-repeat center center;
        vertical-align: middle;
    }

    .promotion-left-nav .item-list-item.passed .ico {
        background-image: url('images/sucai_1.png');
    }

    .promotion-left-nav .item-list-item.passno .ico {
        background-image: url('images/sucai_2.png');
    }

    .promotion-left-nav .item-list-item.passup .ico {
        background-image: url('images/sucai_3.png');
    }

    .promotion-left-nav .item-list-item.passexam .ico {
        background-image: url('images/sucai_4.png');
    }

    .promotion-left-nav .item-list-item .ico-layer {
        display: none;
        position: absolute;
        left: 70px;
        top: 8px;
        padding-right: 5px;
        height: 24px;
        line-height: 24px;
        white-space: nowrap;
        border-radius: 2px;
        font-size: 12px;
        letter-spacing: 0px;

    }

    .promotion-left-nav .item-list-item .ico:hover + .ico-layer {
        display: block;
    }

    .promotion-left-nav .item-list-item .ico-layer:before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        margin: 5px 5px 0 -5px;
        border-width: 5px 5px 5px 0;
        border-style: solid;
        border-color: #fff #d0f1ad #fff #fff;
    }

    .promotion-left-nav .item-list-item.passed .ico-layer {
        background: #d0f1ad;
        color: #346102;
    }

    .promotion-left-nav .item-list-item.passed .ico-layer:before {
        border-right-color: #d0f1ad;
    }

    .promotion-left-nav .item-list-item.passno .ico-layer {
        background: #FBCAC5;;
        color: #B71D0E;
    }

    .promotion-left-nav .item-list-item.passno .ico-layer:before {
        border-right-color: #FBCAC5;
    }

    .promotion-left-nav .item-list-item.passup .ico-layer {
        background: #FEC86F;
        color: #975F03;
    }

    .promotion-left-nav .item-list-item.passup .ico-layer:before {
        border-right-color: #FEC86F;
    }

    .promotion-left-nav .item-list-item.passexam .ico-layer {
        background: #C3DCF9;
        color: #1B5FAF;
    }

    .promotion-left-nav .item-list-item.passexam .ico-layer:before {
        border-right-color: #C3DCF9;
    }
</style>
<script>
    var $$customer = require('../../script/data/model/customer.js');
    var alert = require('../alert/alert');
    var $$domain = require('../../script/config.js').domain;
    var request = require('lib-request');
    module.exports = {
        data: function () {
            return {
                cid: '',
                pid: '',
                uid: '',
                activePlanIndex: -1,
                activeUnitIndex: -1,
                statusTexts: {
                    0: 'passup', //未上传
                    1: 'passexam',//审核中
                    2: 'passed',//已通过
                    3: 'passno'//未通过
                },
                planList: null,
                alert: {
                    show : false,
                    message: '信息提交成功',
                    status: 0
                },
                unitsData: []
            }
        },
        components: {
            'alert': alert
        },
        methods: {
            openAlert: function (title, type) {
                var _this = this;
                _this.alert.status = type;
                _this.alert.message = title;
                _this.alert.show = true;

                window.setTimeout(function () {
                    _this.alert.show = false;
                }, 2000);
            },
            updateParams: function () {
                this.cid = this.$route.params.cid;
                this.pid = this.$route.params.pid;
                this.uid = this.$route.params.uid;
            },
            changeTab: function (index) {
                var _this = this;
                _this.activeUnitIndex = -1;
                if (index >= 0) {
                    _this.activePlanIndex = index;
                    _this.pid = _this.planList[index].id;

                    $$customer.getAdPlanInfo({
                        id: parseInt(_this.pid)
                    }, function(data) {
                        _this.planInfoResult(data);
                        // 请求回数据后 路由跳转
                        if (_this.cid) {
                            _this.$router.push({
                                name: 'agent_prom_plan',
                                params: {
                                    pid: _this.pid
                                }
                            });
                        } else {
                            _this.$router.push({
                                name: 'cust_prom_plan',
                                params: {
                                    pid: _this.pid
                                }
                            });
                        }
                    });

                } else {
                    _this.activePlanIndex = -1;
                    if (_this.cid) {
                        _this.$router.push({
                            name: 'agent_prom_all'
                        });
                    } else {
                        _this.$router.push({
                            name: 'cust_prom_all'
                        });
                    }
                    $$customer.updateBreads();
                    $$customer.controlNewUnit("true");
                }
                $$customer.changeTab();
            },
            changeMTab: function (index, uIndex) {
                this.activePlanIndex = index;
                this.activeUnitIndex = uIndex;
                $$customer.getAdUnitInfo({
                    id: parseInt(this.planList[index].unitList[uIndex].id)
                });
                // window.location.reload();
            },
            planInfoResult: function (data) {
                var _this = this;
                if(data.code == 200){
                    if (_this.activePlanIndex >= 0) {
                        var oArr = _this.planList[_this.activePlanIndex].unitList;
                        _this.planList[_this.activePlanIndex].unitList.splice(0, oArr.length);
                        var list = data.data.units;
                        for (var i = 0, len = list.length; i < len; i++) {
                            _this.planList[_this.activePlanIndex].unitList.push(list[i]);
                            if (_this.uid && list[i].id === _this.uid) {
                                _this.activeUnitIndex = i;
                            }
                        }
                        $$customer.controlNewUnit(data.data.can_create_order);
                    }
                }else{
                    _this.openAlert(data.msg, 1);
                }
            }
        },
        watch: {
            '$route': function (value) {
                // 监听路由变化 发送请求 保证能展开下拉菜单
                var pid = value.params.pid,
                    _this = this;

                $$customer.getAdPlanInfo({
                    id: parseInt(pid)
                }, function (data) {
                    _this.planInfoResult(data);
                })

                this.updateParams();
                var _this = this;
                var list = _this.planList;
                var i, len;
                _this.activePlanIndex = -1;
                _this.activeUnitIndex = -1;
                if (_this.pid) {
                    for (i = 0, len = list.length; i < len; i++) {
                        if (list[i].id === _this.pid) {
                            _this.activePlanIndex = i;
                        }
                    }
                }
                if (_this.activePlanIndex >= 0 && _this.uid) {
                    list = _this.planList[_this.activePlanIndex].unitList;
                    for (i = 0, len = list.length; i < len; i++) {
                        if (list[i].id === _this.uid) {
                            _this.activeUnitIndex = i;
                        }
                    }
                }
            }
        },
        created: function () {
            var _this = this;
            this.updateParams();
            $$customer.on('getAdPlanList', function (data) {
                if(data.code == 200) {
                    var list = data.data.list;
                    for (var i = 0, len = list.length; i < len; i++) {
                        if (_this.pid && list[i].id === _this.pid) {
                            _this.activePlanIndex = i;
                            $$customer.getAdPlanInfo({
                                id: parseInt(_this.pid)
                            }, function (data) {
                                _this.planInfoResult(data);
                                $$customer.updateBreads();
                            });
                        }
                        list[i].unitList = [];
                    }
                    _this.planList = list;
                }else{
                    _this.openAlert(data.msg, 1);
                }
            });
            $$customer.getAdPlanList();
        },
        beforeMount: function () {
            request.pushWhiteList($$domain + '/spreading/getAdPlanInfo/' + this.$route.params.cid, 'data.desc');
            request.pushWhiteList($$domain + '/spreadManage/getAdUnitInfo/' + this.$route.params.cid, 'data.ideaRestrain');
        }
    }
</script>
