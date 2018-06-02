
var Vue = require('vue');
var adModel = require('../../script/data/model/ad.js');
var cstModel = require('../../script/data/model/customer.js');
var agentModel = require('../../script/data/model/agent.js');
var _ = require('../../lib/underscore.v1.8.3.js');
var selecter = require('../selecter/selecter');
var confirm = require('../confirm/confirm');
var alert = require('../alert/alert');
var $$moment = require('../../lib/moment.js');
var calendar = require('../price-calendar/price-calendar.vue');

module.exports = {
    data: function () {
        return {
            confirm: {
                show: false,
                msg: '',
                data: {}
            },
            alert: {
                show: false,
                message: 'xxx',
                status: 1
            },
            status: "1",
            //排序 - 曝光量和价格
            sort: {
                bgl: {
                    up: false,
                    down: false
                },
                price: {
                    up: false,
                    down: false
                }
            },
            selecter: [
                {
                    'value': '0',
                    'text': '准备投放'
                },
                {
                    'value': '1',
                    'text': '投放中'
                },
                {
                    'value': '2',
                    'text': '投放完成'
                }
            ],
            data: {
                'putIn': [{
                    'value': '0',
                    'text': '准备投放'
                },
                    {
                        'value': '1',
                        'text': '投放中'
                    },
                    {
                        'value': '2',
                        'text': '投放完成'
                    }],
                'list': []
            }
        }
    },
    components: {
        'selecter': selecter,
        'confirm': confirm,
        'alert': alert,
        'calendar': calendar
    },
    filters: {
        dateFormat: function (value) {
            var i, str = '';
            value = value.toString();
            for (i = 0; i < value.length; i++) {
                if (i === 3) {
                    str += value[i] + '/';
                } else if (i === 5) {
                    str += value[i] + '/';
                } else {
                    str += value[i];
                }
            }
            return str;
        },
        recordStatusFilter: function (value) {
            var val = parseInt(value, 10);
            switch (val) {
                case 1:
                    val = '准备投放'
                    break;
                case 2:
                    val = '投放中'
                    break;
                case 3:
                    val = '投放完成'
                    break;
                case 4:
                    val = '已取消'
                    break;
            }
            ;
            return val;
        },
        moneyFormat: function (money) {
            if (/[^0-9\.]/.test(money)) return '0.00';
            money = money.replace(/^(\d*)$/, "$1.");
            money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            money = money.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(money)) {
                money = money.replace(re, "$1,$2");
            }
            money = money.replace(/,(\d\d)$/, ".$1");
            return '' + money.replace(/^\./, "0.");
        }
    },
    methods: {
        getRange: function (data, item) {
            item.dateList = data.dateList.map(function (item) {
                return item.dateTimestamp;
            });
            item.startDate = data.dateList[0] && data.dateList[0].dateTimestamp;
            item.endDate = data.dateList[data.dateList.length-1] && data.dateList[data.dateList.length-1].dateTimestamp;
        },
        toast: function (status, msg) {
            var _this = this;
            this.alert.status = status;
            this.alert.message = msg;
            this.alert.show = true;
            window.setTimeout(function () {
                _this.alert.show = false;
            }, 1000);
        },
        confirmOk: function () {
            var _this = this, confirmData = _this.confirm.data;
            if (confirmData.type === 'cancelPayedOrder') {
                adModel.cancelPayedOrder({orderId: confirmData.id}, function (res) {
                    if (res.code === '200') {
                        confirmData.target.exist = false;
                        confirmData.target.ifCanceled = true;
                        confirmData.target.isShow = false;
                        _this.toast(0, '取消成功');
                        _this.confirm.show = false;
                    } else {
                        _this.toast(1, res.msg || '取消失败');
                    }
                });
                return;
            }

            if (confirmData.type === 'cancelDistribution') {
                adModel.cancelDistribution({sub_order_id: confirmData.id}, function (res) {
                    if (res.code === '200') {
                        confirmData.target.canceled = true;
                        confirmData.target.status = 4;
                        _this.toast(0, '取消成功');
                        location.reload();
                        _this.confirm.show = false;
                    } else {
                        _this.toast(1, res.msg || '取消失败');
                    }
                });
            }
        },
        confirmCancel: function () {
            this.confirm.show = false;
        },
        /**
         * @
         * @ 改变投放状态
         * @ 改变后请求数据刷新列表
         * @
         **/
        changeStatus: function (select) {
            this.status = select.value;
            var data = {
                status: select.value
            };
            adModel.getPayedAdResourceList(data);
        },
        /**
         * @
         * @ 取消订单
         * @
         **/
        cancelPayedOrder: function (index) {
            var target = this.data.list[index];
            var id = target.order_id;
            this.confirm.msg = '确认要取消此订单吗？';
            this.confirm.show = true;
            this.confirm.data = {
                type: 'cancelPayedOrder',
                id: id,
                target: target
            };
        },
        /**
         *
         * @ 曝光量排序
         *
         **/
        bglSortFn: function () {
            if (this.sort.bgl.up === false) {
                this.data.list.sort(function (a, b) {
                    return b.average - a.average;
                });
                this.sort.bgl.up = true;
                this.sort.bgl.down = false;
            } else {
                this.data.list.sort(function (a, b) {
                    return a.average - b.average;
                });
                this.sort.bgl.up = false;
                this.sort.bgl.down = true;
            }
        },
        /**
         *
         * @ 价格排序
         *
         **/
        priceSortFn: function (type) {
            if (this.sort.price.up === false) {
                this.data.list.sort(function (a, b) {
                    return b.price - a.price;
                });
                this.sort.price.up = true;
                this.sort.price.down = false;
            } else {
                this.data.list.sort(function (a, b) {
                    return a.price - b.price;
                });
                this.sort.price.up = false;
                this.sort.price.down = true;
            }
        },
        /**
         * @
         * @ 复选框选择城市
         * @
         **/
        changeCompanyId: function (index, select) {
            var _this = this;
            var target = this.data.list[index];
            target.companyId = select.value;
            adModel.getChildPlanList({child_id: target.companyId}, function (res) {
                if (res.code === '200') {
                    var p = res.data.list;
                    p.forEach(function (i) {
                        i.text = i.name;
                        i.value = i.id;
                    });
                    if (p.length === 0) {
                        target.plan = [{text: "暂无数据", "value": -1}];
                        target.planId = -1;
                    } else {
                        target.plan = p;
                        target.planId = p[0].id;
                    }

                } else {

                }
                Vue.set(target, 'isShow', true);
            });
        },
        /**
         * @
         * @ 复选框选择计划
         * @
         **/
        changePlanId: function (index, select) {
            var target = this.data.list[index];
            target.planId = select.id || select.value;
        },
        /**
         * @
         * @ 修改广告单元名字
         * @
         **/
        modifyAdNameFn: function (e) {
            var target = e.target;
            if (target.tagName === 'INPUT') {
                // target = target.querySelector('.adNameInput');
                target.removeAttribute('disabled');
            }

        },
        /**
         * @
         * @ 修改广告单元名字-获取焦点
         * @
         **/
        modifyAdNameFocusFn: function (e) {
            var target = e.target;
            target.className = target.className + ' active';
        },
        /**
         * @
         * @ 修改广告单元名字-失去焦点
         * @
         **/
        modifyAdNameBlurFn: function (e) {
            var target = e.target;
            target.className = target.className.replace(/active/ig, '');
            target.setAttribute('disabled', 'disabled');
        },
        /**
         * @
         * @ 分配广告资源
         * @ 分配到下方historyTable列表
         * @
         **/
        releaseAdResource: function (index) {
            var that = this;
            var target = this.data.list[index];
            /**
             @  startDate: data.startDate,
             @  endDate: data.endDate,
             @  companyId: data.companyId,
             @  planId: data.planId,
             @  name: data.name,
             @  orderId: data.orderId
             **/
            // var startDate = (new Date(target.duringTime[0]).getTime()).toString();
            // var endDate = (new Date(target.duringTime[1]).getTime()).toString();
            // var companyId = target.companyId.toString();

            var data = {
                dateList: target.dateList,
                startDate: target.startDate,
                endDate: target.endDate,
                companyId: target.companyId,
                planId: target.planId,
                name: target.unitName,
                orderId: target.order_id
            }
            if (data.companyId === -1) {
                that.toast(1, '请先添加子客');
                return;
            }

            if (data.planId === -1) {
                that.toast(1, '请先创建推广计划');
                return;
            }

            if (data.dateList.length < 1) {
                that.toast(1, '请先选择日期');
                return;
            }

            adModel.releaseAdResource(data, function (res) {
                if (res.code === '200') {
                    var companyName;
                    var planName;
                    var id = res.data.id;
                    var statusName = res.data.statusName;
                    var releaseDay;
                    var dstartTime;
                    var dendTime;
                    var dateList;
                    var periodStart;
                    var periodEnd;
                    dateList = target.dateList.map(function(item){
                        return that.secondToDate(+item);
                    });
                    dstartTime = new Date(target.startDate).getTime();
                    dendTime = new Date(target.endDate).getTime();
                    periodStart = that.secondToDate(+dstartTime);
                    periodEnd = that.secondToDate(+dendTime);
                    releaseDay = parseInt(((+dendTime) - (+dstartTime)) / (60 * 60 * 24 * 1000)) + 1;
                    target.company.forEach(function (i) {
                        if (i.id === target.companyId) {
                            companyName = i.name;
                        }
                        ;
                    });
                    target.plan.forEach(function (j) {
                        if (j.id === target.planId) {
                            planName = j.name;
                        }
                        ;
                    });
                    /**
                     @@ exp
                     @ {
                     @     "recordId": 2,
                     @     "companyName": "搜狐",
                     @     "planName": "一期推广计划",
                     @     "planId": 2,
                     @     "unitName": "首页二屏通栏",
                     @     "releaseDay": 10,
                     @     "startTime": 1480563720083,
                     @     "endTime": 1481078317120,
                     @     "status": 0
                     @ }
                     **/
                    var item = {
                        'recordId': id,
                        'companyName': companyName,
                        'planName': planName,
                        'companyId': target.companyId,
                        'planId': target.planId,
                        'unitName': target.postionName,
                        'releaseDay': releaseDay,
                        'dateList': dateList,
                        'strTime': [periodStart, periodEnd],
                        'canceled': false,
                        'status': 1,
                        'statusName': statusName
                    };
                    target.recordList.push(item);
                    that.toast(0, '分配成功');
                } else {
                    that.toast(1, res.msg || '分配失败');
                }
            });
        },
        /**
         * @
         * @ 下方分配历史记录为分配日期增加title
         * @  params : 日期列表
         * @
         **/
        dateTitle: function (dateList) {
            var title = '';
            if (!dateList) return;
            dateList.forEach(function (item) {
                title += item + '\n';
            });
            return title;
        },
        /**
         * @
         * @ 抹掉广告资源
         * @ 在下方historyTable列表抹掉
         * @
         **/
        removeHistoryTable: function (index, ind) {
            /**
             * 取消已分配纪录
             * @param recordId {string} 纪录id
             */
            var _this = this;
            var list = this.data.list[index].recordList;
            if (list[ind].canceled !== false) {
                return;
            }
            this.confirm.msg = '确认要取消此分配计划吗';
            this.confirm.show = true;
            this.confirm.data = {
                type: 'cancelDistribution',
                id: list[ind].recordId,
                target: list[ind]
            };
        },
        /**
         * @
         * @ 初始化 - 获取筛选项数据
         * @
         **/
        initFilterInfoFn: function () {
            var _self = this;
            var data = {
                status: "0"
            };
            adModel.on('getPayedAdResourceList', function (res) {
                if (res.code === '200') {
                    var ajaxData = res.data.list;
                    ajaxData.forEach(function (item) {
                        item.exist = true;
                        item.isShow = false;
                        item.ifCanceled = false;
                        var periodStart = +item.startTime;
                        var periodEnd = +item.endTime;
                        var duringStart = new Date(periodStart);
                        var duringEnd = new Date(periodEnd);
                        //时间区间
                        item.duringTime = [duringStart, duringEnd];
                        item.company = [];
                        item.dateList = [];
                        item.companyId = "0";
                        item.plan = [];
                        item.planId = "-1";
                        item.unitName = item.positionName;
                        item.recordList.forEach(function (it) {
                            var s = _self.secondToDate(+it.startTime);
                            var e = _self.secondToDate(+it.endTime);
                            it.strTime = [s, e];
                            if (it.status === '3' || it.status === '4') {
                                it.canceled = true;
                            } else {
                                it.canceled = false;
                            }
                        });
                    });

                    _self.data.list = ajaxData;
                }
            });
            adModel.getPayedAdResourceList(data);
        },
        /**
         * @
         * @ 获取一条广告信息的详情
         * @
         **/
        showItemDetailFn: function (index) {
            var that = this;
            var target = this.data.list[index];
            var id = target.id;
            if (target.isShow) {
                Vue.set(target, 'isShow', false);
                return;
            }
            if (target.ifCanceled) {
                return;
            }
            var data = {
                id: id
            };
            adModel.getChildGuestList(data, function (res) {
                if (res.code === '200') {
                    var d = res.data.list;
                    d.forEach(function (i) {
                        i.text = i.name;
                        i.value = i.id;
                    });

                    target.company = d;
                    target.companyId = d.length ? d[0].id : -1;

                    adModel.getChildPlanList({child_id: target.companyId}, function (res) {
                        if (res.code === '200') {
                            var p = res.data.list;
                            p.forEach(function (i) {
                                i.text = i.name;
                                i.value = i.id;
                            });
                            if (p.length === 0) {
                                target.plan = [{text: "暂无数据", "value": -1}];
                                target.planId = -1;
                            } else {
                                target.plan = p;
                                target.planId = p[0].id;
                            }
                        }
                        Vue.set(target, 'isShow', true);
                    });
                }
                that.data.list.forEach(function (item, index) {
                    Vue.set(item, 'isShow', false);
                });

            });
        },
        /**
         * @
         * @ {int}秒数转日期
         * @
         **/
        secondToDate: function (s) {
            var date = new Date(s),
                Y = date.getFullYear() + '-',
                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                D = date.getDate() + ' ';
            return (Y + M + D);
        },

        // hover显示所有样式
        showTitle: function (item) {
            return item.join('\n');
        }
    },
    beforeMount: function () {
        this.initFilterInfoFn();
    }
};