var selecter = require('../selecter/selecter');
var $$customer = require('../../script/data/model/customer.js');
var confirm = require('../confirm/confirm');
var alert = require('../alert/alert');
var $$domain = require('../../script/config.js').domain;
var request = require('lib-request');
module.exports = {
    props: {
        type: Number,
        unitId: String,
        from: String,
        isBlock: [Boolean],
        unitName: String,
        disabled: [Boolean],
        launchStatus: Number
    },
    components: {
        'status-select': selecter,
        'alert': alert,
        'confirm': confirm,
        'idea-create-new': require('../promotion-idea-create-new/promotion-idea-create-new.vue'),
        'idea-detail-dialog': require('../promotion-idea-detail-dialog/promotion-idea-detail-dialog.vue')
    },
    data: function () {
        return {
            detailDialog: {
                ideaId: 0,
                orderName: ''
            },
            ideaId: 0,
            operatorId: 0,
            orderId: 0,
            isEmptyData: true,
            showCreateBtn: false,
            dateRange: '',
            dateRangeForView: '',
            dateFormat: 'YYYY-MM-DD',
            statusOptions: [{
                value: '3',
                text: '全部' //全部，不传
            }, {
                value: '0',
                text: '待审核'
            }, {
                value: '1',
                text: '已通过'
            }, {
                value: '2',
                text: '未通过'
            }, {
                value: '4',
                text: '已删除'
            }],
            tableData: [],
            pageInfo: {
                itemCount: 0,
                pageIndex: 1,
                pageSize: 10
            },
            statusSelect: 3,
            keyword: '',
            allCheck: false,
            alert: {
                show: false,
                message: '信息提交成功',
                status: 0
            },
            confirm: {
                show: false
            },
            addIdeaFlag: false,
            defaultIndex: 0
        }
    },
    created: function () {
        this.showCreateBtn = (this.$route.name && this.$route.params.uid);
    },
    watch: {
        '$route': function (to, from) {
            this.tableData = [];

            var params = this.getQueryString("type"),
                changeData = {};
            if (params != null) {
                this.defaultIndex = parseInt(params);
                changeData = {
                    value: parseInt(params) - 1
                }
                this.changeStatusSelect(changeData);
            }
            this.showCreateBtn = (this.$route.name && this.$route.params.uid);
            if (to.name && to.name.endsWith(this.from)) this.getQuery();
        },
        dateRangeForView: function (val) {
            if (Object.prototype.toString.call(val) === '[object Array]') {
                if (val.length === 0) {
                    this.dateRange = ' - ';
                } else {
                    this.dateRange = this._dateTimeFormatter(val[0], this.dateFormat) + ' - ' +
                        this._dateTimeFormatter(val[1], this.dateFormat);
                }
            }
            this.sendParams();
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
    methods: {
        seeIdeaDetail: function (id) {
            this.ideaId = parseInt(id);
            this.orderId = parseInt(this.$route.params.uid);
            this.operatorId = parseInt(this.$route.params.cid);
            this.$refs.createDialog.isEdit = true;
            this.$refs.createDialog.dialogVisible = true;
        },
        detailDialog: {
            ideaId: 0,
            orderName: ''
        },
        seeIdeaDetail1: function (id, name) {
            this.detailDialog.ideaId = parseInt(id);
            this.detailDialog.orderName = name;
            this.$refs.detailDialog.dialogVisible = true;

        },
        ideaCreateClicked: function () {
            if (this.disabled) {
                return false;
            }
            this.orderId = parseInt(this.$route.params.uid);
            this.operatorId = parseInt(this.$route.params.cid);
            this.$refs.createDialog.isEdit = false;
            this.$refs.createDialog.dialogVisible = true;
        },
        changeStatusSelect: function (statusValue) {
            this.statusSelect = parseFloat(statusValue.value);
            this.getQuery();
        },
        selectedItems: function () {
          //下载列表的时候，checkall走这里
            var sel = [];
            if (this.allCheck) {
                var pageName = this.$route.name;  //判断当处于哪个路由页面agent_prom_all，agent_prom_plan，agent_prom_unit
                switch (pageName) {
                    case "agent_prom_all":
                        sel.push(parseInt(0));
                        break;
                    case "agent_prom_plan": {
                        var url = this.$route.path;
                        var pid = url.substring(url.lastIndexOf('/') + 1, url.length);
                        sel.push(parseInt(0));
                        sel.push(parseInt(0));
                        sel.push(parseInt(pid));
                    }
                        break;
                    case "agent_prom_unit":{
                        var url = this.$route.path;
                        var pid = url.substring(url.lastIndexOf('/') + 1, url.length);
                        sel.push(parseInt(0));
                        sel.push(parseInt(1));
                        sel.push(parseInt(pid));
                    }
                }
            } else {
                this.tableData.forEach(function (item) {
                    if (item.id !== "总计") {
                        if (item.checkStatus && item.id) {
                            sel.push(parseInt(item.id));
                        }
                    }
                });
            }
            return sel;
        },
        confirmOk: function () { // 批量删除创意
            this.confirm.show = false;
            // var sel = this.selectedItems();
            var sel = [];
            this.tableData.forEach(function (item) {
                if (item.id !== "总计") {
                    if (item.checkStatus && item.id) {
                        sel.push(parseInt(item.id));
                    }
                }
            });
            if (sel.length === 0) {
                this.openAlert('请选择需要删除的创意', 1);
            } else {
                $$customer.deleteAdIdeas({
                    order_id: parseInt(this.$route.params.uid),
                    list: sel
                }, this.response);
            }
        },
        confirmCancel: function () {
            this.confirm.show = false;
        },
        _dateTimeFormatter: function (dt, format) {
            if (!dt) {
                return '';
            }
            return format.replace(/([a-z]+)/ig, function (a, b, c, d) {
                if (/Y{2,}/.test(b)) {
                    return b.length === 4 ? dt.getFullYear() : ('' + dt.getFullYear()).substr(2);
                } else if (/M{2}/.test(b)) {
                    return (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
                } else if (/D{2}/.test(b)) {
                    return (dt.getDate()) < 10 ? '0' + dt.getDate() : dt.getDate();
                } else if (/h{2}/.test(b)) {
                    return dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
                } else if (/m{2}/.test(b)) {
                    return dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
                } else if (/s{2}/.test(b)) {
                    return dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
                } else {
                    return 0;
                }
            });
        },
        sendParams: function () {
            this.getQuery();
        },
        choose: function (id) {
            var that = this;
            if (id === "总计") {
                that.tableData.forEach(function (item, index) {
                    if (!that.allCheck) {
                        item.checkStatus = true;
                    } else {
                        item.checkStatus = false;
                    }
                });
                that.allCheck = !that.allCheck;
                return;
            } else {
                that.allCheck = true;
                that.tableData.forEach(function (item, index) {
                    if (id === item.id) {
                        item.checkStatus = !item.checkStatus;
                    }
                    if (item.id != "总计") {
                        if (item.checkStatus) {
                            that.allCheck = that.allCheck && true;
                        } else {
                            that.allCheck = that.allCheck && false;
                        }
                    }
                });
                that.tableData[0].checkStatus = that.allCheck;
            }
        },
        sendKeyword: function () {
            this.getQuery();
        },
        changePullStatus: function (id) {
            var that = this;
            that.tableData.forEach(function (item, index) {
                var params = 2;
                if (item.id === id) {
                    if (item.pullStatus == 2) {
                        return;
                    }
                    if (item.pullStatus == 0) {
                        params = 1;
                    } else if (item.pullStatus == 1) {
                        params = 0;
                    }
                    item.pullStatus = item.pullStatus;
                    $$customer.setAdIdeaReleaseState({
                        id: parseInt(id),
                        status: parseInt(params)
                    }, function (res) {
                        if (res.code === "200") {
                            that.openAlert("操作已成功！", 0);
                            if (item.pullStatus == 0) {
                                item.pullStatus = 1;
                            } else if (item.pullStatus == 1) {
                                item.pullStatus = 0;
                            }
                        } else {
                            that.openAlert(res.msg, 1);
                        }
                    });
                }
            });
        },
        filtersEmpty: function (data) {
            for (var key in data) {
                if (data[key] === "" || data[key] === null || data[key] === undefined) {
                    delete data[key];
                }
            }
            return data;
        },
        getQuery: function () {
            var that = this;
            var days = that.dateRange.toString().split(' ');
            var querys = {
                status: that.statusSelect,
                keyword: that.keyword || '',
                start_date: days[0] || '',
                end_date: days[2] || '',
                page_index: that.pageInfo.pageIndex || 1,
                page_size: that.pageInfo.pageSize || 10
            };
            if (querys.status == 3) {
                delete querys.status;
            }
            if (that.$route.params.pid) {
                querys.plan_id = parseInt(that.$route.params.pid);
            }
            if (that.$route.params.uid) {
                querys.unit_id = parseInt(that.$route.params.uid);
            }
            querys = this.filtersEmpty(querys);
            $$customer.searchAdIdeas(querys);
        },
        downloadList: function () {
            var arr = this.selectedItems();
            var that = this;
            $$customer.on("exportIdeaList", function (res) {
                if (res.code === "200") {
                    window.location.href = res.data;
                } else {
                    that.openAlert(res.msg, 1);
                }
            });
            $$customer.exportIdeaList({list: arr});
        },
        ideaSubmit: function (data) {
            var _this = this;
            if (_this.addIdeaFlag) {
                return;
            }
            _this.addIdeaFlag = true;
            $$customer.createAdIdea(data, function (res) {
                if (res.code === "200") {
                    _this.openAlert("添加成功！", 0);
                    _this.changePage(1);
                } else {
                    _this.openAlert(res.msg, 1);
                }
                _this.addIdeaFlag = false;
            });
        },
        changePage: function (val) {
            this.pageInfo.pageIndex = val;
            this.getQuery();
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
        response: function (res) {
            var _this = this;
            _this.alert.status = (res.code == 200 ? 0 : 1);
            _this.alert.message = res.msg;
            _this.alert.show = true;

            window.setTimeout(function () {
                _this.alert.show = false;
            }, 2000);

            if (res.code == 200) {
                _this.getQuery();
            }
        },
        getUrlOf: function (type, id, id2) {
            var ifAgent = !!this.$route.params.cid;
            var routeNamePrefix = ifAgent ? 'agent_prom_' : 'cust_prom_';
            var route = {
                name: '',
                params: {}
            };
            if (ifAgent) {
                route.params.cid = this.$route.params.cid;
            }
            switch (type) {
                case 'plan':
                    route.name = routeNamePrefix + 'plan';
                    route.params.pid = id;
                    return route;
                case 'unit':
                    route.name = routeNamePrefix + 'unit';
                    route.params.pid = id2;
                    route.params.uid = id;
                    return route;
                case 'idea':
                    return '';
            }
            route.name = routeNamePrefix + 'all';
            return route;
        },
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var str = location.href;
            var num = str.indexOf("?")
            str = str.substr(num+1);
            var result = str.match(reg);
            if (result != null) {
                return  unescape(result[2]);
            } else {
               return null;
            }
        }
    },
    beforeMount: function() {
        var that = this,
            params = that.getQueryString("type"),
            changeData = {};
        if (params != null) {
            that.defaultIndex = parseInt(params);
            changeData = {
                value: parseInt(params) - 1
            }
            that.changeStatusSelect(changeData);
        }
        $$customer.on('searchAdIdeas', function(data) {
            if (data.code == 200) {
                var arr = [];
                that.pageInfo.itemCount = parseInt(data.data.total.count, 10);
                if (data.data == undefined || data.data == null || !data.data || data.data.list.length <= 0) {
                    that.isEmptyData = true;
                    that.tableData = [];
                    return;
                }
                that.isEmptyData = true;
                if (data.data.total) {
                    var total = {
                        id: '总计',
                        planId: '',
                        checkStatus: false,
                        img: {
                            href: '',
                            url: ''
                        },
                        auditStatus: '',
                        pullStatus: true,
                        ideaHref: '',
                        adPlan: {
                            name: '',
                            href: ''
                        },
                        adUnit: {
                            name: '',
                            href: ''
                        },
                        exposure: data.data.total.exposure_count,
                        click: data.data.total.click_count,
                        clickRate: data.data.total.click_rate,
                        consume: data.data.total.cost
                    };
                    that.total = total;
                    arr.push(total);
                }
                data.data.list.forEach(function (item, index) {
                    arr.push({
                        id: item.id,
                        planId: item.planInfo.id,
                        checkStatus: false,
                        img: {
                            href: '',
                            url: item.url
                        },
                        orderName: item.orderInfo.name,
                        description: item.description,
                        auditStatus: item.verifyStatus,
                        pullStatus: item.showStatus,
                        ideaHref: item.link,
                        adPlan: {
                            name: item.planInfo.name,
                            href: that.getUrlOf('plan', item.planInfo.id)
                        },
                        adUnit: {
                            name: item.orderInfo.name,
                            href: that.getUrlOf('unit', item.orderInfo.id, item.planInfo.id)
                        },
                        exposure: item.exposure_count,
                        click: item.click_count,
                        clickRate: item.click_rate,
                        consume: item.cost
                    });
                });
                that.tableData = arr;
                that.allCheck = false;
            } else {
                that.openAlert(data.msg, 1);
            }
        });
        that.getQuery();
        request.pushWhiteList($$domain + '/spreadManage/updateIdeaStatus/' + that.$route.params.cid, 'msg');
    }
}
